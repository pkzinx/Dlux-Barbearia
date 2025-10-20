from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BarberViewSet, 
    ServiceViewSet, 
    ClientViewSet, 
    AppointmentViewSet, 
    BarberLoginView,
    BarberStatsAPIView,
    BarberDetailStatsAPIView,
    AdminDashboardAPIView
)

router = DefaultRouter()
router.register(r'barbers', BarberViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'clients', ClientViewSet)
router.register(r'appointments', AppointmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('barber-login/', BarberLoginView.as_view(), name='barber-login'),
    path('barber-stats/', BarberStatsAPIView.as_view(), name='barber-stats'),
    path('barber-stats/<int:barber_id>/', BarberDetailStatsAPIView.as_view(), name='barber-detail-stats'),
    path('admin-dashboard/', AdminDashboardAPIView.as_view(), name='admin-dashboard'),
]
