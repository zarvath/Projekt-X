[CmdletBinding()]
param(
    [string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$composeFile = Join-Path $ProjectRoot 'infrastructure\docker\compose.yaml'
$envFile = Join-Path $ProjectRoot '.env'
$backupDirectory = Join-Path $ProjectRoot 'backups\database'

foreach ($path in @($composeFile, $envFile)) {
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        throw "Required local file is missing: $path"
    }
}

$docker = (Get-Command docker -ErrorAction Stop).Source
New-Item -ItemType Directory -Path $backupDirectory -Force | Out-Null
$timestamp = Get-Date -Format 'yyyy-MM-dd_HHmmss'
$sqlPath = Join-Path $backupDirectory ".project-x-$timestamp.sql.tmp"
$gzipPath = Join-Path $backupDirectory "project-x-$timestamp.sql.gz"

function Quote-ProcessArgument([string]$Value) {
    if ($Value -notmatch '[\s"]') { return $Value }
    $escaped = $Value -replace '(\\*)"', '$1$1\"'
    $escaped = $escaped -replace '(\\+)$', '$1$1'
    return '"' + $escaped + '"'
}

$dockerArguments = @(
    'compose', '--env-file', $envFile, '-f', $composeFile,
    'exec', '-T', 'mariadb', 'sh', '-lc',
    'MYSQL_PWD="$MARIADB_ROOT_PASSWORD" mariadb-dump --single-transaction --routines --events --default-character-set=utf8mb4 "$MARIADB_DATABASE"'
)
$startInfo = [System.Diagnostics.ProcessStartInfo]::new()
$startInfo.FileName = $docker
$startInfo.Arguments = (($dockerArguments | ForEach-Object { Quote-ProcessArgument $_ }) -join ' ')
$startInfo.UseShellExecute = $false
$startInfo.CreateNoWindow = $true
$startInfo.RedirectStandardOutput = $true
$startInfo.RedirectStandardError = $true
$process = [System.Diagnostics.Process]::new()
$process.StartInfo = $startInfo

try {
    if (-not $process.Start()) { throw 'Could not start Docker Compose.' }
    $file = [System.IO.File]::Create($sqlPath)
    try {
        $copyTask = $process.StandardOutput.BaseStream.CopyToAsync($file)
        $errorTask = $process.StandardError.ReadToEndAsync()
        $process.WaitForExit()
        $null = $copyTask.GetAwaiter().GetResult()
        $errorText = $errorTask.GetAwaiter().GetResult()
    }
    finally {
        $file.Dispose()
    }

    if ($process.ExitCode -ne 0) {
        throw "MariaDB dump failed (exit $($process.ExitCode)): $errorText"
    }
    if ((Get-Item -LiteralPath $sqlPath).Length -eq 0) {
        throw 'MariaDB returned an empty dump.'
    }

    $inputStream = [System.IO.File]::OpenRead($sqlPath)
    $outputStream = [System.IO.File]::Create($gzipPath)
    try {
        $gzipStream = [System.IO.Compression.GZipStream]::new(
            $outputStream,
            [System.IO.Compression.CompressionLevel]::Optimal,
            $true
        )
        try { $inputStream.CopyTo($gzipStream) }
        finally { $gzipStream.Dispose() }
    }
    finally {
        $inputStream.Dispose()
        $outputStream.Dispose()
    }

    if ((Get-Item -LiteralPath $gzipPath).Length -eq 0) {
        throw 'Compressed backup is empty.'
    }
    Remove-Item -LiteralPath $sqlPath -Force
    Write-Output "MariaDB backup created: $gzipPath"
    Write-Output ('Size: {0:N0} bytes' -f (Get-Item -LiteralPath $gzipPath).Length)
}
catch {
    Remove-Item -LiteralPath $sqlPath, $gzipPath -Force -ErrorAction SilentlyContinue
    throw
}
finally {
    $process.Dispose()
}