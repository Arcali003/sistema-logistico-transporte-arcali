from fastapi import APIRouter, Depends
from typing import List, Dict
from uuid import UUID
from datetime import datetime
from apps.api.src.core.deps import get_tenant_id

router = APIRouter()

@router.post("/telemetry")
async def record_telemetry(
    vehicle_id: UUID,
    lat: float,
    lon: float,
    speed: float,
    fuel_level: float,
    tenant_id: str = Depends(get_tenant_id)
):
    """
    3. Tracking GPS en tiempo real
    15. Evaluación de conducción (frenadas bruscas, velocidad)
    """
    # Analyze speed for alerts
    alerts = []
    if speed > 90:
        alerts.append("OVERSPEED")

    return {"status": "recorded", "alerts": alerts}

@router.get("/{vehicle_id}/live")
async def get_live_location(
    vehicle_id: UUID,
    tenant_id: str = Depends(get_tenant_id)
):
    """
    3. Tracking GPS en tiempo real
    """
    return {
        "vehicle_id": vehicle_id,
        "lat": -12.046374,
        "lon": -77.042793,
        "eta": "2025-05-18T15:30:00",
        "status": "ON_ROUTE"
    }

@router.post("/geofencing/events")
async def geofencing_event(
    vehicle_id: UUID,
    zone_id: str,
    event: str, # ENTER / EXIT
    tenant_id: str = Depends(get_tenant_id)
):
    """
    13. Geofencing
    """
    return {"status": "event_logged", "zone": zone_id, "event": event}
