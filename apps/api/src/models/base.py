import uuid
import json
from datetime import datetime, timezone
from sqlalchemy import Column, DateTime, String, Boolean, event
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import as_declarative, declared_attr

@as_declarative()
class Base:
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    is_active = Column(Boolean, default=True)

    __name__: str

    # Generate __tablename__ automatically
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()

class TenantBase(Base):
    __abstract__ = True
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)

# 20. Sistema de auditoría (Generic Listener)
@event.listens_for(Base, 'after_update', propagate=True)
def audit_update_listener(mapper, connection, target):
    """
    Generic listener to log changes to any model inheriting from TenantBase.
    Note: In a production system, this would be pushed to a background task.
    """
    from apps.api.src.models.logistic import AuditLog

    if not isinstance(target, TenantBase):
        return

    state = target.__mapper__.base_mapper.get_state(target)
    old_values = {}
    new_values = {}

    for attr in state.attrs:
        hist = attr.load_history()
        if hist.has_changes():
            old_values[attr.key] = str(hist.deleted[0]) if hist.deleted else None
            new_values[attr.key] = str(hist.added[0]) if hist.added else None

    if old_values:
        # Persist the change to the AuditLog table
        from apps.api.src.models.logistic import AuditLog
        audit_table = AuditLog.__table__

        connection.execute(
            audit_table.insert().values(
                id=uuid.uuid4(),
                tenant_id=target.tenant_id,
                action=f"UPDATE_{target.__class__.__name__.upper()}",
                entity_name=target.__class__.__name__,
                entity_id=target.id,
                old_values=old_values,
                new_values=new_values,
                timestamp=datetime.now(timezone.utc),
                created_at=datetime.now(timezone.utc),
                updated_at=datetime.now(timezone.utc),
                is_active=True
            )
        )
