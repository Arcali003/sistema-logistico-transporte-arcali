# SLTA - Sistema Logístico de Transporte

Sistema logístico diseñado para una empresa de transporte con gestión de GPS, despacho y POD.

## Stack Técnico
- **Backend**: Python 3.12 + FastAPI
- **Base de Datos**: PostgreSQL + PostGIS
- **Cache/Colas**: Redis + Celery
- **Auth**: Keycloak (OIDC)
- **Almacenamiento**: MinIO (S3 compatible)
- **Proxy**: Nginx

## Requisitos
- Docker y Docker Compose

## Inicio Rápido

1.  **Configurar Variables de Entorno**:
    ```bash
    cp .env.example .env
    ```

2.  **Levantar el Stack**:
    ```bash
    docker-compose -f infra/docker-compose.yml up -d
    ```

3.  **Ejecutar Migraciones**:
    ```bash
    docker-compose -f infra/docker-compose.yml exec api alembic upgrade head
    ```

## Desarrollo Local (sin Docker para la API)

1.  **Crear VENV e instalar dependencias**:
    ```bash
    python -m venv venv
    source venv/bin/activate
    pip install -r apps/api/requirements.txt
    ```

2.  **Ejecutar API**:
    ```bash
    cd apps/api
    uvicorn main:app --reload
    ```

## Documentación
- [PRD](docs/PRD.md) - Requisitos del Producto
- [ADR](docs/ADR.md) - Decisiones de Arquitectura
- [Data Model](docs/DATA_MODEL.md) - Modelo de Datos

## API Endpoints
- **Health Check**: `GET /health`
- **Docs**: `GET /docs` (Swagger UI)
