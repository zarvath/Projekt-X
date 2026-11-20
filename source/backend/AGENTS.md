# Backend project instructions

- This folder contains only the NestJS backend infrastructure foundation until the owner explicitly starts application feature work.
- Keep the product name changeable. Do not hard-code the placeholder name into runtime behavior.
- Keep the displayed application version at `v1.0` (`package.json` uses SemVer `1.0.0`). Git tags/releases will carry Beta, Pre-Release, and Release maturity labels.
- Keep secrets in the ignored project-root `.env` file for local development. Never write secrets into source, tests, logs, or Git.
- Use Node.js 26 LTS, TypeScript, MariaDB 11.8, Redis 8, and standard WebSockets (`ws`) as selected.
- Add no product features or UI unless explicitly requested. Infrastructure tests should cover health, connections, and configuration.
- Run focused tests, build, lint, and `npm audit` after backend changes.