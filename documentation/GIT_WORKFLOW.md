# Git- und Release-Konvention

## Branches

- `main` enthält freigegebene Stände.
- `develop` sammelt die nächste Beta.
- Änderungen beginnen auf `feature/<kurzer-name>` oder `fix/<kurzer-name>` und werden nach Prüfung zusammengeführt.
- Direkte Commits auf `main` sind für Releases reserviert. Schutzregeln werden nach dem Anlegen des GitHub-Repositories aktiviert.

## Commit-Nachrichten

Conventional-Commit-Präfixe: `feat:`, `fix:`, `docs:`, `test:`, `build:`, `ci:`, `chore:` und `infra:`. Änderungen bleiben klein und nachvollziehbar.

## Versionsnummer und öffentliche Releases

Die angezeigte Produktversion bleibt während der Entwicklung `v1.0` (`package.json` nutzt die SemVer-Schreibweise `1.0.0`). Git dokumentiert Reifegrade als Tags und GitHub-Releases:

- Beta: `v1.0.0-beta.1`, `v1.0.0-beta.2`, …
- Pre-Release/Release Candidate: `v1.0.0-rc.1`, `v1.0.0-rc.2`, …; bei GitHub als Pre-Release markieren
- Release: `v1.0.0`; bei GitHub als regulären Release markieren

Der Source-Available-Status und die erlaubten Nutzungen richten sich nach der Root-Datei `LICENSE.md`. Diese Datei gewährt kein Recht, veränderte Fassungen zu veröffentlichen.

## Vertrauliche Dateien

`.env`, `.env.backend`, lokale Backups, Datenbank-Dumps und Schlüsseldateien sind ignoriert. Vor einem Push müssen `git status` und `git check-ignore` für lokale Geheimnisse geprüft werden.

## GitHub-Verbindung

Git Credential Manager ist eingerichtet und die lokale Commit-Identität ist gesetzt. Der initiale Commit befindet sich auf `main`; lokal existiert auch `develop`. Ein Remote `origin` und GitHub-Releases sind noch nicht angelegt. Vor dem ersten Push wird die Kontoanmeldung und Sichtbarkeit des Repositories geprüft.