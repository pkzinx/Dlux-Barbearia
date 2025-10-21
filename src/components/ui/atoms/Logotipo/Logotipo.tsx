import * as S from './Logotipo.styles';

export type LogotipoProps = {
  color?: 'white' | 'black';
  size?: 'small' | 'normal' | 'large';
  hideOnMobile?: boolean;
};

export const Logotipo = ({ color = 'white', size = 'normal', hideOnMobile = false }: LogotipoProps) => (
  <S.Wrapper color={color} size={size} hideOnMobile={hideOnMobile}>
    <img src="/assets/img/LOGOTIPO1.png" alt="Dlux Barbearia" role="img" aria-label="Dlux Barbearia" />
  </S.Wrapper>
);
