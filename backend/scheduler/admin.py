from django.contrib import admin
from .models import Barber, Service, Client, Appointment


@admin.register(Barber)
class BarberAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "specialties")
    search_fields = ("name", "email", "specialties")


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "duration_minutes", "price_cents")
    search_fields = ("name",)


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "phone", "email")
    search_fields = ("name", "phone", "email")


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("id", "barber", "client", "service", "start_at", "status")
    search_fields = ("client__name", "barber__name", "service__name")
    list_filter = ("status", "barber")
