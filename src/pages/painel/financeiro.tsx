import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PanelLayout } from '../../components/ui/templates/PanelLayout/PanelLayout';
import * as S from './financeiro.styles';

type Barber = {
  id: number;
  name: string;
  email: string;
  photo_url?: string;
};

type Appointment = {
  id: number;
  service: { name: string; price_cents: number };
  start_at: string;
  status: 'pending' | 'confirmed' | 'done' | 'canceled';
};

type ServiceStats = {
  name: string;
  count: number;
  total: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const FinanceiroPage = () => {
  const router = useRouter();
  const [barber, setBarber] = useState<Barber | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30'); // últimos 30 dias

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
  }, [barber, period]);

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

      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(period));

      const response = await fetch(
        `${API_BASE}/api/appointments/by_barber/?barber_id=${
          barber.id
        }&start=${startDate.toISOString()}&end=${endDate.toISOString()}`,
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

  const handleLogout = () => {
    localStorage.removeItem('barber_token');
    localStorage.removeItem('barber_refresh');
    localStorage.removeItem('barber_data');
    router.push('/painel/login');
  };

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'agenda':
        router.push('/painel/agenda');
        break;
      case 'perfil':
        router.push('/painel/perfil');
        break;
      case 'administracao':
        router.push('/painel/administracao');
        break;
      default:
        break;
    }
  };

  // Cálculos financeiros
  const completedAppointments = appointments.filter((apt) => apt.status === 'done');
  const totalRevenue = completedAppointments.reduce((sum, apt) => sum + apt.service.price_cents, 0);
  const totalAppointments = completedAppointments.length;
  const averageTicket = totalAppointments > 0 ? totalRevenue / totalAppointments : 0;

  // Estatísticas por serviço
  const serviceStats: ServiceStats[] = completedAppointments.reduce((acc, apt) => {
    const existing = acc.find((item) => item.name === apt.service.name);
    if (existing) {
      existing.count += 1;
      existing.total += apt.service.price_cents;
    } else {
      acc.push({
        name: apt.service.name,
        count: 1,
        total: apt.service.price_cents
      });
    }
    return acc;
  }, [] as ServiceStats[]);

  // Receita por dia da semana
  const revenueByDay = completedAppointments.reduce((acc, apt) => {
    const day = new Date(apt.start_at).getDay();
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const dayName = dayNames[day];

    if (!acc[dayName]) {
      acc[dayName] = 0;
    }
    acc[dayName] += apt.service.price_cents;
    return acc;
  }, {} as Record<string, number>);

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(cents / 100);
  };

  if (loading) {
    return (
      <PanelLayout
        barber={barber}
        currentPage="financeiro"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        title="Financeiro"
        subtitle="Carregando..."
      >
        <S.LoadingText>Carregando dados financeiros...</S.LoadingText>
      </PanelLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Financeiro - Painel Barbeiro | Dlux Barbearia</title>
      </Head>
      <PanelLayout
        barber={barber}
        currentPage="financeiro"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        title="Relatório Financeiro"
        subtitle={`Últimos ${period} dias`}
      >
        <S.FinancialDashboard>
          <S.PeriodSelector>
            <S.Label>Período:</S.Label>
            <S.Select value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="7">Últimos 7 dias</option>
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 90 dias</option>
            </S.Select>
          </S.PeriodSelector>

          <S.StatsGrid>
            <S.StatCard>
              <S.StatIcon>💰</S.StatIcon>
              <S.StatValue>{formatCurrency(totalRevenue)}</S.StatValue>
              <S.StatLabel>Receita Total</S.StatLabel>
            </S.StatCard>

            <S.StatCard>
              <S.StatIcon>📊</S.StatIcon>
              <S.StatValue>{totalAppointments}</S.StatValue>
              <S.StatLabel>Serviços Realizados</S.StatLabel>
            </S.StatCard>

            <S.StatCard>
              <S.StatIcon>📈</S.StatIcon>
              <S.StatValue>{formatCurrency(averageTicket)}</S.StatValue>
              <S.StatLabel>Ticket Médio</S.StatLabel>
            </S.StatCard>

            <S.StatCard>
              <S.StatIcon>⭐</S.StatIcon>
              <S.StatValue>{serviceStats.length}</S.StatValue>
              <S.StatLabel>Tipos de Serviço</S.StatLabel>
            </S.StatCard>
          </S.StatsGrid>

          <S.ChartsGrid>
            <S.ChartCard>
              <S.ChartTitle>Receita por Dia da Semana</S.ChartTitle>
              <S.BarChart>
                {Object.entries(revenueByDay).map(([day, revenue]) => (
                  <S.BarItem key={day}>
                    <S.BarLabel>{day}</S.BarLabel>
                    <S.BarContainer>
                      <S.Bar width={`${(revenue / Math.max(...Object.values(revenueByDay))) * 100}%`} />
                    </S.BarContainer>
                    <S.BarValue>{formatCurrency(revenue)}</S.BarValue>
                  </S.BarItem>
                ))}
              </S.BarChart>
            </S.ChartCard>

            <S.ChartCard>
              <S.ChartTitle>Serviços Mais Populares</S.ChartTitle>
              <S.ServiceList>
                {serviceStats
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 5)
                  .map((service) => (
                    <S.ServiceItem key={service.name}>
                      <S.ServiceName>{service.name}</S.ServiceName>
                      <S.ServiceStats>
                        <S.ServiceCount>{service.count} serviços</S.ServiceCount>
                        <S.ServiceRevenue>{formatCurrency(service.total)}</S.ServiceRevenue>
                      </S.ServiceStats>
                    </S.ServiceItem>
                  ))}
              </S.ServiceList>
            </S.ChartCard>
          </S.ChartsGrid>
        </S.FinancialDashboard>
      </PanelLayout>
    </>
  );
};

export default FinanceiroPage;
