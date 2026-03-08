from fastapi import APIRouter, Depends
from typing import List
from uuid import UUID
from apps.api.src.core.deps import get_tenant_id

router = APIRouter()

@router.get("/transit")
async def get_cargo_in_transit(tenant_id: str = Depends(get_tenant_id)):
    """
    8. Control de inventario en transporte
    """
    return [
        {"vehicle_id": "V3X-982", "cargo": "Electronics", "quantity": 2500, "unit": "UNITS"}
    ]

@router.get("/warehouses")
async def get_warehouse_stock(tenant_id: str = Depends(get_tenant_id)):
    """
    8. Control de inventario
    """
    return [
        {"warehouse_id": "W-1", "name": "Almacén Central", "status": "NORMAL"}
    ]
