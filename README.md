# Projekt-X

Technische Entwicklungsgrundlage für das Projekt. **NOXERO ist ein vorläufiger Projektname** und soll später zentral änderbar bleiben.

## Leitlinien

- Verbindlicher Technologie-Stack und Infrastrukturentscheidungen werden in `documentation/` festgehalten.
- Die angezeigte Produktversion bleibt `v1.0`. Git-Tags und GitHub-Releases erhalten zusätzlich nachvollziehbare Kennzeichnungen für Beta, Pre-Release und Release.
- Dieses Repository ist **source-available**: Der Quelltext darf eingesehen werden. Die Nutzungsbedingungen stehen vollständig in `LICENSE.md`; daraus folgt keine Open-Source-Lizenz.
- Zugangsdaten gehören ausschließlich in lokale, ignorierte `.env`-Dateien oder einen späteren Secret-Store. Niemals in Git einchecken.

## Verzeichnisübersicht

- `documentation/` – technische Entscheidungen und Betriebsdokumentation
- `source/desktop/` – Electron und React/TypeScript
- `source/mobile/` – React Native
- `source/backend/` – Node.js und NestJS
- `infrastructure/` – Docker, Datenbank und Serverkonfiguration
- `tests/` – Infrastruktur- und Anwendungstests
- `backups/` – lokale Sicherungen; nicht für Git bestimmt
- `tools/` – lokale Hilfswerkzeuge

Die Anwendungsfunktionen sind noch nicht implementiert.
