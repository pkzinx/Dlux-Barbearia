import { useState } from 'react';
import * as S from './Sidebar.styles';

type Barber = {
  id: number;
  name: string;
  email: string;
  photo_url?: string;
};

type SidebarProps = {
  barber: Barber | null;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
};

const menuItems = [
  { id: 'agenda', label: 'Agenda', icon: '📅' },
  { id: 'agendamentos', label: 'Agendamentos', icon: '📋' },
  { id: 'perfil', label: 'Perfil', icon: '👤' },
  { id: 'financeiro', label: 'Financeiro', icon: '💰' },
  { id: 'administracao', label: 'Administração', icon: '⚙️' }
];

export const Sidebar = ({ barber, currentPage, onNavigate, onLogout }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <>
      <S.MobileToggle onClick={() => setIsOpen(!isOpen)}>☰</S.MobileToggle>

      <S.Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <S.SidebarWrapper className={isOpen ? 'open' : ''}>
        <S.UserSection>
          <S.UserPhoto>
            <img src={barber?.photo_url || '/assets/img/desc.jpg'} alt={barber?.name || 'Barbeiro'} />
          </S.UserPhoto>
          <S.UserInfo>
            <h3>{barber?.name}</h3>
            <span>{barber?.email}</span>
          </S.UserInfo>
        </S.UserSection>

        <S.NavMenu>
          {menuItems.map((item) => (
            <S.NavItem key={item.id} active={currentPage === item.id} onClick={() => handleNavigate(item.id)}>
              <S.NavIcon>{item.icon}</S.NavIcon>
              <S.NavText>{item.label}</S.NavText>
            </S.NavItem>
          ))}
        </S.NavMenu>

        <S.SidebarFooter>
          <S.LogoutButton onClick={onLogout}>
            <span>🚪</span>
            <span>Sair</span>
          </S.LogoutButton>
        </S.SidebarFooter>
      </S.SidebarWrapper>
    </>
  );
};
