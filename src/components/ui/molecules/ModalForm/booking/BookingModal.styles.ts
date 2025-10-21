import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    max-width: 60rem;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.small};
    color: ${theme.colors.white};
    position: relative;
  `}
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    margin: 0 0 ${theme.spacings.xsmall};
    text-align: center;
    font-family: ${theme.font.family.tertiary};
    font-weight: ${theme.font.bold};
    font-size: ${theme.font.sizes.xmedium};
  `}
`;

export const Subtle = styled.p`
  ${({ theme }) => css`
    margin: 0 auto ${theme.spacings.xsmall};
    opacity: 0.85;
    text-align: center;
  `}
`;

export const Loading = styled.p`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.small};
    opacity: 0.8;
    text-align: center;
  `}
`;

export const Form = styled.form`
  ${({ theme }) => css`
    width: 100%;
    display: grid;
    gap: ${theme.spacings.small};
  `}
`;

export const Field = styled.div`
  display: grid;
  gap: 0.5rem;
`;

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    color: ${theme.colors.textName};
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    padding: 1rem 1.2rem;
    border-radius: 0.8rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: ${theme.colors.white};
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    &:focus {
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(26, 255, 234, 0.2);
    }
  `}
`;

export const Select = styled.select`
  ${({ theme }) => css`
    padding: 1rem 1.2rem;
    border-radius: 0.8rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: ${theme.colors.white};
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    &:focus {
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(26, 255, 234, 0.2);
    }
  `}
`;

export const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
`;

export const PrimaryButton = styled.button`
  ${({ theme }) => css`
    padding: 1.2rem 2.4rem;
    border-radius: 0.8rem;
    border: 0;
    background: linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
    color: ${theme.colors.black};
    font-weight: ${theme.font.bold};
    text-transform: uppercase;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: transform 0.2s ease, filter 0.2s ease;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
    &:hover {
      transform: translateY(-1px);
      filter: brightness(1.08);
    }
    &:active {
      transform: translateY(0);
      filter: brightness(0.96);
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `}
`;

export const GhostButton = styled.button`
  ${({ theme }) => css`
    padding: 1rem 1.6rem;
    border-radius: 0.8rem;
    background: transparent;
    color: ${theme.colors.white};
    border: 1px solid rgba(255, 255, 255, 0.25);
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
    &:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.4);
    }
  `}
`;

export const AlertError = styled.div`
  ${({ theme }) => css`
    color: #ff6b6b;
    font-weight: ${theme.font.bold};
  `}
`;

export const AlertSuccess = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-weight: ${theme.font.bold};
  `}
`;

export const CloseButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    width: 3.2rem;
    height: 3.2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.2);
    color: ${theme.colors.white};
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
    &:hover {
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  `}
`;

export const BarberGrid = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacings.small};
    margin-top: ${theme.spacings.xsmall};
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    padding-bottom: 0.4rem;
    padding-top: 0.4rem;
  `}
`;

type BarberCardProps = { selected?: boolean };

export const BarberCard = styled.button<BarberCardProps>`
  ${({ theme, selected }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    flex: 1;
    min-width: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    color: ${theme.colors.white};
    transition: transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease;
    ${selected ? 'transform: translateY(-2px); filter: none;' : 'filter: grayscale(0.2);'}
    &:hover {
      filter: none;
    }
    &:focus {
      outline: none;
    }
    position: relative;
  `}
`;

export const BarberPhoto = styled.img<BarberCardProps>`
  ${({ theme, selected }) => css`
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 50%;
    object-fit: cover;
    border: ${selected ? `3px solid ${theme.colors.primary}` : `2px solid ${theme.colors.primary}`};
    box-shadow: ${selected
      ? `0 0 0 4px rgba(26, 255, 234, 0.3), 0 6px 16px rgba(0, 0, 0, 0.4)`
      : `0 4px 8px rgba(0, 0, 0, 0.25)`};
    transition: all 0.2s ease;
    transform: ${selected ? 'scale(1.05)' : 'scale(1)'};
  `}
`;

export const BarberName = styled.span<BarberCardProps>`
  ${({ theme, selected }) => css`
    font-size: ${theme.font.sizes.xsmall};
    opacity: 0.9;
    text-align: center;
    transition: all 0.2s ease;
    font-weight: ${selected ? 'bold' : 'normal'};
    color: ${selected ? theme.colors.primary : theme.colors.white};
  `}
`;

export const DateGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacings.small};
    margin-top: ${theme.spacings.xsmall};
  `}
`;

type DateButtonProps = { selected?: boolean };

export const DateButton = styled.button<DateButtonProps>`
  ${({ theme, selected }) => css`
    padding: 1.2rem 1rem;
    border-radius: 1rem;
    background: ${selected
      ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
      : 'rgba(255, 255, 255, 0.1)'};
    color: ${selected ? theme.colors.black : theme.colors.white};
    border: ${selected ? `3px solid ${theme.colors.primary}` : '2px solid rgba(255, 255, 255, 0.2)'};
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    font-weight: ${selected ? theme.font.bold : theme.font.medium};
    box-shadow: ${selected ? '0 8px 20px rgba(26, 255, 234, 0.4)' : '0 4px 10px rgba(0, 0, 0, 0.2)'};

    &:hover {
      background: ${selected
        ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
        : 'rgba(255, 255, 255, 0.15)'};
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(26, 255, 234, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  `}
`;

export const DateDay = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};
    line-height: 1.2;
  `}
`;

export const DateMonth = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `}
`;

export const TimeGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    gap: ${theme.spacings.xsmall};
    margin-top: ${theme.spacings.xsmall};
    max-height: 20rem;
    overflow-y: auto;
    padding: 0.5rem;
  `}
`;

type TimeButtonProps = { selected?: boolean };

export const TimeButton = styled.button<TimeButtonProps>`
  ${({ theme, selected }) => css`
    padding: 1rem 0.8rem;
    border-radius: 0.8rem;
    background: ${selected
      ? `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
      : 'rgba(255, 255, 255, 0.1)'};
    color: ${selected ? theme.colors.black : theme.colors.white};
    border: ${selected ? `2px solid ${theme.colors.primary}` : '1px solid rgba(255, 255, 255, 0.2)'};
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    font-size: ${theme.font.sizes.xsmall};
    font-weight: ${selected ? theme.font.bold : theme.font.medium};

    &:hover {
      background: ${selected
        ? `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
        : 'rgba(255, 255, 255, 0.15)'};
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  `}
`;

export const TimeText = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.bold};
  `}
`;

export const TimeDuration = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    opacity: 0.8;
  `}
`;

export const LoadingTimes = styled.div`
  ${({ theme }) => css`
    padding: 2rem;
    text-align: center;
    color: ${theme.colors.textName};
    font-style: italic;
  `}
`;

export const NoTimesMessage = styled.div`
  ${({ theme }) => css`
    padding: 2rem;
    text-align: center;
    color: #ff6b6b;
    font-weight: ${theme.font.medium};
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.3);
    border-radius: 0.8rem;
  `}
`;

export const SelectTimeMessage = styled.div`
  ${({ theme }) => css`
    padding: 2rem;
    text-align: center;
    color: ${theme.colors.textName};
    font-style: italic;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.8rem;
  `}
`;
