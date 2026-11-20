# Lokales Docker Compose

`compose.yaml` startet ausschließlich MariaDB und Redis. Der Compose-Projektname ist in `.env` als `COMPOSE_PROJECT_NAME` zentral konfiguriert und dadurch unabhängig vom späteren Produktnamen.

Die Services befinden sich im projektspezifischen Compose-Netzwerk. Nur die für lokale Werkzeuge nötigen Ports werden auf die Loopback-Schnittstelle des Windows-PCs veröffentlicht. Die Datenbanken verwenden eigene Named Volumes; Container selbst sind austauschbar.

Die Tags sind `mariadb:11.8.9` und `redis:8.10.1`. MariaDB.org hat am 18.11.2026 11.8.10 veröffentlicht, der offizielle Docker-Hub-Tag war bei der Bestandsprüfung jedoch noch nicht verfügbar. Deshalb wird für die erste Einrichtung der verifizierte offizielle Tag 11.8.9 verwendet; das Patch-Update wird nach Veröffentlichung des offiziellen Images separat geprüft.