import pytest
from fastapi.testclient import TestClient
from apps.api.main import app
import uuid

client = TestClient(app)
TEST_TENANT = str(uuid.uuid4())

def test_shipments_optimize():
    response = client.post("/api/v1/shipments/optimize",
                           json={"shipment_ids": [], "vehicle_ids": []},
                           headers={"X-Tenant-ID": TEST_TENANT})
    assert response.status_code == 200
    assert response.json()["status"] == "success"

def test_tracking_telemetry():
    # Use query parameters or ensure body is correct.
    # FastAPI by default expects basic types in query if not Pydantic.
    response = client.post(f"/api/v1/tracking/telemetry?vehicle_id={uuid.uuid4()}&lat=0&lon=0&speed=100&fuel_level=50",
                           headers={"X-Tenant-ID": TEST_TENANT})
    assert response.status_code == 200
    assert "OVERSPEED" in response.json()["alerts"]

def test_fleet_efficiency():
    response = client.get("/api/v1/fleet/efficiency",
                          headers={"X-Tenant-ID": TEST_TENANT})
    assert response.status_code == 200
    assert "avg_fuel_consumption" in response.json()
