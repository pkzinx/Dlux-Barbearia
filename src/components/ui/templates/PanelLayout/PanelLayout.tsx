import { ReactNode } from 'react';
import { Sidebar } from '../../molecules/Sidebar/Sidebar';
import { TopNav } from '../../molecules/TopNav/TopNav';
import * as S from './PanelLayout.styles';

type Barber = {
  id: number;
  name: string;
  email: string;
  photo_url?: string;
};

type PanelLayoutProps = {
  children: ReactNode;
  barber: Barber | null;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  title: string;
  subtitle?: string;
};

export const PanelLayout = ({
  children,
  barber,
  currentPage,
  onNavigate,
  onLogout,
  title,
  subtitle
}: PanelLayoutProps) => {
  return (
    <S.LayoutWrapper>
      <Sidebar barber={barber} currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />

      <S.MainContent>
        <TopNav barber={barber} currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />

        <S.ContentCard>
          <S.PageHeader>
            <S.PageTitle>{title}</S.PageTitle>
            {subtitle && <S.PageSubtitle>{subtitle}</S.PageSubtitle>}
          </S.PageHeader>

          {children}
        </S.ContentCard>
      </S.MainContent>
    </S.LayoutWrapper>
  );
};
