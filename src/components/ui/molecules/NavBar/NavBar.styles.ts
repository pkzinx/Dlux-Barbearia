import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const NavWrapper = styled.nav`
  ${({ theme }) => css`
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(1rem);
    border-bottom: 0.2rem solid ${theme.colors.primary};
    padding: 1.5rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  `}
`;

export const NavContainer = styled.div`
  ${({ theme }) => css`
    max-width: 120rem;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${media.lessThan('medium')`
      padding: 0 1rem;
      flex-direction: column;
      gap: 1.5rem;
    `}
  `}
`;

export const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  ${media.lessThan('medium')`
    order: 1;
  `}
`;

export const LogoWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 4rem;
      height: 4rem;
      object-fit: contain;
    }
  `}
`;

export const BrandText = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    h1 {
      font-family: ${theme.font.family.tertiary};
      font-size: ${theme.font.sizes.large};
      font-weight: ${theme.font.bold};
      color: ${theme.colors.white};
      margin: 0;
      line-height: 1;
    }

    span {
      font-size: ${theme.font.sizes.xsmall};
      color: ${theme.colors.textName};
      margin-top: 0.2rem;
    }
  `}
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  ${media.lessThan('medium')`
    order: 2;
    gap: 1.5rem;
  `}
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserPhoto = styled.div`
  ${({ theme }) => css`
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 50%;
    overflow: hidden;
    border: 0.2rem solid ${theme.colors.primary};
    box-shadow: 0 0 0 0.2rem rgba(26, 255, 234, 0.3);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `}
`;

export const UserDetails = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    h3 {
      font-size: ${theme.font.sizes.medium};
      font-weight: ${theme.font.bold};
      color: ${theme.colors.white};
      margin: 0;
      line-height: 1.2;
    }

    span {
      font-size: ${theme.font.sizes.xsmall};
      color: ${theme.colors.textName};
      margin-top: 0.2rem;
    }
  `}
`;

export const LogoutButton = styled.button`
  ${({ theme }) => css`
    padding: 0.8rem 1.6rem;
    border-radius: 0.8rem;
    background: transparent;
    color: ${theme.colors.white};
    border: 1px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.medium};

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  `}
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NavButton = styled.button`
  ${({ theme }) => css`
    padding: 0.8rem 1.2rem;
    border-radius: 0.6rem;
    background: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.white};
    border: 1px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: ${theme.font.sizes.xsmall};
    font-weight: ${theme.font.medium};

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: ${theme.colors.primary};
    }

    &.active {
      background: ${theme.colors.primary};
      color: ${theme.colors.black};
      border-color: ${theme.colors.primary};
    }
  `}
`;
