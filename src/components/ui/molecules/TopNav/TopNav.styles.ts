import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const TopNavWrapper = styled.header`
  ${({ theme }) => css`
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(1rem);
    border-bottom: 0.2rem solid ${theme.colors.primary};
    padding: 1.5rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
  `}
`;

export const TopNavContainer = styled.div`
  ${({ theme }) => css`
    max-width: 120rem;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${media.lessThan('medium')`
      padding: 0 1rem;
    `}
  `}
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const LogoWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 6.4rem;
      height: 6.4rem;
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
      font-size: 3.2rem;
      font-weight: ${theme.font.bold};
      color: ${theme.colors.white};
      margin: 0;
      line-height: 1;
    }

    span {
      font-size: ${theme.font.sizes.medium};
      color: ${theme.colors.textName};
      margin-top: 0.2rem;
    }
  `}
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  ${media.lessThan('medium')`
    gap: 1rem;
  `}
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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

export const StatusIndicator = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(26, 255, 234, 0.1);
    border: 1px solid ${theme.colors.primary};
    border-radius: 2rem;

    .dot {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      background: ${theme.colors.primary};
      animation: pulse 2s infinite;
    }

    span {
      font-size: ${theme.font.sizes.xsmall};
      color: ${theme.colors.primary};
      font-weight: ${theme.font.medium};
    }

    @keyframes pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
  `}
`;
