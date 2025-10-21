import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PanelLayout } from '../../components/ui/templates/PanelLayout/PanelLayout';
import * as S from './administracao.styles';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

type Barber = {
  id: number;
  name: string;
  email: string;
  photo_url?: string;
  specialties?: string;
  account_type: 'admin' | 'lux';
};

type Service = {
  id: number;
  name: string;
  price: number;
  duration_minutes: number;
};

type Appointment = {
  id: number;
  client_name: string;
  client_phone: string;
  service: Service;
  scheduled_date: string;
  scheduled_time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  total_price: number;
};

type BarberStats = {
  barber: Barber;
  total_appointments: number;
  completed_appointments: number;
  monthly_revenue: number;
  average_rating: number;
  recent_appointments: Appointment[];
};

const AdministracaoPage = () => {
  const router = useRouter();
  const [barbersStats, setBarbersStats] = useState<BarberStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<BarberStats | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(0); // 0 = todos os dados, 7, 15, 30, 60 dias
  const [currentBarber, setCurrentBarber] = useState<Barber | null>(null);

  // Mock data para demonstração
  const mockBarbersStats: BarberStats[] = [
    {
      barber: {
        id: 1,
        name: 'Rikelv',
        email: 'rikelv@dlux.com',
        photo_url: '/assets/img/desc.jpg'
      },
      total_appointments: 45,
      completed_appointments: 42,
      monthly_revenue: 1260.00,
      average_rating: 4.8,
      recent_appointments: [
        {
          id: 1,
          client_name: 'João Silva',
          client_phone: '(11) 99999-9999',
          service: { id: 1, name: 'Corte + Barba', price: 35.00, duration_minutes: 50 },
          scheduled_date: '2024-01-15',
          scheduled_time: '14:00',
          status: 'completed',
          total_price: 35.00
        },
        {
          id: 2,
          client_name: 'Pedro Santos',
          client_phone: '(11) 88888-8888',
          service: { id: 2, name: 'Corte', price: 30.00, duration_minutes: 30 },
          scheduled_date: '2024-01-15',
          scheduled_time: '15:30',
          status: 'scheduled',
          total_price: 30.00
        }
      ]
    },
    {
      barber: {
        id: 2,
        name: 'Emerso',
        email: 'emerso@dlux.com',
        photo_url: '/assets/img/desc.jpg'
      },
      total_appointments: 38,
      completed_appointments: 35,
      monthly_revenue: 1050.00,
      average_rating: 4.6,
      recent_appointments: [
        {
          id: 3,
          client_name: 'Carlos Lima',
          client_phone: '(11) 77777-7777',
          service: { id: 3, name: 'Barba', price: 20.00, duration_minutes: 20 },
          scheduled_date: '2024-01-15',
          scheduled_time: '16:00',
          status: 'completed',
          total_price: 20.00
        }
      ]
    },
    {
      barber: {
        id: 3,
        name: 'Kaue',
        email: 'kaue@dlux.com',
        photo_url: '/assets/img/desc.jpg'
      },
      total_appointments: 52,
      completed_appointments: 48,
      monthly_revenue: 1440.00,
      average_rating: 4.9,
      recent_appointments: []
    },
    {
      barber: {
        id: 4,
        name: 'Kevin',
        email: 'kevin@dlux.com',
        photo_url: '/assets/img/desc.jpg'
      },
      total_appointments: 41,
      completed_appointments: 38,
      monthly_revenue: 1140.00,
      average_rating: 4.7,
      recent_appointments: []
    },
    {
      barber: {
        id: 5,
        name: 'Alafi',
        email: 'alafi@dlux.com',
        photo_url: '/assets/img/desc.jpg'
      },
      total_appointments: 33,
      completed_appointments: 30,
      monthly_revenue: 900.00,
      average_rating: 4.5,
      recent_appointments: []
    }
  ];

  // Função para filtrar dados por período
  const filterDataByPeriod = (data: BarberStats[], period: number): BarberStats[] => {
    if (period === 0) return data; // Todos os dados
    
    const now = new Date();
    const periodStart = new Date(now.getTime() - (period * 24 * 60 * 60 * 1000));
    
    return data.map(barberStats => {
      const filteredAppointments = barberStats.recent_appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.scheduled_date);
        return appointmentDate >= periodStart;
      });
      
      // Simular ajuste de estatísticas baseado no período
      const periodMultiplier = period === 7 ? 0.25 : period === 15 ? 0.5 : period === 30 ? 0.75 : 1;
      
      return {
        ...barberStats,
        completed_appointments: Math.floor(barberStats.completed_appointments * periodMultiplier),
        monthly_revenue: barberStats.monthly_revenue * periodMultiplier,
        recent_appointments: filteredAppointments
      };
    });
  };

  useEffect(() => {
    // Verificar se há token de autenticação
    const token = localStorage.getItem('barber_token');
    if (!token) {
      router.push('/painel/login');
      return;
    }

    // Carregar dados do barbeiro logado
    loadBarberData();
  }, [router]);

  const loadBarberData = async () => {
    try {
      const barberData = localStorage.getItem('barber_data');
      if (barberData) {
        const barber = JSON.parse(barberData);
        setCurrentBarber(barber);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do barbeiro:', error);
    }
  };

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      const filteredData = filterDataByPeriod(mockBarbersStats, selectedPeriod);
      setBarbersStats(filteredData);
      setLoading(false);
    }, 1000);
  }, [selectedPeriod]);

  const handleNavigate = (page: string) => {
    router.push(`/painel/${page}`);
  };

  const handleLogout = () => {
    router.push('/painel/login');
  };

  const openBarberDetails = (barberStats: BarberStats) => {
    setSelectedBarber(barberStats);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBarber(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'scheduled': return '#007bff';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'scheduled': return 'Agendado';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconhecido';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getPeriodLabel = (period: number) => {
    switch (period) {
      case 0: return 'Total';
      case 7: return 'Últimos 7 dias';
      case 15: return 'Últimos 15 dias';
      case 30: return 'Últimos 30 dias';
      case 60: return 'Últimos 60 dias';
      default: return 'Total';
    }
  };

  const totalRevenue = barbersStats.reduce((sum, barber) => sum + barber.monthly_revenue, 0);
  const totalAppointments = barbersStats.reduce((sum, barber) => sum + barber.completed_appointments, 0);

  if (loading) {
    return (
      <PanelLayout
        barber={currentBarber}
        currentPage="administracao"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        title="Administração"
        subtitle="Carregando dados dos barbeiros..."
      >
        <S.LoadingContainer>
          <S.LoadingSpinner />
          <p>Carregando dados dos barbeiros...</p>
        </S.LoadingContainer>
      </PanelLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Administração - Dlux Barbearia</title>
      </Head>

      <PanelLayout
        barber={currentBarber}
        currentPage="administracao"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        title="Administração"
        subtitle="Gestão completa dos barbeiros e estatísticas"
      >
        <S.Container>
          {/* Filtro de Período */}
          <S.PeriodFilter>
            <S.FilterTitle>Filtrar por Período:</S.FilterTitle>
            <S.FilterButtons>
              <S.FilterButton 
                active={selectedPeriod === 0} 
                onClick={() => setSelectedPeriod(0)}
              >
                Todos
              </S.FilterButton>
              <S.FilterButton 
                active={selectedPeriod === 7} 
                onClick={() => setSelectedPeriod(7)}
              >
                Últimos 7 dias
              </S.FilterButton>
              <S.FilterButton 
                active={selectedPeriod === 15} 
                onClick={() => setSelectedPeriod(15)}
              >
                Últimos 15 dias
              </S.FilterButton>
              <S.FilterButton 
                active={selectedPeriod === 30} 
                onClick={() => setSelectedPeriod(30)}
              >
                Últimos 30 dias
              </S.FilterButton>
              <S.FilterButton 
                active={selectedPeriod === 60} 
                onClick={() => setSelectedPeriod(60)}
              >
                Últimos 60 dias
              </S.FilterButton>
            </S.FilterButtons>
          </S.PeriodFilter>
          {/* Resumo Geral */}
          <S.SummaryCards>
            <S.SummaryCard>
              <S.SummaryIcon>👥</S.SummaryIcon>
              <S.SummaryContent>
                <S.SummaryValue>{barbersStats.length}</S.SummaryValue>
                <S.SummaryLabel>Barbeiros Ativos</S.SummaryLabel>
              </S.SummaryContent>
            </S.SummaryCard>

            <S.SummaryCard>
              <S.SummaryIcon>📅</S.SummaryIcon>
              <S.SummaryContent>
                <S.SummaryValue>{totalAppointments}</S.SummaryValue>
                <S.SummaryLabel>Serviços Concluídos ({getPeriodLabel(selectedPeriod)})</S.SummaryLabel>
              </S.SummaryContent>
            </S.SummaryCard>

            <S.SummaryCard>
              <S.SummaryIcon>💰</S.SummaryIcon>
              <S.SummaryContent>
                <S.SummaryValue>{formatCurrency(totalRevenue)}</S.SummaryValue>
                <S.SummaryLabel>Receita ({getPeriodLabel(selectedPeriod)})</S.SummaryLabel>
              </S.SummaryContent>
            </S.SummaryCard>

            <S.SummaryCard>
              <S.SummaryIcon>⭐</S.SummaryIcon>
              <S.SummaryContent>
                <S.SummaryValue>
                  {(barbersStats.reduce((sum, b) => sum + b.average_rating, 0) / barbersStats.length).toFixed(1)}
                </S.SummaryValue>
                <S.SummaryLabel>Média de Avaliações</S.SummaryLabel>
              </S.SummaryContent>
            </S.SummaryCard>
          </S.SummaryCards>

          {/* Lista de Barbeiros */}
          <S.BarbersSection>
            <S.SectionTitle>Barbeiros</S.SectionTitle>
            <S.BarbersGrid>
              {barbersStats.map((barberStats) => (
                <S.BarberCard key={barberStats.barber.id} onClick={() => openBarberDetails(barberStats)}>
                  <S.BarberHeader>
                    <S.BarberPhoto>
                      <img 
                        src={barberStats.barber.photo_url || '/assets/img/desc.jpg'} 
                        alt={barberStats.barber.name}
                      />
                    </S.BarberPhoto>
                    <S.BarberInfo>
                      <S.BarberName>{barberStats.barber.name}</S.BarberName>
                      <S.BarberEmail>{barberStats.barber.email}</S.BarberEmail>
                    </S.BarberInfo>
                  </S.BarberHeader>

                  <S.BarberStats>
                    <S.StatItem>
                      <S.StatIcon>📅</S.StatIcon>
                      <S.StatContent>
                        <S.StatValue>{barberStats.completed_appointments}</S.StatValue>
                        <S.StatLabel>Serviços</S.StatLabel>
                      </S.StatContent>
                    </S.StatItem>

                    <S.StatItem>
                      <S.StatIcon>💰</S.StatIcon>
                      <S.StatContent>
                        <S.StatValue>{formatCurrency(barberStats.monthly_revenue)}</S.StatValue>
                        <S.StatLabel>Receita</S.StatLabel>
                      </S.StatContent>
                    </S.StatItem>

                    <S.StatItem>
                      <S.StatIcon>⭐</S.StatIcon>
                      <S.StatContent>
                        <S.StatValue>{barberStats.average_rating}</S.StatValue>
                        <S.StatLabel>Avaliação</S.StatLabel>
                      </S.StatContent>
                    </S.StatItem>
                  </S.BarberStats>

                  <S.BarberFooter>
                    <S.ViewDetailsButton>
                      Ver Detalhes →
                    </S.ViewDetailsButton>
                  </S.BarberFooter>
                </S.BarberCard>
              ))}
            </S.BarbersGrid>
          </S.BarbersSection>

          {/* Modal de Detalhes */}
          {showModal && selectedBarber && (
            <S.ModalOverlay onClick={closeModal}>
              <S.ModalContent onClick={(e) => e.stopPropagation()}>
                <S.ModalHeader>
                  <S.ModalTitle>
                    <S.BarberPhoto>
                      <img 
                        src={selectedBarber.barber.photo_url || '/assets/img/desc.jpg'} 
                        alt={selectedBarber.barber.name}
                      />
                    </S.BarberPhoto>
                    <div>
                      <h2>{selectedBarber.barber.name}</h2>
                      <p>{selectedBarber.barber.email}</p>
                    </div>
                  </S.ModalTitle>
                  <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                </S.ModalHeader>

                <S.ModalBody>
                  <S.DetailedStats>
                    <S.DetailedStat>
                      <S.DetailedStatIcon>📅</S.DetailedStatIcon>
                      <S.DetailedStatContent>
                        <S.DetailedStatValue>{selectedBarber.total_appointments}</S.DetailedStatValue>
                        <S.DetailedStatLabel>Total de Agendamentos</S.DetailedStatLabel>
                      </S.DetailedStatContent>
                    </S.DetailedStat>

                    <S.DetailedStat>
                      <S.DetailedStatIcon>✅</S.DetailedStatIcon>
                      <S.DetailedStatContent>
                        <S.DetailedStatValue>{selectedBarber.completed_appointments}</S.DetailedStatValue>
                        <S.DetailedStatLabel>Serviços Concluídos</S.DetailedStatLabel>
                      </S.DetailedStatContent>
                    </S.DetailedStat>

                    <S.DetailedStat>
                      <S.DetailedStatIcon>💰</S.DetailedStatIcon>
                      <S.DetailedStatContent>
                        <S.DetailedStatValue>{formatCurrency(selectedBarber.monthly_revenue)}</S.DetailedStatValue>
                        <S.DetailedStatLabel>Receita Mensal</S.DetailedStatLabel>
                      </S.DetailedStatContent>
                    </S.DetailedStat>

                    <S.DetailedStat>
                      <S.DetailedStatIcon>⭐</S.DetailedStatIcon>
                      <S.DetailedStatContent>
                        <S.DetailedStatValue>{selectedBarber.average_rating}</S.DetailedStatValue>
                        <S.DetailedStatLabel>Média de Avaliações</S.DetailedStatLabel>
                      </S.DetailedStatContent>
                    </S.DetailedStat>
                  </S.DetailedStats>

                  {selectedBarber.recent_appointments.length > 0 && (
                    <S.RecentAppointments>
                      <S.SectionTitle>Agendamentos Recentes</S.SectionTitle>
                      <S.AppointmentsList>
                        {selectedBarber.recent_appointments.map((appointment) => (
                          <S.AppointmentItem key={appointment.id}>
                            <S.AppointmentInfo>
                              <S.AppointmentClient>{appointment.client_name}</S.AppointmentClient>
                              <S.AppointmentService>{appointment.service.name}</S.AppointmentService>
                              <S.AppointmentDateTime>
                                {formatDate(appointment.scheduled_date)} às {appointment.scheduled_time}
                              </S.AppointmentDateTime>
                            </S.AppointmentInfo>
                            <S.AppointmentDetails>
                              <S.AppointmentStatus color={getStatusColor(appointment.status)}>
                                {getStatusText(appointment.status)}
                              </S.AppointmentStatus>
                              <S.AppointmentPrice>{formatCurrency(appointment.total_price)}</S.AppointmentPrice>
                            </S.AppointmentDetails>
                          </S.AppointmentItem>
                        ))}
                      </S.AppointmentsList>
                    </S.RecentAppointments>
                  )}
                </S.ModalBody>
              </S.ModalContent>
            </S.ModalOverlay>
          )}
        </S.Container>
      </PanelLayout>
    </>
  );
};

export default AdministracaoPage;
