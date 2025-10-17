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
    margin-top: 0.8rem;
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