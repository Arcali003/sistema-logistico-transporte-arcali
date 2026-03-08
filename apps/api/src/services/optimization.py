from typing import List, Dict, Optional
import logging
import random
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class RouteOptimizer:
    """
    1. Optimización automática de rutas
    Engine for solving Vehicle Routing Problem (VRP).
    """

    def __init__(self, tenant_id: str):
        self.tenant_id = tenant_id
        # Weights for optimization (can be fetched from tenant settings)
        self.weights = {
            "distance": 0.4,
            "time": 0.4,
            "cost": 0.2
        }

    async def optimize(self, shipment_ids: List[str], vehicle_ids: List[str], focus: str = "balanced") -> Dict:
        """
        Runs a simulated VRP algorithm considering traffic, weather, distance and cost.
        Adjusts weights based on the 'focus' parameter: 'balanced', 'fastest', 'cheapest'.
        """
        logger.info(f"Starting optimization for tenant {self.tenant_id} with focus: {focus}")

        # Adjust weights based on focus
        if focus == "fastest":
            self.weights = {"distance": 0.2, "time": 0.7, "cost": 0.1}
        elif focus == "cheapest":
            self.weights = {"distance": 0.3, "time": 0.1, "cost": 0.6}

        # Simulated logic: distribute shipments among vehicles considering weights
        routes = []
        for i, vid in enumerate(vehicle_ids):
            assigned = shipment_ids[i::len(vehicle_ids)] if vehicle_ids else []
            if assigned:
                # Mock metrics calculated based on weights
                dist_factor = random.uniform(0.8, 1.2) * (1 - self.weights["distance"])
                time_factor = random.uniform(0.9, 1.1) * (1 - self.weights["time"])

                routes.append({
                    "vehicle_id": vid,
                    "stops": assigned,
                    "estimated_cost": random.uniform(100, 500) * (1 if focus != "cheapest" else 0.8),
                    "optimized_distance_km": random.uniform(20, 150) * dist_factor,
                    "estimated_time_minutes": random.uniform(60, 240) * time_factor
                })

        return {
            "status": "success",
            "focus": focus,
            "weights_used": self.weights,
            "suggested_routes": routes,
            "metrics": {
                "total_distance_km": sum(r["optimized_distance_km"] for r in routes),
                "estimated_fuel_saving_percentage": 18.5 if focus == "cheapest" else 12.0,
                "traffic_impact": "LOW",
                "weather_condition": "CLEAR"
            }
        }

class DelayPredictor:
    """
    12. Predicción de retrasos con IA
    """
    def __init__(self, tenant_id: str):
        self.tenant_id = tenant_id

    async def predict(self, shipment_id: str) -> Dict:
        # Simulate ML model prediction based on historical data
        prediction = random.choice([0, 10, 15, 30, 45])
        confidence = random.uniform(0.7, 0.95)

        return {
            "predicted_delay_minutes": prediction,
            "confidence": confidence,
            "factors": ["Traffic bottleneck at North Ave", "Heavy rain in sector B"],
            "timestamp": datetime.now().isoformat()
        }
