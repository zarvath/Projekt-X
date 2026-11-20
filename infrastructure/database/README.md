# Lokale Datenbank- und Cache-Dienste

MariaDB läuft im festgelegten LTS-Zweig 11.8; Redis läuft in der festgelegten Hauptversion 8. Die Compose-Datei pinnt konkrete Patch-Tags, damit ein normaler Neustart nicht stillschweigend eine andere Version lädt. Das Aktualisieren eines Patch-Tags wird als eigene Änderung dokumentiert.

## Schutz und Zugriff

- Zugangsdaten liegen in der Projektdatei `.env`. Sie wird von Git ignoriert und auf Windows nur für das angemeldete Konto, SYSTEM und lokale Administratoren freigegeben.
- Beide Containerports sind ausschließlich an `127.0.0.1` gebunden; andere Geräte im Heimnetz können sie nicht direkt erreichen.
- Der MariaDB-Benutzer `projectx_app` erhält durch das Image nur Rechte auf die lokale Entwicklungsdatenbank. Das Root-Passwort ist nur für Wartungsaufgaben.
- Die Daten liegen in Docker Named Volumes und bleiben bei `docker compose down` erhalten. `docker compose down -v` löscht diese Volumes und ist für normale Stopps ausdrücklich nicht vorgesehen.
- Redis startet mit AOF-Persistenz. Cache-/Presence-Daten gelten trotzdem nicht als dauerhafte Geschäftsdaten.

## Start und Stopp

Befehle im Projektstamm `C:\Users\Deamo\Documents\Projekt-X` ausführen:

```powershell
docker compose --env-file .env -f infrastructure/docker/compose.yaml up -d
docker compose --env-file .env -f infrastructure/docker/compose.yaml ps
docker compose --env-file .env -f infrastructure/docker/compose.yaml down
```

DBeaver verbindet zu `127.0.0.1:3306`, Datenbank `projekt_x_dev`, Benutzer `projectx_app`; das Kennwort steht lokal in `.env`. Redis ist unter `127.0.0.1:6379` mit dem Wert `REDIS_PASSWORD` erreichbar.

## Backup-Hinweis

Docker-Volumes sind keine Backups. Datenbank-Dump und Redis-Sicherung werden separat unter `backups/` erzeugt und aus Git ausgeschlossen. Vor dem ersten echten Datenbestand wird ein getesteter Sicherungs- und Wiederherstellungsablauf eingerichtet.
## DBeaver-Verbindung

In DBeaver eine neue MariaDB-Verbindung anlegen:

- Host: `127.0.0.1`
- Port: `3306`
- Datenbank: `projekt_x_dev`
- Benutzer: `projectx_app`
- Passwort: Wert von `MARIADB_PASSWORD` in der lokalen Projektstammdatei `.env`

Das Root-Konto nicht für die normale Arbeit speichern oder verwenden. Der Hostport ist nur lokal erreichbar.