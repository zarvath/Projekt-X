# Sicherheit, Verschlüsselung und Sicherungen

## Zugangsdaten

- `.env` enthält lokale Compose-Geheimnisse und wird nicht versioniert. Windows-ACL: nur das angemeldete Konto, SYSTEM und lokale Administratoren.
- `.env.backend` enthält ausschließlich die Zugangsdaten des Backend-Appbenutzers und Redis, keine Datenbank-Root-Zugangsdaten. Die Datei wird ebenfalls ignoriert und ACL-geschützt.
- `.env.example` und `.env.backend.example` sind Vorlagen ohne gültige Geheimnisse.
- Für Hetzner werden lokale `.env`-Dateien nicht übertragen. Dort wird später ein dokumentierter, serverseitig geschützter Secret-Store bzw. eine streng begrenzte Secret-Datei eingerichtet.

## Netzwerk und Berechtigungen

- MariaDB und Redis veröffentlichen ihre Ports nur an `127.0.0.1`.
- Der MariaDB-Appbenutzer ist auf `projekt_x_dev` beschränkt. Root wird nicht an den Backend-Container weitergegeben.
- Redis ist passwortgeschützt und speichert AOF im persistenten Docker-Volume.
- Die API bindet lokal an `127.0.0.1`. CORS ist nicht geöffnet. Der Docker-Backend-Container bindet nur innerhalb seines Containers an `0.0.0.0` und veröffentlicht den Hostport auf Loopback.
- Logs dürfen später keine Passwörter, Sitzungstoken, privaten Schlüssel, WebRTC-Inhalte oder Klartext-Nachrichten enthalten.

## Backups

- Docker Named Volumes schützen vor Verlust beim Entfernen eines Containers, sind aber kein Backup.
- `backups/` ist absichtlich aus Git ausgeschlossen und auf diesem PC per ACL nur für dein Konto, SYSTEM und Administratoren freigegeben.
- `tools/backup-database.ps1` erzeugt einen komprimierten MariaDB-Dump mit Zeitstempel. Im Projektstamm mit `./tools/backup-database.ps1` starten.
- Vor Speicherung echter Nutzerdaten wird ein automatisierter MariaDB-Dump, eine Redis-Wiederherstellungsentscheidung, eine getrennte Backup-Kopie und ein getesteter Restore-Ablauf erstellt.
- Sicherungen werden niemals mit `docker compose down -v` oder `docker volume rm` entfernt.
- Für Hetzner sind verschlüsselte Offsite-Backups mit Aufbewahrungsfristen und regelmäßigen Restore-Tests vorgesehen.

## Ende-zu-Ende-Verschlüsselung

E2EE ist in dieser Infrastruktur nicht implementiert. Die spätere Architektur muss Schlüssel auf den Endgeräten erzeugen und verwalten; Backend, Datenbank, Redis, Logs und Object Storage dürfen keine privaten Schlüssel und keinen entschlüsselten Nachrichteninhalt erhalten. Protokoll, Schlüsselrotation, Gerätewechsel, Recovery und Metadaten-Schutz werden vor Produktfunktionen separat entworfen.