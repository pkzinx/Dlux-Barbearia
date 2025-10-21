import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PanelLayout } from '../../components/ui/templates/PanelLayout/PanelLayout';
import * as S from './perfil.styles';

type Barber = {
  id: number;
  name: string;
  email: string;
  photo_url?: string;
  specialties?: string;
  account_type: 'admin' | 'lux';
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const PerfilPage = () => {
  const router = useRouter();
  const [barber, setBarber] = useState<Barber | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    completedAppointments: 0,
    totalRevenue: 0,
    averageRating: 0,
    monthlyAppointments: 0,
    monthlyRevenue: 0
  });
  const [form, setForm] = useState({
    name: '',
    email: '',
    specialties: '',
    photo_url: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('barber_token');
    if (!token) {
      router.push('/painel/login');
      return;
    }

    loadBarberData();
  }, [router]);

  useEffect(() => {
    if (barber && barber.account_type === 'lux') {
      loadBarberStats();
    }
  }, [barber]);

  const loadBarberData = async () => {
    try {
      const barberData = localStorage.getItem('barber_data');
      if (barberData) {
        const barberInfo = JSON.parse(barberData);
        setBarber(barberInfo);
        setForm({
          name: barberInfo.name || '',
          email: barberInfo.email || '',
          specialties: barberInfo.specialties || '',
          photo_url: barberInfo.photo_url || ''
        });
        setLoading(false);
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
      const barberInfo = barbers[0];
      setBarber(barberInfo);
      setForm({
        name: barberInfo.name || '',
        email: barberInfo.email || '',
        specialties: barberInfo.specialties || '',
        photo_url: barberInfo.photo_url || ''
      });
    } catch (error) {
      router.push('/painel/login');
    } finally {
      setLoading(false);
    }
  };

  const loadBarberStats = async () => {
    if (!barber) return;
    
    try {
      const response = await fetch(`${API_BASE}/barber-stats/${barber.id}/`);
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalAppointments: data.total_appointments || 0,
          completedAppointments: data.completed_appointments || 0,
          totalRevenue: data.total_revenue || 0,
          averageRating: data.average_rating || 0,
          monthlyAppointments: data.monthly_appointments || 0,
          monthlyRevenue: data.monthly_revenue || 0
        });
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      // Dados mock para demonstração
      setStats({
        totalAppointments: 45,
        completedAppointments: 42,
        totalRevenue: 225000, // R$ 2.250,00 em centavos
        averageRating: 4.8,
        monthlyAppointments: 18,
        monthlyRevenue: 90000 // R$ 900,00 em centavos
      });
    }
  };

  const handleSave = async () => {
    if (!barber) return;

    setSaving(true);
    try {
      const token = localStorage.getItem('barber_token');
      const response = await fetch(`${API_BASE}/api/barbers/${barber.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const updatedBarber = await response.json();
        setBarber(updatedBarber);
        localStorage.setItem('barber_data', JSON.stringify(updatedBarber));
        alert('Perfil atualizado com sucesso!');
      } else {
        alert('Erro ao atualizar perfil');
      }
    } catch (error) {
      alert('Erro ao atualizar perfil');
    } finally {
      setSaving(false);
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
        currentPage="perfil"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        title="Perfil"
        subtitle="Carregando..."
      >
        <S.LoadingText>Carregando perfil...</S.LoadingText>
      </PanelLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Perfil - Painel Barbeiro | Dlux Barbearia</title>
      </Head>
      <PanelLayout
        barber={barber}
        currentPage="perfil"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        title="Meu Perfil"
        subtitle="Gerencie suas informações pessoais"
      >
        {barber?.account_type === 'lux' ? (
          <S.StatsContainer>
            <S.StatsTitle>Suas Estatísticas</S.StatsTitle>
            
            <S.StatsGrid>
              <S.StatCard>
                <S.StatIcon>📊</S.StatIcon>
                <S.StatContent>
                  <S.StatValue>{stats.totalAppointments}</S.StatValue>
                  <S.StatLabel>Total de Agendamentos</S.StatLabel>
                </S.StatContent>
              </S.StatCard>

              <S.StatCard>
                <S.StatIcon>✅</S.StatIcon>
                <S.StatContent>
                  <S.StatValue>{stats.completedAppointments}</S.StatValue>
                  <S.StatLabel>Agendamentos Concluídos</S.StatLabel>
                </S.StatContent>
              </S.StatCard>

              <S.StatCard>
                <S.StatIcon>💰</S.StatIcon>
                <S.StatContent>
                  <S.StatValue>R$ {(stats.totalRevenue / 100).toFixed(2)}</S.StatValue>
                  <S.StatLabel>Faturamento Total</S.StatLabel>
                </S.StatContent>
              </S.StatCard>

              <S.StatCard>
                <S.StatIcon>⭐</S.StatIcon>
                <S.StatContent>
                  <S.StatValue>{stats.averageRating.toFixed(1)}</S.StatValue>
                  <S.StatLabel>Avaliação Média</S.StatLabel>
                </S.StatContent>
              </S.StatCard>

              <S.StatCard>
                <S.StatIcon>📅</S.StatIcon>
                <S.StatContent>
                  <S.StatValue>{stats.monthlyAppointments}</S.StatValue>
                  <S.StatLabel>Agendamentos Este Mês</S.StatLabel>
                </S.StatContent>
              </S.StatCard>

              <S.StatCard>
                <S.StatIcon>💵</S.StatIcon>
                <S.StatContent>
                  <S.StatValue>R$ {(stats.monthlyRevenue / 100).toFixed(2)}</S.StatValue>
                  <S.StatLabel>Faturamento Este Mês</S.StatLabel>
                </S.StatContent>
              </S.StatCard>
            </S.StatsGrid>

            <S.BarberInfo>
              <S.InfoTitle>Informações Pessoais</S.InfoTitle>
              <S.InfoGrid>
                <S.InfoItem>
                  <S.InfoLabel>Nome:</S.InfoLabel>
                  <S.InfoValue>{barber.name}</S.InfoValue>
                </S.InfoItem>
                <S.InfoItem>
                  <S.InfoLabel>Email:</S.InfoLabel>
                  <S.InfoValue>{barber.email}</S.InfoValue>
                </S.InfoItem>
                <S.InfoItem>
                  <S.InfoLabel>Especialidades:</S.InfoLabel>
                  <S.InfoValue>{barber.specialties || 'Não informado'}</S.InfoValue>
                </S.InfoItem>
                <S.InfoItem>
                  <S.InfoLabel>Tipo de Conta:</S.InfoLabel>
                  <S.InfoValue>Lux</S.InfoValue>
                </S.InfoItem>
              </S.InfoGrid>
            </S.BarberInfo>
          </S.StatsContainer>
        ) : (
          <S.ProfileForm>
          <S.PhotoSection>
            <S.PhotoWrapper>
              <img src={form.photo_url || '/assets/img/desc.jpg'} alt={barber?.name || 'Barbeiro'} />
            </S.PhotoWrapper>
            <S.PhotoInput>
              <S.Label>URL da Foto</S.Label>
              <S.Input
                type="url"
                value={form.photo_url}
                onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
                placeholder="https://exemplo.com/foto.jpg"
              />
            </S.PhotoInput>
          </S.PhotoSection>

          <S.FormSection>
            <S.Field>
              <S.Label>Nome Completo</S.Label>
              <S.Input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Seu nome completo"
              />
            </S.Field>

            <S.Field>
              <S.Label>Email</S.Label>
              <S.Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="seu@email.com"
              />
            </S.Field>

            <S.Field>
              <S.Label>Especialidades</S.Label>
              <S.TextArea
                value={form.specialties}
                onChange={(e) => setForm({ ...form, specialties: e.target.value })}
                placeholder="Ex: Corte, Barba, Fade..."
                rows={3}
              />
            </S.Field>
          </S.FormSection>

          <S.Actions>
            <S.SaveButton onClick={handleSave} disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </S.SaveButton>
          </S.Actions>
        </S.ProfileForm>
        )}
      </PanelLayout>
    </>
  );
};

export default PerfilPage;
