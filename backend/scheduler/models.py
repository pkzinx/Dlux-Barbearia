from django.db import models


class Barber(models.Model):
    ACCOUNT_TYPE_CHOICES = (
        ('admin', 'Admin'),
        ('lux', 'Lux'),
    )
    
    name = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    specialties = models.CharField(max_length=255, blank=True)
    photo_url = models.URLField(blank=True)
    account_type = models.CharField(max_length=10, choices=ACCOUNT_TYPE_CHOICES, default='lux')
    password = models.CharField(max_length=255, default='123456')  # Para autenticação

    def __str__(self) -> str:
        return self.name


class Service(models.Model):
    name = models.CharField(max_length=120)
    duration_minutes = models.PositiveIntegerField(default=30)
    price_cents = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.name


class Client(models.Model):
    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=40)
    email = models.EmailField(blank=True)

    def __str__(self) -> str:
        return self.name


class Appointment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('done', 'Done'),
        ('canceled', 'Canceled'),
    )

    barber = models.ForeignKey(Barber, on_delete=models.CASCADE, related_name='appointments')
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='appointments')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='appointments')
    start_at = models.DateTimeField()
    end_at = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-start_at']
        indexes = [
            models.Index(fields=['barber', 'start_at']),
        ]

    def __str__(self) -> str:
        return f"{self.client} - {self.service} - {self.start_at}"
