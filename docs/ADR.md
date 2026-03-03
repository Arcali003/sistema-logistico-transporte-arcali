# ADR - Arquitectura del Sistema Logístico (MVP)

## ADR-001: Monolito Modular
### Decisión
Usar un monolito modular para el backend (FastAPI) en lugar de microservicios.
### Razonamiento
Dado que el sistema tiene ~100 usuarios recurrentes y se desplegará on-premise, un monolito modular reduce la complejidad operativa (despliegue, monitoreo, redes) manteniendo una estructura interna clara para futura evolución.

## ADR-002: Base de Datos y Extensiones
### Decisión
PostgreSQL con la extensión PostGIS.
### Razonamiento
Necesario para el manejo eficiente de datos geoespaciales (coordenadas GPS de vehículos, geocercas, cálculos de distancias).

## ADR-003: Autenticación y Autorización
### Decisión
Keycloak (OIDC/JWT) on-premise.
### Razonamiento
Se requiere una solución robusta que soporte roles y protocolos estándar de la industria (OAuth2/OpenID Connect) sin depender de servicios externos como AD/LDAP en esta etapa.

## ADR-004: Procesamiento Asíncrono
### Decisión
Redis + Celery (o RQ).
### Razonamiento
El procesamiento de coordenadas GPS y la generación de eventos de auditoría deben ocurrir fuera del ciclo de vida de la petición HTTP para garantizar la rapidez de la API.

## ADR-005: Almacenamiento de Documentos
### Decisión
MinIO (S3 compatible) on-premise.
### Razonamiento
Para manejar documentos (POD) e imágenes de manera eficiente, desacoplando los archivos binarios de la base de datos relacional.
