# DATA MODEL - Sistema Logístico (MVP)

## Entidades Principales

### Customers
- `id`: UUID (PK)
- `name`: String
- `tax_id`: String (Unique)
- `contact_info`: JSONB
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Vehicles
- `id`: UUID (PK)
- `plate`: String (Unique)
- `model`: String
- `brand`: String
- `type`: Enum (CAMA_BAJA, CAMA_CUNA, PLATAFORMA)
- `axles`: Integer (1-4)
- `property_card`: String
- `capacity_kg`: Float
- `status`: Enum (ACTIVE, MAINTENANCE, INACTIVE)
- `created_at`: Timestamp

### Drivers
- `id`: UUID (PK)
- `first_name`: String
- `last_name`: String
- `dni`: String (Unique)
- `license_number`: String (Unique, Brevete)
- `sctr`: String
- `phone`: String
- `status`: Enum (AVAILABLE, BUSY, OFF_DUTY)
- `created_at`: Timestamp

### Shipments (Orders/Services)
- `id`: UUID (PK)
- `customer_id`: UUID (FK -> Customers)
- `status`: Enum (CREATED, PLANNED, DISPATCHED, IN_TRANSIT, DELIVERED, CLOSED, CANCELED)
- `origin_address`: String
- `destination_address`: String
- `scheduled_date`: Date
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Stops
- `id`: UUID (PK)
- `shipment_id`: UUID (FK -> Shipments)
- `address`: String
- `coordinates`: Geometry(Point, 4326)
- `stop_order`: Integer
- `status`: Enum (PENDING, ARRIVED, DEPARTED)
- `arrival_time`: Timestamp
- `departure_time`: Timestamp

### Assignments
- `id`: UUID (PK)
- `shipment_id`: UUID (FK -> Shipments)
- `vehicle_id`: UUID (FK -> Vehicles)
- `driver_id`: UUID (FK -> Drivers)
- `assigned_at`: Timestamp
- `unassigned_at`: Timestamp (Null if active)

### Tracking (GPS Data)
- `id`: BigInt (PK)
- `vehicle_id`: UUID (FK -> Vehicles)
- `coordinates`: Geometry(Point, 4326)
- `speed`: Float
- `timestamp`: Timestamp (Indexed)

### VehicleLastPosition
- `vehicle_id`: UUID (PK, FK -> Vehicles)
- `coordinates`: Geometry(Point, 4326)
- `timestamp`: Timestamp
- `updated_at`: Timestamp

### TrackingEvents (Audit)
- `id`: UUID (PK)
- `shipment_id`: UUID (FK -> Shipments)
- `event_type`: String (e.g., STATUS_CHANGE, ASSIGNMENT, GPS_ALERT)
- `payload`: JSONB
- `created_at`: Timestamp

### Documents
- `id`: UUID (PK)
- `shipment_id`: UUID (FK -> Shipments)
- `file_path`: String (MinIO key)
- `file_type`: String (e.g., POD, INVOICE)
- `uploaded_by`: UUID (Keycloak Sub)
- `created_at`: Timestamp

## Entidades Extendidas (Fase 2)

### FuelLogs
- `id`: UUID (PK)
- `vehicle_id`: UUID (FK -> Vehicles)
- `date`: Timestamp
- `quantity_liters`: Float
- `cost`: Float
- `odometer_reading`: Float
- `location`: Geometry(Point, 4326)

### MaintenanceLogs
- `id`: UUID (PK)
- `vehicle_id`: UUID (FK -> Vehicles)
- `type`: Enum (PREVENTIVE, CORRECTIVE, PREDICTIVE)
- `description`: Text
- `scheduled_date`: Date
- `completion_date`: Date
- `cost`: Float

### Warehouses (Almacenes)
- `id`: UUID (PK)
- `name`: String
- `address`: String
- `coordinates`: Geometry(Point, 4326)

### InventoryItems
- `id`: UUID (PK)
- `warehouse_id`: UUID (FK -> Warehouses)
- `name`: String
- `sku`: String (Unique)
- `quantity`: Float
- `unit`: String (e.g., KG, UNIDADES)
- `last_stock_take`: Timestamp

### Notifications
- `id`: UUID (PK)
- `user_id`: UUID (Keycloak Sub)
- `type`: Enum (EMAIL, SMS, PUSH)
- `subject`: String
- `body`: Text
- `status`: Enum (PENDING, SENT, FAILED)
- `created_at`: Timestamp
