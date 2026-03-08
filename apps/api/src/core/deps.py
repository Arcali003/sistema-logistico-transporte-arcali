from fastapi import Header, HTTPException, Depends
from typing import Optional
import uuid

async def get_tenant_id(x_tenant_id: Optional[str] = Header(None)) -> uuid.UUID:
    if not x_tenant_id:
        # In a real SaaS, we would also check the JWT or subdomain
        raise HTTPException(status_code=400, detail="X-Tenant-ID header is missing")
    try:
        return uuid.UUID(x_tenant_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid X-Tenant-ID format")
