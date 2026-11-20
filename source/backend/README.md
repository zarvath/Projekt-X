# Backend – Infrastrukturgrundlage

NestJS- und TypeScript-Grundprojekt für `Projekt-X`. Der frühere Platzhaltername `NOXERO` ist keine feste Runtime-Kennung. Es werden noch keine Produktfunktionen bereitgestellt.

## Voraussetzungen

- Node.js 26 LTS und npm 11
- Docker Desktop mit laufender MariaDB- und Redis-Compose-Umgebung
- Projektstammdatei `.env` (aus `.env.example` erstellt; echte Zugangsdaten sind lokal und Git-ignoriert)

## Start

Im Ordner `source/backend`:

```powershell
npm run start:dev
```

Die lokale API bindet standardmäßig nur an `127.0.0.1:3001`. `GET /health` prüft echte MariaDB- und Redis-Verbindungen. Der Endpunkt enthält keine Produktdaten. Für einen Backend-Container ist in `infrastructure/docker/compose.yaml` das optionale Profil `app` vorbereitet. Startbefehle stehen in `documentation/DOCKER_AND_HETZNER.md`.

## Prüfungen

```powershell
npm test
npm run test:e2e
npm run build
npm run lint
npm audit
```

Der End-to-End-Test erwartet die lokalen Dienste aus `infrastructure/docker/compose.yaml`.

## Echtzeit-Grundlage

NestJS verwendet den `ws`-Adapter für RFC-6455-WebSockets. Es ist noch kein Gateway registriert; URL, Nachrichtenformat und Authentifizierung werden vor dem ersten Echtzeitfeature festgelegt. Die WebSocket-Nachrichtengröße ist auf 256 KiB begrenzt.

## Laufzeitkonfiguration

Die lokalen Umgebungswerte werden aus `../../.env` geladen, wenn der Prozess aus diesem Ordner gestartet wird. In Container-/Serverumgebungen werden dieselben Variablen direkt injiziert; dort ist eine `.env`-Datei nicht erforderlich. `API_HOST` sollte lokal `127.0.0.1` bleiben; ein Backend-Container benötigt eine bewusst konfigurierte Bindung an sein Containerinterface.