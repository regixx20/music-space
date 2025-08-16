# Music Friends Starter

Monorepo minimal pour un projet avec backends au choix (Python ou Java), front au choix (React ou Vue), et un API Gateway avec flags.

## Lancer rapidement (Docker requis)
Exemple: backend Python + frontend React
```bash
BACKEND_ACTIVE=python FRONTEND_ACTIVE=react docker compose up --build
```
Exemple: backend Java + frontend Vue
```bash
BACKEND_ACTIVE=java FRONTEND_ACTIVE=vue docker compose up --build
```

- Gateway: http://localhost:8080
- API: http://localhost:8080/api
- Health: http://localhost:8080/api/health
- Démo Now Playing: http://localhost:8080/api/now/demo

## Flags
- `BACKEND_ACTIVE` : `python` ou `java`
- `FRONTEND_ACTIVE` : `react` ou `vue`

## Structure
```
/apps
  /api-gateway
  /core-python
  /core-java
  /web-react
  /web-vue
/packages
  /contracts-openapi
```
