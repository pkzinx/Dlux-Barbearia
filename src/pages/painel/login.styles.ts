import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginCard = styled.div`
  ${({ theme }) => css`
    width: 100%;
    max-width: 48rem;
    padding: 4rem 3rem;
    background: rgba(0, 0, 0, 0.7);
    border: 0.3rem solid ${theme.colors.white};
    backdrop-filter: blur(1rem);
    border-radius: 2rem;
    text-align: center;
    color: ${theme.colors.white};

    ${media.lessThan('medium')`
      padding: 3rem 2rem;
      margin: 2rem;
    `}
  `}
`;

export const LogoWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    font-family: ${theme.font.family.tertiary};
    font-size: ${theme.font.sizes.xxlarge};
    font-weight: ${theme.font.bold};
    margin-bottom: 0.8rem;
    color: ${theme.colors.white};
  `}
`;

export const Subtitle = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    opacity: 0.8;
    margin-bottom: 3rem;
  `}
`;

export const Form = styled.form`
  display: grid;
  gap: 2rem;
`;

export const Field = styled.div`
  display: grid;
  gap: 0.8rem;
  text-align: left;
`;

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.textName};
    font-weight: ${theme.font.medium};
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    padding: 1.2rem 1.6rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.medium};
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(26, 255, 234, 0.2);
    }
  `}
`;

export const SubmitButton = styled.button`
  ${({ theme }) => css`
    padding: 1.4rem 2.4rem;
    border-radius: 1rem;
    border: 0;
    background: linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
    color: ${theme.colors.black};
    font-weight: ${theme.font.bold};
    font-size: ${theme.font.sizes.medium};
    text-transform: uppercase;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: transform 0.2s ease, filter 0.2s ease;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      filter: brightness(1.08);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      filter: brightness(0.96);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `}
`;

export const ErrorMessage = styled.div`
  ${({ theme }) => css`
    padding: 1rem 1.2rem;
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid #ff6b6b;
    border-radius: 0.8rem;
    color: #ff6b6b;
    font-weight: ${theme.font.medium};
    text-align: center;
  `}
`;
