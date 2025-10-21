import { useState } from 'react';
import * as S from './Sidebar.styles';

type Barber = {
  id: number;
  name: string;
  email: string;
  photo_url?: string;
  account_type: 'admin' | 'lux';
};

type SidebarProps = {
  barber: Barber | null;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
};

const menuItems = [
  { id: 'agenda', label: 'Agenda', icon: '📅', adminOnly: false },
  { id: 'perfil', label: 'Perfil', icon: '👤', adminOnly: false },
  { id: 'financeiro', label: 'Financeiro', icon: '💰', adminOnly: true },
  { id: 'administracao', label: 'Administração', icon: '⚙️', adminOnly: true }
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
          {menuItems
            .filter(item => barber?.account_type === 'admin' || !item.adminOnly)
            .map((item) => (
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
