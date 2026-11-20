# Windows-Entwicklungsumgebung

## Geprüfter Stand

Die folgenden Werkzeuge wurden im lokalen Benutzerkonto installiert oder gefunden und geprüft:

- Visual Studio Code 1.146.0
- Git for Windows 2.56.1.windows.1
- Node.js 26.13.1 und npm 11.20.0
- Docker Desktop 4.99.0; Linux-Container und `hello-world`-Test erfolgreich
- GitHub Desktop 3.6.11
- Windows Terminal 1.25.3131.0
- DBeaver Community 26.2.5
- Bruno 4.3.0
- 7-Zip 26.06

VS Code nutzt Prettier beim Speichern, zwei Leerzeichen, LF und Windows PowerShell als integriertes Terminal. Installierte Erweiterungen: Microsoft PowerShell, ESLint, Prettier, Docker/Containers und GitHub Pull Requests.

## Git-Grundeinstellungen

`main` ist der Standardbranch; Fast-Forward-only-Pull und Bereinigung veralteter Remote-Branches sind aktiviert. Git Credential Manager verwaltet Anmeldedaten. Git hat jetzt eine lokale Commit-Identität; das erste Infrastruktur-Commit liegt auf `main`, `develop` ist der Arbeitsbranch. Ein GitHub-Remote ist noch nicht eingetragen.

## Start nach einem Neustart

Docker Desktop muss laufen. Die Compose-Dienste werden mit den Anweisungen in `../infrastructure/docker/README.md` gestartet. Die API wird im Ordner `../source/backend` mit `npm run start:dev` gestartet.