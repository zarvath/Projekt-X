# Restpunkte und Abschlussstatus

Stand: 20.11.2026. Diese Liste trennt den lokal eingerichteten Entwicklungsstand von Schritten, die ein angemeldetes GitHub-Konto, die DBeaver-Erstanmeldung oder einen späteren Server benötigen.

## Phase A – Windows vorbereiten: abgeschlossen

Die neun vorgesehenen Programme sind installiert bzw. geprüft. Node.js 26 LTS, Docker Desktop und Linux-Container funktionieren.

## Phase B – Entwicklungsumgebung: weitgehend abgeschlossen

- Git, VS Code, Windows Terminal und Docker sind konfiguriert.
- GitHub Desktop ist installiert und geöffnet; der Remote-Zugang muss noch über das Konto bestätigt werden.
- DBeaver hat ein lokales MariaDB-Profil ohne gespeichertes Passwort. Beim ersten Verbinden ist `MARIADB_PASSWORD` aus der Projekt-`.env` einzugeben.

## Phase C – Projektstruktur: abgeschlossen

Verzeichnisstruktur, Lizenz, Namens-/Versionsregeln und Basisdokumentation sind vorhanden.

## Phase D – Lokale Infrastruktur: lokal funktionsfähig

- MariaDB und Redis sind gesund; Verbindungen und Schreib-/Ping-Proben waren erfolgreich.
- Ein komprimiertes MariaDB-Backup wurde erstellt und auf GZip-Integrität geprüft.
- Vor echten Nutzerdaten bleiben ein Restore-Test in einer isolierten Umgebung, eine Aufbewahrungsregel und eine Redis-Wiederherstellungsentscheidung durchzuführen.

## Phase E – Backend-Grundlage: abgeschlossen

NestJS, TypeScript, Konfiguration, MariaDB-/Redis-Clients, REST-Health-Check, WebSocket-Adapter, Logging und Tests sind eingerichtet. Unit-, End-to-End-, Build- und Lint-Prüfungen sind erfolgreich. Ein WebSocket-Gateway und Produktfunktionen sind absichtlich noch nicht angelegt.

## Phase F – Git und Versionsverwaltung: lokal abgeschlossen, GitHub offen

- Initialer Commit ist auf `main`; `develop` ist der aktive lokale Branch.
- `.env`, lokale Backups und Build-Artefakte sind aus Git ausgeschlossen.
- Noch offen: Konto-/Remote-Verbindung `origin`, öffentlich sichtbares GitHub-Repository, Schutzregeln und spätere Beta-/Pre-Release-/Release-Tags.

## Phase G – Sicherheitsgrundlagen: Entwicklungsbasis dokumentiert

Zugangsdaten, lokale ACLs, Datenbankrechte und Netzwerkbindung sind eingerichtet. E2EE ist nicht umgesetzt; Schlüssel-, Gerätewechsel-, Recovery- und Metadaten-Architektur bleiben vor Funktionsentwicklung zu entwerfen.

## Phase H – Hetzner: vorbereitet, noch nicht eingerichtet

Dockerfile, Compose-Profil und Deployment-Dokumentation sind vorhanden. Noch offen für einen späteren Server: Hetzner-Server, Firewall/TLS/Reverse-Proxy, Secret-Bereitstellung, Monitoring, Offsite-Backups und Restore-Übungen.

## Nächste Schritte auf diesem PC

1. GitHub Desktop-Konto bestätigen und `origin` mit der gewünschten Repository-Sichtbarkeit einrichten.
2. In DBeaver das vorbereitete lokale MariaDB-Profil verbinden und den Zugang einmal testen.
3. Einen isolierten Restore-Probelauf aus dem erzeugten Backup dokumentieren.
4. Vor App-Funktionen die E2EE-Architektur und WebSocket-Nachrichten-/Authentifizierungsregeln festlegen.