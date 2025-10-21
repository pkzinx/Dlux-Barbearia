import { Logotipo } from '../../atoms/Logotipo/Logotipo';
import * as S from './TopNav.styles';

type Barber = {
  id: number;
  name: string;
  email: string;
  photo_url?: string;
};

type TopNavProps = {
  barber: Barber | null;
  currentPage: string;
  onLogout: () => void;
  onNavigate: (page: string) => void;
};

export const TopNav = ({ barber, currentPage, onLogout, onNavigate }: TopNavProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <S.TopNavWrapper>
      <S.TopNavContainer>
        <S.LeftSection>
          <S.LogoWrapper>
            <Logotipo />
            <S.BrandText>
              <h1>Dlux Barbearia</h1>
              <span>Painel Administrativo</span>
            </S.BrandText>
          </S.LogoWrapper>
        </S.LeftSection>

        <S.RightSection>
          <S.UserSection>
            <S.UserPhoto>
              <img src={barber?.photo_url || '/assets/img/desc.jpg'} alt={barber?.name || 'Barbeiro'} />
            </S.UserPhoto>
            <S.UserInfo>
              <h3>
                {getGreeting()}, {barber?.name}
              </h3>
              <span>{barber?.email}</span>
            </S.UserInfo>
            <S.StatusIndicator>
              <div className="dot"></div>
              <span>Online</span>
            </S.StatusIndicator>
          </S.UserSection>
        </S.RightSection>
      </S.TopNavContainer>
    </S.TopNavWrapper>
  );
};
