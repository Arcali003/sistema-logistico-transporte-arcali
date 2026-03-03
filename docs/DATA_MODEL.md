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
- `capacity_kg`: Float
- `status`: Enum (ACTIVE, MAINTENANCE, INACTIVE)
- `created_at`: Timestamp

### Drivers
- `id`: UUID (PK)
- `first_name`: String
- `last_name`: String
- `license_number`: String (Unique)
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
