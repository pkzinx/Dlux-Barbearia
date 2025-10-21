import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const ProfileForm = styled.div`
  display: grid;
  gap: 3rem;
`;

export const PhotoSection = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: center;

  ${media.lessThan('medium')`
    grid-template-columns: 1fr;
    text-align: center;
  `}
`;

export const PhotoWrapper = styled.div`
  ${({ theme }) => css`
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    overflow: hidden;
    border: 0.3rem solid ${theme.colors.primary};
    box-shadow: 0 0 0 0.3rem rgba(26, 255, 234, 0.3);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `}
`;

export const PhotoInput = styled.div`
  display: grid;
  gap: 1rem;
`;

export const FormSection = styled.div`
  display: grid;
  gap: 2rem;
`;

export const Field = styled.div`
  display: grid;
  gap: 0.8rem;
`;

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    color: ${theme.colors.textName};
    font-weight: ${theme.font.bold};
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

export const TextArea = styled.textarea`
  ${({ theme }) => css`
    padding: 1.2rem 1.6rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.medium};
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    resize: vertical;
    min-height: 8rem;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(26, 255, 234, 0.2);
    }
  `}
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 2rem;
  border-top: 0.1rem solid rgba(255, 255, 255, 0.1);
`;

export const SaveButton = styled.button`
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

export const LoadingText = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.large};
    color: ${theme.colors.textName};
    text-align: center;
    margin: 4rem 0;
  `}
`;
