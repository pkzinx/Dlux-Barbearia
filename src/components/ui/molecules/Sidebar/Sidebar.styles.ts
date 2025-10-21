import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const SidebarWrapper = styled.aside`
  ${({ theme }) => css`
    width: 28rem;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(1rem);
    border-right: 0.2rem solid ${theme.colors.primary};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;

    ${media.lessThan('large')`
      transform: translateX(-100%);
      &.open {
        transform: translateX(0);
      }
    `}
  `}
`;

export const UserSection = styled.div`
  ${({ theme }) => css`
    padding: 2rem;
    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
  `}
`;

export const UserPhoto = styled.div`
  ${({ theme }) => css`
    width: 4rem;
    height: 4rem;
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

export const UserInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    h3 {
      font-size: ${theme.font.sizes.small};
      font-weight: ${theme.font.bold};
      color: ${theme.colors.white};
      margin: 0;
      line-height: 1.2;
      text-align: center;
    }

    span {
      font-size: ${theme.font.sizes.xsmall};
      color: ${theme.colors.textName};
      margin-top: 0.2rem;
      text-align: center;
    }
  `}
`;

export const NavMenu = styled.nav`
  flex: 1;
  padding: 1rem 0;
`;

export const NavItem = styled.button<{ active?: boolean }>`
  ${({ theme, active }) => css`
    width: 100%;
    padding: 1.2rem 2rem;
    border: 0;
    background: ${active ? 'rgba(26, 255, 234, 0.1)' : 'transparent'};
    color: ${active ? theme.colors.primary : theme.colors.white};
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: ${theme.font.sizes.medium};
    font-weight: ${active ? theme.font.bold : theme.font.medium};
    border-left: ${active ? `0.3rem solid ${theme.colors.primary}` : '0.3rem solid transparent'};

    &:hover {
      background: rgba(26, 255, 234, 0.05);
      color: ${theme.colors.primary};
    }

    &:active {
      transform: translateX(0.2rem);
    }
  `}
`;

export const NavIcon = styled.span`
  font-size: 1.8rem;
  width: 2.4rem;
  text-align: center;
`;

export const NavText = styled.span`
  flex: 1;
`;

export const SidebarFooter = styled.div`
  ${({ theme }) => css`
    padding: 2rem;
    border-top: 0.1rem solid rgba(255, 255, 255, 0.1);
  `}
`;

export const LogoutButton = styled.button`
  ${({ theme }) => css`
    width: 100%;
    padding: 1rem 1.5rem;
    border-radius: 0.8rem;
    background: transparent;
    color: ${theme.colors.white};
    border: 1px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.medium};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    &:hover {
      background: rgba(255, 107, 107, 0.1);
      border-color: #ff6b6b;
      color: #ff6b6b;
    }

    &:active {
      transform: translateY(0.1rem);
    }
  `}
`;

export const MobileToggle = styled.button`
  ${({ theme }) => css`
    position: fixed;
    top: 2rem;
    left: 2rem;
    z-index: 300;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.8);
    border: 0.2rem solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    transition: all 0.2s ease;

    ${media.lessThan('large')`
      display: flex;
    `}

    &:hover {
      background: ${theme.colors.primary};
      color: ${theme.colors.black};
    }
  `}
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 150;
    display: none;
    opacity: ${isOpen ? 1 : 0};
    transition: opacity 0.3s ease;

    ${media.lessThan('large')`
      display: ${isOpen ? 'block' : 'none'};
    `}
  `}
`;
