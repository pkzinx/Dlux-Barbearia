import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import { Container } from '~atoms/Container/Container';

export const Wrapper = styled.section`
  padding: 4rem 0;
  
  ${media.greaterThan('medium')`
    padding: 6rem 0;
  `}
`;

export const ContainerContributors = styled(Container)`
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

export const BoxContributors = styled.div`
  max-width: 12rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  ${media.greaterThan('small')`
    max-width: 18rem;
    height: 28rem;    
  `}

  ${media.greaterThan('medium')`
    max-width: 22rem;
    height: 32rem;
  `}
`;

export const Image = styled.img`
  ${({ theme }) => css`
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    border: 3px solid ${theme.colors.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

    ${media.greaterThan('small')`
      width: 14rem;
      height: 14rem;
    `}

    ${media.greaterThan('medium')`
      width: 16rem;
      height: 16rem;
    `}
  `}
`;

export const Name = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-family: ${theme.font.family.tertiary};
    font-weight: ${theme.font.medium};
    font-size: ${theme.font.sizes.medium};
    line-height: ${theme.spacings.small};
    margin: 2rem 0 1rem;

    ${media.greaterThan('small')`
      font-size: ${theme.font.sizes.big};
      line-height: ${theme.spacings.medium};
      margin: 2.5rem 0 1.2rem;
    `}
  `}
`;

export const Occupation = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.textName};
    font-family: ${theme.font.family.tertiary};
    font-weight: ${theme.font.light};
    font-size: ${theme.font.sizes.xsmall};
    line-height: ${theme.spacings.xsmall};
    font-style: italic;

    ${media.greaterThan('small')`
      font-size: ${theme.font.sizes.medium};
    `}
  `}
`;
