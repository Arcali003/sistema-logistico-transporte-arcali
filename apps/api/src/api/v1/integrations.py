from fastapi import APIRouter, Depends, Header, HTTPException
from apps.api.src.core.deps import get_tenant_id
import uuid

router = APIRouter(prefix="/integrations", tags=["integrations"])

@router.post("/webhooks/gps")
async def gps_webhook(payload: dict, tenant_id: uuid.UUID = Depends(get_tenant_id)):
    """
    Endpoint to receive GPS data from external hardware providers (Teltonika, Queclink, etc.)
    """
    return {"status": "received", "tenant_id": str(tenant_id)}

@router.get("/api-keys")
async def list_api_keys(tenant_id: uuid.UUID = Depends(get_tenant_id)):
    """
    Manage API keys for external integrations (ERP, E-commerce).
    """
    return {"api_keys": [], "tenant_id": str(tenant_id)}
