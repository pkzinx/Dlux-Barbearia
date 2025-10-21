import { Logotipo } from '../../atoms/Logotipo/Logotipo';
import * as S from './NavBar.styles';

type Barber = {
  id: number;
  name: string;
  email: string;
  photo_url?: string;
};

type NavBarProps = {
  barber: Barber | null;
  onLogout: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
};

export const NavBar = ({ barber, onLogout, currentPage = 'agenda', onNavigate }: NavBarProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <S.NavWrapper>
      <S.NavContainer>
        <S.NavLeft>
          <S.LogoWrapper>
            <Logotipo />
            <S.BrandText>
              <h1>Dlux Barbearia</h1>
              <span>Painel do Barbeiro</span>
            </S.BrandText>
          </S.LogoWrapper>
        </S.NavLeft>

        <S.NavRight>
          <S.NavActions>
            <S.NavButton className={currentPage === 'agenda' ? 'active' : ''} onClick={() => onNavigate?.('agenda')}>
              📅 Agenda
            </S.NavButton>
            <S.NavButton
              className={currentPage === 'agendamentos' ? 'active' : ''}
              onClick={() => onNavigate?.('agendamentos')}
            >
              📋 Agendamentos
            </S.NavButton>
          </S.NavActions>

          <S.UserInfo>
            <S.UserPhoto>
              <img src={barber?.photo_url || '/assets/img/desc.jpg'} alt={barber?.name || 'Barbeiro'} />
            </S.UserPhoto>
            <S.UserDetails>
              <h3>
                {getGreeting()}, {barber?.name}
              </h3>
              <span>{barber?.email}</span>
            </S.UserDetails>
          </S.UserInfo>

          <S.LogoutButton onClick={onLogout}>Sair</S.LogoutButton>
        </S.NavRight>
      </S.NavContainer>
    </S.NavWrapper>
  );
};
