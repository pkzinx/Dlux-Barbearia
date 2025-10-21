from django.db.models import Q, Count, Sum, Avg
from django.utils.dateparse import parse_datetime
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime, timedelta
import pytz

from .models import Barber, Service, Client, Appointment
from .serializers import (
    BarberSerializer,
    ServiceSerializer,
    ClientSerializer,
    AppointmentSerializer,
)


class PublicReadPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated


class BarberViewSet(viewsets.ModelViewSet):
    queryset = Barber.objects.all().order_by('name')
    serializer_class = BarberSerializer
    permission_classes = [PublicReadPermission]


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by('name')
    serializer_class = ServiceSerializer
    permission_classes = [PublicReadPermission]


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all().order_by('name')
    serializer_class = ClientSerializer
    permission_classes = [PublicReadPermission]


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.select_related('barber', 'service', 'client').all()
    serializer_class = AppointmentSerializer
    permission_classes = [PublicReadPermission]

    def create(self, request, *args, **kwargs):
        data = request.data
        start_at = parse_datetime(data.get('start_at'))
        end_at = parse_datetime(data.get('end_at'))
        barber_id = data.get('barber_id')

        if not (start_at and end_at and barber_id):
            return Response({'detail': 'Dados insuficientes'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar conflitos com buffer de 30 minutos
        buffer_minutes = 30
        start_with_buffer = start_at - timedelta(minutes=buffer_minutes)
        end_with_buffer = end_at + timedelta(minutes=buffer_minutes)

        conflict = Appointment.objects.filter(
            barber_id=barber_id,
            status__in=['pending', 'confirmed']
        ).filter(
            Q(start_at__lt=end_with_buffer) & Q(end_at__gt=start_with_buffer)
        ).exists()

        if conflict:
            return Response({'detail': 'Horário indisponível'}, status=status.HTTP_409_CONFLICT)

        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        # Permitir atualização de status sem autenticação para facilitar o painel
        return super().update(request, *args, **kwargs)

    @action(detail=False, methods=['get'])
    def by_barber(self, request):
        barber_id = request.query_params.get('barber_id')
        start = request.query_params.get('start')
        end = request.query_params.get('end')
        if not (barber_id and start and end):
            return Response({'detail': 'Parâmetros insuficientes'}, status=status.HTTP_400_BAD_REQUEST)
        start_dt = parse_datetime(start)
        end_dt = parse_datetime(end)
        qs = self.queryset.filter(barber_id=barber_id, start_at__gte=start_dt, end_at__lte=end_dt)
        return Response(self.get_serializer(qs, many=True).data)

    @action(detail=False, methods=['get'])
    def available_times(self, request):
        """Retorna horários disponíveis para um barbeiro em uma data específica"""
        barber_id = request.query_params.get('barber_id')
        date_str = request.query_params.get('date')
        service_id = request.query_params.get('service_id')
        
        if not (barber_id and date_str and service_id):
            return Response({'detail': 'Parâmetros insuficientes'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Converter data para datetime
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
            start_of_day = datetime.combine(date_obj, datetime.min.time())
            end_of_day = datetime.combine(date_obj, datetime.max.time())
            
            # Buscar serviço para obter duração
            try:
                service = Service.objects.get(id=service_id)
                service_duration = service.duration_minutes
            except Service.DoesNotExist:
                return Response({'detail': 'Serviço não encontrado'}, status=status.HTTP_404_NOT_FOUND)
            
            # Buscar agendamentos existentes para o barbeiro na data
            existing_appointments = Appointment.objects.filter(
                barber_id=barber_id,
                status__in=['pending', 'confirmed'],
                start_at__gte=start_of_day,
                start_at__lt=end_of_day
            ).order_by('start_at')
            
            # Horários de funcionamento (8h às 18h)
            work_start = datetime.combine(date_obj, datetime.strptime('08:00', '%H:%M').time())
            work_end = datetime.combine(date_obj, datetime.strptime('18:00', '%H:%M').time())
            
            # Buffer entre agendamentos (30 minutos)
            buffer_minutes = 30
            
            available_times = []
            current_time = work_start
            
            while current_time + timedelta(minutes=service_duration) <= work_end:
                # Verificar se há conflito com agendamentos existentes
                appointment_end = current_time + timedelta(minutes=service_duration)
                has_conflict = False
                
                for appointment in existing_appointments:
                    # Verificar sobreposição com buffer
                    appointment_start_with_buffer = appointment.start_at - timedelta(minutes=buffer_minutes)
                    appointment_end_with_buffer = appointment.end_at + timedelta(minutes=buffer_minutes)
                    
                    if (current_time < appointment_end_with_buffer and 
                        appointment_end > appointment_start_with_buffer):
                        has_conflict = True
                        # Pular para depois do agendamento conflitante
                        current_time = appointment.end_at + timedelta(minutes=buffer_minutes)
                        break
                
                if not has_conflict:
                    available_times.append({
                        'time': current_time.strftime('%H:%M'),
                        'datetime': current_time.isoformat(),
                        'end_time': appointment_end.strftime('%H:%M')
                    })
                    current_time += timedelta(minutes=30)  # Intervalos de 30 minutos
                else:
                    current_time += timedelta(minutes=15)  # Verificar a cada 15 minutos
            
            return Response({
                'available_times': available_times,
                'service_duration': service_duration,
                'buffer_minutes': buffer_minutes
            })
            
        except ValueError:
            return Response({'detail': 'Formato de data inválido'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': f'Erro interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BarberLoginView(APIView):
    permission_classes = []  # Sem autenticação necessária
    
    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        password = request.data.get('password', '').strip()
        
        if not email or not password:
            return Response({'detail': 'Email e senha são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Senha fixa para todos os barbeiros
        if password == '123456':
            try:
                barber = Barber.objects.get(email__iexact=email)
                return Response({
                    'access': f'barber_token_{barber.id}',
                    'refresh': f'barber_refresh_{barber.id}',
                    'barber': BarberSerializer(barber).data,
                    'account_type': barber.account_type
                })
            except Barber.DoesNotExist:
                return Response({'detail': 'Barbeiro não encontrado'}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response({'detail': 'Senha incorreta'}, status=status.HTTP_401_UNAUTHORIZED)


class BarberStatsAPIView(APIView):
    """
    API para estatísticas dos barbeiros
    """
    permission_classes = [PublicReadPermission]

    def get(self, request):
        """
        Retorna estatísticas de todos os barbeiros
        Query params:
        - period: número de dias para filtrar (7, 15, 30, 60). Se não informado, retorna todos os dados
        """
        try:
            # Obter parâmetro de período
            period = request.GET.get('period', '0')
            try:
                period = int(period)
            except ValueError:
                period = 0
            
            # Data atual e início do período
            now = datetime.now()
            if period > 0:
                period_start = now - timedelta(days=period)
            else:
                period_start = None  # Todos os dados
            
            barbers_stats = []
            
            for barber in Barber.objects.all():
                # Agendamentos do barbeiro
                appointments = Appointment.objects.filter(barber=barber)
                
                if period_start:
                    period_appointments = appointments.filter(
                        scheduled_date__gte=period_start,
                        scheduled_date__lte=now
                    )
                else:
                    period_appointments = appointments
                
                # Estatísticas
                total_appointments = appointments.count()
                completed_appointments = appointments.filter(status='completed').count()
                period_completed = period_appointments.filter(status='completed').count()
                
                # Receita do período
                period_revenue = period_appointments.filter(
                    status='completed'
                ).aggregate(
                    total=Sum('service__price')
                )['total'] or 0
                
                # Agendamentos recentes (últimos 5 do período)
                recent_appointments = period_appointments.order_by('-scheduled_date')[:5]
                
                barber_stats = {
                    'barber': BarberSerializer(barber).data,
                    'total_appointments': total_appointments,
                    'completed_appointments': period_completed,
                    'monthly_appointments': period_completed,
                    'monthly_revenue': float(period_revenue),
                    'average_rating': 4.5,  # Mock - implementar sistema de avaliações
                    'recent_appointments': AppointmentSerializer(recent_appointments, many=True).data
                }
                
                barbers_stats.append(barber_stats)
            
            return Response(barbers_stats)
            
        except Exception as e:
            return Response(
                {'error': f'Erro ao buscar estatísticas: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class BarberDetailStatsAPIView(APIView):
    """
    API para estatísticas detalhadas de um barbeiro específico
    """
    permission_classes = [PublicReadPermission]

    def get(self, request, barber_id):
        """
        Retorna estatísticas detalhadas de um barbeiro
        """
        try:
            barber = Barber.objects.get(id=barber_id)
            
            # Períodos para análise
            now = datetime.now()
            month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            week_start = now - timedelta(days=7)
            
            # Agendamentos do barbeiro
            appointments = Appointment.objects.filter(barber=barber)
            monthly_appointments = appointments.filter(
                scheduled_date__gte=month_start,
                scheduled_date__lte=now
            )
            weekly_appointments = appointments.filter(
                scheduled_date__gte=week_start,
                scheduled_date__lte=now
            )
            
            # Estatísticas gerais
            total_appointments = appointments.count()
            completed_appointments = appointments.filter(status='completed').count()
            cancelled_appointments = appointments.filter(status='cancelled').count()
            
            # Estatísticas mensais
            monthly_completed = monthly_appointments.filter(status='completed').count()
            monthly_revenue = monthly_appointments.filter(
                status='completed'
            ).aggregate(
                total=Sum('service__price')
            )['total'] or 0
            
            # Estatísticas semanais
            weekly_completed = weekly_appointments.filter(status='completed').count()
            weekly_revenue = weekly_appointments.filter(
                status='completed'
            ).aggregate(
                total=Sum('service__price')
            )['total'] or 0
            
            # Serviços mais populares
            popular_services = monthly_appointments.filter(
                status='completed'
            ).values('service__name').annotate(
                count=Count('id')
            ).order_by('-count')[:5]
            
            # Agendamentos por status
            status_breakdown = appointments.values('status').annotate(
                count=Count('id')
            )
            
            # Agendamentos recentes
            recent_appointments = monthly_appointments.order_by('-scheduled_date')[:10]
            
            stats = {
                'barber': BarberSerializer(barber).data,
                'general_stats': {
                    'total_appointments': total_appointments,
                    'completed_appointments': completed_appointments,
                    'cancelled_appointments': cancelled_appointments,
                    'completion_rate': (completed_appointments / total_appointments * 100) if total_appointments > 0 else 0
                },
                'monthly_stats': {
                    'appointments': monthly_completed,
                    'revenue': float(monthly_revenue),
                    'average_per_day': monthly_completed / now.day if now.day > 0 else 0
                },
                'weekly_stats': {
                    'appointments': weekly_completed,
                    'revenue': float(weekly_revenue)
                },
                'popular_services': list(popular_services),
                'status_breakdown': list(status_breakdown),
                'recent_appointments': AppointmentSerializer(recent_appointments, many=True).data
            }
            
            return Response(stats)
            
        except Barber.DoesNotExist:
            return Response(
                {'error': 'Barbeiro não encontrado'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': f'Erro ao buscar estatísticas: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class AdminDashboardAPIView(APIView):
    """
    API para dashboard administrativo geral
    """
    permission_classes = [PublicReadPermission]

    def get(self, request):
        """
        Retorna estatísticas gerais do sistema
        Query params:
        - period: número de dias para filtrar (7, 15, 30, 60). Se não informado, retorna todos os dados
        """
        try:
            # Obter parâmetro de período
            period = request.GET.get('period', '0')
            try:
                period = int(period)
            except ValueError:
                period = 0
            
            now = datetime.now()
            if period > 0:
                period_start = now - timedelta(days=period)
            else:
                period_start = None  # Todos os dados
            
            # Estatísticas gerais
            total_barbers = Barber.objects.count()
            total_services = Service.objects.count()
            total_clients = Client.objects.count()
            
            # Agendamentos
            appointments = Appointment.objects.all()
            total_appointments = appointments.count()
            
            if period_start:
                period_appointments = appointments.filter(
                    scheduled_date__gte=period_start,
                    scheduled_date__lte=now
                )
            else:
                period_appointments = appointments
            
            # Receita
            total_revenue = appointments.filter(
                status='completed'
            ).aggregate(
                total=Sum('service__price')
            )['total'] or 0
            
            period_revenue = period_appointments.filter(
                status='completed'
            ).aggregate(
                total=Sum('service__price')
            )['total'] or 0
            
            # Status dos agendamentos
            appointments_by_status = period_appointments.values('status').annotate(
                count=Count('id')
            )
            
            # Top barbeiros por receita
            top_barbers = period_appointments.filter(
                status='completed'
            ).values(
                'barber__name', 'barber__id'
            ).annotate(
                revenue=Sum('service__price'),
                appointments=Count('id')
            ).order_by('-revenue')[:5]
            
            dashboard_data = {
                'general_stats': {
                    'total_barbers': total_barbers,
                    'total_services': total_services,
                    'total_clients': total_clients,
                    'total_appointments': period_appointments.count()
                },
                'revenue_stats': {
                    'total_revenue': float(total_revenue),
                    'period_revenue': float(period_revenue)
                },
                'appointments_stats': {
                    'period_appointments': period_appointments.count(),
                    'by_status': list(appointments_by_status)
                },
                'top_barbers': list(top_barbers)
            }
            
            return Response(dashboard_data)
            
        except Exception as e:
            return Response(
                {'error': f'Erro ao buscar dados do dashboard: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
