from django.core.management.base import BaseCommand
from scheduler.models import Barber

BARBERS = [
    {"name": "Rikelv", "email": "rikelv@example.com", "specialties": "Corte, Barba", "photo_url": "/assets/img/desc.jpg"},
    {"name": "Emerso", "email": "emerso@example.com", "specialties": "Corte", "photo_url": "/assets/img/desc.jpg"},
    {"name": "Kaue", "email": "kaue@example.com", "specialties": "Barba", "photo_url": "/assets/img/desc.jpg"},
    {"name": "Kevin", "email": "kevin@example.com", "specialties": "Corte Fade", "photo_url": "/assets/img/desc.jpg"},
    {"name": "Alafi", "email": "alafi@example.com", "specialties": "Cabelo e Barba", "photo_url": "/assets/img/desc.jpg"},
]


class Command(BaseCommand):
    help = "Seed default barbers with photos"

    def handle(self, *args, **options):
        created = 0
        for b in BARBERS:
            obj, was_created = Barber.objects.update_or_create(
                email=b["email"], defaults=b
            )
            if was_created:
                created += 1
        self.stdout.write(self.style.SUCCESS(f"Seeded barbers. Created: {created}"))
