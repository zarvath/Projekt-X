# Docker-Betrieb und Hetzner-Vorbereitung

## Lokaler Stack

`infrastructure/docker/compose.yaml` hält Datenbank und Cache als Standarddienste bereit. Das Backend ist dem Profil `app` zugeordnet und startet daher nicht versehentlich mit Datenbankdiensten, wenn lokal nur an der API gearbeitet wird.

Im Projektstamm:

```powershell
docker compose --env-file .env -f infrastructure/docker/compose.yaml up -d
docker compose --env-file .env -f infrastructure/docker/compose.yaml ps
docker compose --env-file .env -f infrastructure/docker/compose.yaml --profile app up -d --build backend
```

Stoppen ohne persistente Daten zu löschen:

```powershell
docker compose --env-file .env -f infrastructure/docker/compose.yaml down
```

Das Backend-Image nutzt eine mehrstufige Node-26.13.1-Alpine-Buildkonfiguration, installiert zur Laufzeit nur Produktionsabhängigkeiten und läuft als unprivilegierter `node`-Benutzer. Seine Container-Konfiguration liegt außerhalb von Git in `.env.backend`.

## Geplante Hetzner-Übertragung

- Compose-Datei, Dockerfile und Daten getrennt halten.
- Datenbank- und Redis-Ports auf dem Server nicht öffentlich veröffentlichen.
- Nur den Reverse Proxy mit TLS öffentlich erreichbar machen; Firewall-Regeln folgen bei der Servereinrichtung.
- Servergeheimnisse getrennt erzeugen und bereitstellen; niemals lokale Entwicklungsgeheimnisse kopieren.
- Persistente Volumes, Offsite-Backups, Restore-Tests, Monitoring und Updatefenster vor dem ersten produktiven Deployment einrichten.
- Die MariaDB-Patchversion prüfen und ein getestetes Update planen, bevor das aktuelle Image ersetzt wird.

Es wurde noch kein Hetzner-Server eingerichtet oder kontaktiert.