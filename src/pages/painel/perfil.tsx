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
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const PerfilPage = () => {
  const router = useRouter();
  const [barber, setBarber] = useState<Barber | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
      case 'agendamentos':
        router.push('/painel/agendamentos');
        break;
      case 'financeiro':
        router.push('/painel/financeiro');
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
      </PanelLayout>
    </>
  );
};

export default PerfilPage;
