from django.core.management.base import BaseCommand
from scheduler.models import Barber


class Command(BaseCommand):
    help = 'Popula o banco com dados de barbeiros'

    def handle(self, *args, **options):
        # Barbeiros Lux (Rikelv, Emerson, Kevin)
        lux_barbers = [
            {
                'name': 'Rikelv',
                'email': 'rikelv@dlux.com',
                'specialties': 'Corte, Barba, Sobrancelha',
                'photo_url': '/assets/img/desc.jpg',
                'account_type': 'lux',
                'password': '123456'
            },
            {
                'name': 'Emerson',
                'email': 'emerson@dlux.com',
                'specialties': 'Corte, Barba, Design de Barba',
                'photo_url': '/assets/img/desc.jpg',
                'account_type': 'lux',
                'password': '123456'
            },
            {
                'name': 'Kevin',
                'email': 'kevin@dlux.com',
                'specialties': 'Corte, Barba, Hidratação',
                'photo_url': '/assets/img/desc.jpg',
                'account_type': 'lux',
                'password': '123456'
            }
        ]

        # Barbeiros Admin (Kaue, Alafi)
        admin_barbers = [
            {
                'name': 'Kaue',
                'email': 'kaue@dlux.com',
                'specialties': 'Corte, Barba, Administração',
                'photo_url': '/assets/img/desc.jpg',
                'account_type': 'admin',
                'password': '123456'
            },
            {
                'name': 'Alafi',
                'email': 'alafi@dlux.com',
                'specialties': 'Corte, Barba, Administração',
                'photo_url': '/assets/img/desc.jpg',
                'account_type': 'admin',
                'password': '123456'
            }
        ]

        # Criar barbeiros Lux
        for barber_data in lux_barbers:
            barber, created = Barber.objects.get_or_create(
                email=barber_data['email'],
                defaults=barber_data
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Barbeiro Lux criado: {barber.name}')
                )
            else:
                # Atualizar dados existentes
                for key, value in barber_data.items():
                    setattr(barber, key, value)
                barber.save()
                self.stdout.write(
                    self.style.WARNING(f'Barbeiro Lux atualizado: {barber.name}')
                )

        # Criar barbeiros Admin
        for barber_data in admin_barbers:
            barber, created = Barber.objects.get_or_create(
                email=barber_data['email'],
                defaults=barber_data
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Barbeiro Admin criado: {barber.name}')
                )
            else:
                # Atualizar dados existentes
                for key, value in barber_data.items():
                    setattr(barber, key, value)
                barber.save()
                self.stdout.write(
                    self.style.WARNING(f'Barbeiro Admin atualizado: {barber.name}')
                )

        self.stdout.write(
            self.style.SUCCESS('Todos os barbeiros foram criados/atualizados com sucesso!')
        )