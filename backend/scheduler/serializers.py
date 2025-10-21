from rest_framework import serializers
from .models import Barber, Service, Client, Appointment


class BarberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Barber
        fields = ['id', 'name', 'email', 'specialties', 'photo_url']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'duration_minutes', 'price_cents', 'description']


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'phone', 'email']


class AppointmentSerializer(serializers.ModelSerializer):
    barber = BarberSerializer(read_only=True)
    service = ServiceSerializer(read_only=True)
    client = ClientSerializer(read_only=True)

    barber_id = serializers.PrimaryKeyRelatedField(queryset=Barber.objects.all(), source='barber', write_only=True)
    service_id = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all(), source='service', write_only=True)
    client_id = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all(), source='client', write_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id', 'barber', 'service', 'client', 'barber_id', 'service_id', 'client_id',
            'start_at', 'end_at', 'status', 'notes'
        ]
