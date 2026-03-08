import logging
from fastapi import FastAPI
from apps.api.config import settings
from apps.api.src.api.v1 import shipments, tracking, fleet, inventory

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

app.include_router(shipments.router, prefix=f"{settings.API_V1_STR}/shipments", tags=["shipments"])
app.include_router(tracking.router, prefix=f"{settings.API_V1_STR}/tracking", tags=["tracking"])
app.include_router(fleet.router, prefix=f"{settings.API_V1_STR}/fleet", tags=["fleet"])
app.include_router(inventory.router, prefix=f"{settings.API_V1_STR}/inventory", tags=["inventory"])

@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok", "project": settings.PROJECT_NAME, "version": settings.VERSION}

@app.get("/", include_in_schema=False)
def root():
    return {"message": "Welcome to SLTA Logistics API"}
