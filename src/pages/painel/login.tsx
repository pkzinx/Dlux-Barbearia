import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container } from '../../components/ui/atoms/Container/Container';
import { Background } from '../../components/ui/atoms/Background/Background';
import { Logotipo } from '../../components/ui/atoms/Logotipo/Logotipo';
import * as S from './login.styles';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/barber-login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      });

      if (!response.ok) {
        setError('Email ou senha incorretos');
        return;
      }

      const data = await response.json();
      localStorage.setItem('barber_token', data.access);
      localStorage.setItem('barber_refresh', data.refresh);
      localStorage.setItem('barber_data', JSON.stringify(data.barber));

      router.push('/painel/agenda');
    } catch (err) {
      setError('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Painel Barbeiro | Dlux Barbearia</title>
      </Head>
      <S.Wrapper>
        <Background src="/assets/img/slide-4.jpg">
          <Container>
            <S.LoginCard>
              <S.LogoWrapper>
                <Logotipo />
              </S.LogoWrapper>

              <S.Title>Painel do Barbeiro</S.Title>
              <S.Subtitle>Faça login para acessar sua agenda</S.Subtitle>

              <S.Form onSubmit={handleSubmit}>
                {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

                <S.Field>
                  <S.Label>Email</S.Label>
                  <S.Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="seu@email.com"
                    required
                  />
                </S.Field>

                <S.Field>
                  <S.Label>Senha</S.Label>
                  <S.Input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Sua senha"
                    required
                  />
                </S.Field>

                <S.SubmitButton type="submit" disabled={loading}>
                  {loading ? 'Entrando...' : 'Entrar'}
                </S.SubmitButton>
              </S.Form>
            </S.LoginCard>
          </Container>
        </Background>
      </S.Wrapper>
    </>
  );
};

export default LoginPage;
