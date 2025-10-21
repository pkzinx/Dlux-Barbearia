import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PanelLayout } from '../../components/ui/templates/PanelLayout/PanelLayout';
import * as S from './agenda.styles';

type Appointment = {
  id: number;
  client: { name: string; phone: string };
  service: { name: string; duration_minutes: number };
  start_at: string;
  end_at: string;
  status: 'pending' | 'confirmed' | 'done' | 'canceled';
  notes: string;
};

type Barber = {
  id: number;
  name: string;
  email: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const AgendaPage = () => {
  const router = useRouter();
  const [barber, setBarber] = useState<Barber | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const token = localStorage.getItem('barber_token');
    if (!token) {
      router.push('/painel/login');
      return;
    }

    loadBarberData();
  }, [router]);

  useEffect(() => {
    if (barber) {
      loadAppointments();
    }
  }, [barber, selectedDate]);

  const loadBarberData = async () => {
    try {
      const barberData = localStorage.getItem('barber_data');
      if (barberData) {
        setBarber(JSON.parse(barberData));
        return;
      }

      const token = localStorage.getItem('barber_token');
      const response = await fetch(`${API_BASE}/api/barbers/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        router.push('/painel/login');
        return;
      }

      const barbers = await response.json();
      setBarber(barbers[0]);
    } catch (error) {
      router.push('/painel/login');
    }
  };

  const loadAppointments = async () => {
    if (!barber) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('barber_token');
      const startOfDay = new Date(selectedDate + 'T00:00:00').toISOString();
      const endOfDay = new Date(selectedDate + 'T23:59:59').toISOString();

      const response = await fetch(
        `${API_BASE}/api/appointments/by_barber/?barber_id=${barber.id}&start=${startOfDay}&end=${endOfDay}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('barber_token');
      const response = await fetch(`${API_BASE}/api/appointments/${appointmentId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        loadAppointments();
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#1affea';
      case 'pending':
        return '#ffd166';
      case 'done':
        return '#4ade80';
      case 'canceled':
        return '#ff6b6b';
      default:
        return '#ffffff';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'done':
        return 'Concluído';
      case 'canceled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('barber_token');
    localStorage.removeItem('barber_refresh');
    localStorage.removeItem('barber_data');
    router.push('/painel/login');
  };

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'perfil':
        router.push('/painel/perfil');
        break;
      case 'financeiro':
        router.push('/painel/financeiro');
        break;
      case 'administracao':
        router.push('/painel/administracao');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <PanelLayout
        barber={barber}
        currentPage="agenda"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        title="Agenda"
        subtitle="Carregando..."
      >
        <S.LoadingText>Carregando agenda...</S.LoadingText>
      </PanelLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Agenda - Painel Barbeiro | Dlux Barbearia</title>
      </Head>
      <PanelLayout
        barber={barber}
        currentPage="agenda"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        title="Sua Agenda"
        subtitle={`Agendamentos do dia ${new Date(selectedDate).toLocaleDateString('pt-BR')}`}
      >
        <S.AgendaContent>
          <S.DateSelector>
            <S.Label>Selecione a data:</S.Label>
            <S.DateInput type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </S.DateSelector>

          <S.AppointmentsList>
            {appointments.length === 0 ? (
              <S.EmptyState>
                <S.EmptyIcon>📅</S.EmptyIcon>
                <S.EmptyText>Nenhum agendamento para este dia</S.EmptyText>
              </S.EmptyState>
            ) : (
              appointments.map((appointment) => (
                <S.AppointmentCard key={appointment.id}>
                  <S.AppointmentTime>
                    {formatTime(appointment.start_at)} - {formatTime(appointment.end_at)}
                  </S.AppointmentTime>

                  <S.AppointmentInfo>
                    <S.ClientName>{appointment.client.name}</S.ClientName>
                    <S.ServiceName>{appointment.service.name}</S.ServiceName>
                    <S.ClientPhone>{appointment.client.phone}</S.ClientPhone>
                    {appointment.notes && <S.AppointmentNotes>{appointment.notes}</S.AppointmentNotes>}
                  </S.AppointmentInfo>

                  <S.AppointmentStatus status={appointment.status}>
                    {getStatusText(appointment.status)}
                  </S.AppointmentStatus>

                  <S.AppointmentActions>
                    {appointment.status === 'pending' && (
                      <>
                        <S.ConfirmButton onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}>
                          Confirmar
                        </S.ConfirmButton>
                        <S.CancelButton onClick={() => updateAppointmentStatus(appointment.id, 'canceled')}>
                          Cancelar
                        </S.CancelButton>
                      </>
                    )}
                    {appointment.status === 'confirmed' && (
                      <S.DoneButton onClick={() => updateAppointmentStatus(appointment.id, 'done')}>
                        Concluir
                      </S.DoneButton>
                    )}
                  </S.AppointmentActions>
                </S.AppointmentCard>
              ))
            )}
          </S.AppointmentsList>
        </S.AgendaContent>
      </PanelLayout>
    </>
  );
};

export default AgendaPage;
