from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Enum, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from geoalchemy2 import Geometry
from apps.api.src.models.base import TenantBase
import enum

class VehicleType(enum.Enum):
    CAMA_BAJA = "CAMA_BAJA"
    CAMA_CUNA = "CAMA_CUNA"
    PLATAFORMA = "PLATAFORMA"

class VehicleStatus(enum.Enum):
    ACTIVE = "ACTIVE"
    MAINTENANCE = "MAINTENANCE"
    INACTIVE = "INACTIVE"

class DriverStatus(enum.Enum):
    AVAILABLE = "AVAILABLE"
    BUSY = "BUSY"
    OFF_DUTY = "OFF_DUTY"

class ShipmentStatus(enum.Enum):
    CREATED = "CREATED"
    PLANNED = "PLANNED"
    DISPATCHED = "DISPATCHED"
    IN_TRANSIT = "IN_TRANSIT"
    DELIVERED = "DELIVERED"
    CLOSED = "CLOSED"
    CANCELED = "CANCELED"

class StopStatus(enum.Enum):
    PENDING = "PENDING"
    ARRIVED = "ARRIVED"
    DEPARTED = "DEPARTED"

class MaintenanceType(enum.Enum):
    PREVENTIVE = "PREVENTIVE"
    CORRECTIVE = "CORRECTIVE"
    PREDICTIVE = "PREDICTIVE"

class NotificationStatus(enum.Enum):
    PENDING = "PENDING"
    SENT = "SENT"
    FAILED = "FAILED"

class NotificationType(enum.Enum):
    EMAIL = "EMAIL"
    SMS = "SMS"
    PUSH = "PUSH"

class Customer(TenantBase):
    name = Column(String, nullable=False)
    tax_id = Column(String, unique=True, index=True)
    contact_info = Column(JSON)

class Vehicle(TenantBase):
    plate = Column(String, unique=True, index=True, nullable=False)
    model = Column(String)
    brand = Column(String)
    type = Column(Enum(VehicleType))
    axles = Column(Integer)
    property_card = Column(String)
    capacity_kg = Column(Float)
    status = Column(Enum(VehicleStatus), default=VehicleStatus.ACTIVE)

class Driver(TenantBase):
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    dni = Column(String, unique=True, index=True, nullable=False)
    license_number = Column(String, unique=True, index=True, nullable=False)
    sctr = Column(String)
    phone = Column(String)
    status = Column(Enum(DriverStatus), default=DriverStatus.AVAILABLE)

class Shipment(TenantBase):
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customer.id"))
    status = Column(Enum(ShipmentStatus), default=ShipmentStatus.CREATED)
    origin_address = Column(String)
    destination_address = Column(String)
    scheduled_date = Column(DateTime)

class Stop(TenantBase):
    shipment_id = Column(UUID(as_uuid=True), ForeignKey("shipment.id"))
    address = Column(String)
    coordinates = Column(Geometry("POINT", srid=4326))
    stop_order = Column(Integer)
    status = Column(Enum(StopStatus), default=StopStatus.PENDING)
    arrival_time = Column(DateTime)
    departure_time = Column(DateTime)

class Assignment(TenantBase):
    shipment_id = Column(UUID(as_uuid=True), ForeignKey("shipment.id"))
    vehicle_id = Column(UUID(as_uuid=True), ForeignKey("vehicle.id"))
    driver_id = Column(UUID(as_uuid=True), ForeignKey("driver.id"))
    assigned_at = Column(DateTime)
    unassigned_at = Column(DateTime, nullable=True)

class Tracking(TenantBase):
    vehicle_id = Column(UUID(as_uuid=True), ForeignKey("vehicle.id"))
    coordinates = Column(Geometry("POINT", srid=4326))
    speed = Column(Float)
    timestamp = Column(DateTime, index=True)

class VehicleLastPosition(TenantBase):
    vehicle_id = Column(UUID(as_uuid=True), ForeignKey("vehicle.id"), primary_key=True)
    coordinates = Column(Geometry("POINT", srid=4326))
    timestamp = Column(DateTime)

class TrackingEvent(TenantBase):
    shipment_id = Column(UUID(as_uuid=True), ForeignKey("shipment.id"), nullable=True)
    event_type = Column(String) # e.g., STATUS_CHANGE, DELAY, OVERSPEED
    payload = Column(JSON)

class Document(TenantBase):
    shipment_id = Column(UUID(as_uuid=True), ForeignKey("shipment.id"))
    file_path = Column(String)
    file_type = Column(String) # e.g., POD, INVOICE
    uploaded_by = Column(UUID(as_uuid=True)) # Keycloak Sub

class FuelLog(TenantBase):
    vehicle_id = Column(UUID(as_uuid=True), ForeignKey("vehicle.id"))
    date = Column(DateTime)
    quantity_liters = Column(Float)
    cost = Column(Float)
    odometer_reading = Column(Float)
    location = Column(Geometry("POINT", srid=4326))

class MaintenanceLog(TenantBase):
    vehicle_id = Column(UUID(as_uuid=True), ForeignKey("vehicle.id"))
    type = Column(Enum(MaintenanceType))
    description = Column(Text)
    scheduled_date = Column(DateTime)
    completion_date = Column(DateTime, nullable=True)
    cost = Column(Float)

class Warehouse(TenantBase):
    name = Column(String, nullable=False)
    address = Column(String)
    coordinates = Column(Geometry("POINT", srid=4326))

class InventoryItem(TenantBase):
    warehouse_id = Column(UUID(as_uuid=True), ForeignKey("warehouse.id"))
    name = Column(String, nullable=False)
    sku = Column(String, index=True)
    quantity = Column(Float)
    unit = Column(String) # e.g., KG, UNIDADES
    last_stock_take = Column(DateTime)

class Notification(TenantBase):
    user_id = Column(UUID(as_uuid=True)) # Keycloak Sub
    type = Column(Enum(NotificationType))
    subject = Column(String)
    body = Column(Text)
    status = Column(Enum(NotificationStatus), default=NotificationStatus.PENDING)

class AuditLog(TenantBase):
    """
    20. Sistema de auditoría
    """
    user_id = Column(UUID(as_uuid=True))
    action = Column(String) # e.g., UPDATE_SHIPMENT, DELETE_VEHICLE
    entity_name = Column(String)
    entity_id = Column(UUID(as_uuid=True))
    old_values = Column(JSON)
    new_values = Column(JSON)
    timestamp = Column(DateTime, index=True)
