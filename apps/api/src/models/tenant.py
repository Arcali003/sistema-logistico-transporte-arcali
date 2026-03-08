from sqlalchemy import Column, String, JSON
from apps.api.src.models.base import Base

class Tenant(Base):
    name = Column(String, nullable=False)
    subdomain = Column(String, unique=True, index=True)
    api_key = Column(String, unique=True, index=True)
    settings = Column(JSON, default={})
