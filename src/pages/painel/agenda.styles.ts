import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const AgendaContent = styled.div`
  display: grid;
  gap: 2rem;
`;

export const DateSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    color: ${theme.colors.textName};
    font-weight: ${theme.font.bold};
  `}
`;

export const DateInput = styled.input`
  ${({ theme }) => css`
    padding: 1rem 1.2rem;
    border-radius: 0.8rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.medium};
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(26, 255, 234, 0.2);
    }
  `}
`;

export const AppointmentsList = styled.div`
  display: grid;
  gap: 1.5rem;
`;

export const AppointmentCard = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    gap: 2rem;
    align-items: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-2px);
    }

    ${media.lessThan('medium')`
      grid-template-columns: 1fr;
      gap: 1.5rem;
      text-align: center;
    `}
  `}
`;

export const AppointmentTime = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.large};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.primary};
    min-width: 12rem;
  `}
`;

export const AppointmentInfo = styled.div`
  display: grid;
  gap: 0.5rem;
`;

export const ClientName = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};
    margin: 0;
    color: ${theme.colors.white};
  `}
`;

export const ServiceName = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.textName};
    margin: 0;
  `}
`;

export const ClientPhone = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    color: ${theme.colors.textName};
    margin: 0;
  `}
`;

export const AppointmentNotes = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    color: ${theme.colors.textName};
    margin: 0;
    font-style: italic;
  `}
`;

export const AppointmentStatus = styled.div<{ status: string }>`
  ${({ theme, status }) => css`
    padding: 0.6rem 1.2rem;
    border-radius: 0.8rem;
    font-size: ${theme.font.sizes.xsmall};
    font-weight: ${theme.font.bold};
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid ${getStatusColor(status)};
    color: ${getStatusColor(status)};
    min-width: 10rem;
  `}
`;

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return '#1affea';
    case 'pending':
      return '#ffd166';
    case 'done':
      return '#4ade80';
    case 'canceled':
      return '#ff6b6b';
    default:
      return '#ffffff';
  }
};

export const AppointmentActions = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;

  ${media.lessThan('medium')`
    justify-content: center;
  `}
`;

export const ConfirmButton = styled.button`
  ${({ theme }) => css`
    padding: 0.8rem 1.2rem;
    border-radius: 0.6rem;
    border: 0;
    background: ${theme.colors.primary};
    color: ${theme.colors.black};
    font-weight: ${theme.font.bold};
    font-size: ${theme.font.sizes.xsmall};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      filter: brightness(1.1);
      transform: translateY(-1px);
    }
  `}
`;

export const CancelButton = styled.button`
  ${({ theme }) => css`
    padding: 0.8rem 1.2rem;
    border-radius: 0.6rem;
    border: 1px solid #ff6b6b;
    background: transparent;
    color: #ff6b6b;
    font-weight: ${theme.font.bold};
    font-size: ${theme.font.sizes.xsmall};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 107, 107, 0.1);
    }
  `}
`;

export const DoneButton = styled.button`
  ${({ theme }) => css`
    padding: 0.8rem 1.2rem;
    border-radius: 0.6rem;
    border: 0;
    background: #4ade80;
    color: ${theme.colors.black};
    font-weight: ${theme.font.bold};
    font-size: ${theme.font.sizes.xsmall};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      filter: brightness(1.1);
      transform: translateY(-1px);
    }
  `}
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

export const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

export const EmptyText = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    color: ${theme.colors.textName};
    margin: 0;
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
