# PRD - Sistema Logístico de Transporte "Arcali" (MVP)

## Introducción
Este sistema está diseñado para la empresa de transporte **Arcali**.
Este documento define el Producto Mínimo Viable (MVP) para el sistema logístico de una empresa de transporte. El sistema permitirá la gestión de órdenes, despacho, seguimiento por GPS en tiempo real y gestión de documentos (POD).

## Objetivos del MVP
- Gestionar el ciclo de vida de un envío (Shipment).
- Asignar conductores y vehículos a los envíos.
- Seguimiento en tiempo real de vehículos vía GPS.
- Almacenamiento de pruebas de entrega (POD).
- Autenticación y autorización centralizada con Keycloak.

## Roles de Usuario
- **Admin**: Gestión total del sistema, usuarios y configuraciones.
- **Supervisor**: Gestión de operaciones, asignaciones y monitoreo.
- **Operator**: Registro de envíos, actualizaciones de estado y carga de documentos.
- **Auditor**: Acceso de solo lectura a todos los registros y eventos de auditoría.

## Flujos Principales
1. **Creación de Envío**: El operador registra una nueva orden.
2. **Despacho**: El supervisor asigna vehículo/conductor y cambia el estado a PLANNED/DISPATCHED.
3. **Seguimiento**: Los dispositivos GPS envían coordenadas que se visualizan en el sistema.
4. **Entrega**: El conductor marca como entregado y sube el POD (imagen/PDF).
5. **Cierre**: El sistema cierra el envío tras verificar el POD.

## Criterios de Aceptación
- API funcional con documentación OpenAPI (Swagger).
- Integración con Keycloak para seguridad.
- Persistencia de datos en PostgreSQL/PostGIS.
- Procesamiento asíncrono de puntos GPS.
- Almacenamiento de archivos en MinIO.

## Dashboard Principal
El Dashboard debe ser completo e incluir:
- **Tarjetas de KPIs**: Envíos Activos, Vehículos en Ruta, Conductores Disponibles, PODs Pendientes.
- **Mapa de Seguimiento**: Vista rápida de la flota.
- **Alertas**: Retrasos, mantenimientos de vehículos y vencimientos de licencias.
- **Actividad Reciente**: Historial de movimientos.
