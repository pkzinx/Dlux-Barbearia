import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.section`
  ${({ theme }) => css`
    width: fit-content;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: ${theme.spacings.large};
    padding: ${theme.spacings.large} calc(${theme.spacings.large} / 2);
    background: rgba(0, 0, 0, 0.3);
    border: 0.3rem solid ${theme.colors.white};
    backdrop-filter: blur(1rem);
    border-radius: 1rem;

    ${media.greaterThan('medium')`
      gap: ${theme.spacings.huge};
      padding: ${theme.spacings.huge} calc(${theme.spacings.large} / 2);
      height: auto;
    `}
  `}
`;

export const ContentInfos = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: calc(${theme.spacings.large} / 2);

    ${media.greaterThan('medium')`
      gap: 3rem;
    `}
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `}
`;

export const CtaArea = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.medium};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    button {
      display: inline-block;
      padding: 1.2rem 2.4rem;
      border-radius: 0.8rem;
      background: linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
      color: ${theme.colors.black};
      font-weight: ${theme.font.bold};
      font-size: ${theme.font.sizes.small};
      text-transform: uppercase;
      letter-spacing: 0.04em;
      text-align: center;
      width: 100%;
      max-width: 28rem;
      transition: transform 0.2s ease, filter 0.2s ease;
      will-change: transform;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
      cursor: pointer;
      border: 0;
    }

    button:hover {
      transform: translateY(-1px);
      filter: brightness(1.08);
    }
    button:active {
      transform: translateY(0);
      filter: brightness(0.96);
    }
  `}
`;

export const InfoPrimary = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    font-size: ${theme.font.sizes.small};
  `}
`;

export const Title = styled.h5`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    font-weight: 400;
  `}
`;

export const Price = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
  `}
`;

export const Description = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    margin-top: 0.5rem;
  `}
`;

export const Duration = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.8rem auto 0;
    padding: 0.5rem 0.8rem;
    background: rgba(26, 255, 234, 0.1);
    border: 1px solid ${theme.colors.primary};
    border-radius: 0.5rem;
    width: fit-content;
  `}
`;

export const DurationIcon = styled.span`
  font-size: 1.2rem;
`;

export const DurationText = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: ${theme.font.sizes.xsmall};
    font-weight: ${theme.font.medium};
  `}
`;
