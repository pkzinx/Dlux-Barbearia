import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const LayoutWrapper = styled.div`
  ${({ theme }) => css`
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    display: flex;
    overflow-x: hidden;
  `}
`;

export const MainContent = styled.main`
  ${({ theme }) => css`
    flex: 1;
    margin-left: 28rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;

    ${media.lessThan('large')`
      margin-left: 0;
    `}
  `}
`;

export const ContentCard = styled.div`
  ${({ theme }) => css`
    background: rgba(0, 0, 0, 0.7);
    border: 0.3rem solid ${theme.colors.white};
    backdrop-filter: blur(1rem);
    border-radius: 2rem;
    padding: 3rem;
    color: ${theme.colors.white};
    flex: 1;
    margin: 2rem;
    margin-top: 0;
    overflow-x: hidden;

    ${media.lessThan('medium')`
      padding: 2rem;
      border-radius: 1.5rem;
      margin: 1rem;
      margin-top: 0;
    `}
  `}
`;

export const PageHeader = styled.div`
  ${({ theme }) => css`
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);
  `}
`;

export const PageTitle = styled.h1`
  ${({ theme }) => css`
    font-family: ${theme.font.family.tertiary};
    font-size: ${theme.font.sizes.xxlarge};
    font-weight: ${theme.font.bold};
    margin: 0 0 0.5rem 0;
    color: ${theme.colors.white};
  `}
`;

export const PageSubtitle = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    color: ${theme.colors.textName};
    margin: 0;
  `}
`;
