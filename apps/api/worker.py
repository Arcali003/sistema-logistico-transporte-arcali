from celery import Celery
from apps.api.config import settings

celery_app = Celery("worker", broker=settings.REDIS_URL)

celery_app.conf.task_routes = {
    "apps.api.worker.test_celery": "main-queue",
}

@celery_app.task
def test_celery(word: str):
    return f"test task return {word}"
