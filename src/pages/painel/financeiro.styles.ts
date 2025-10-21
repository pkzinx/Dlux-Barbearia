import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const FinancialDashboard = styled.div`
  display: grid;
  gap: 3rem;
`;

export const PeriodSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
`;

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    color: ${theme.colors.textName};
    font-weight: ${theme.font.bold};
  `}
`;

export const Select = styled.select`
  ${({ theme }) => css`
    padding: 0.8rem 1.2rem;
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

    option {
      background: ${theme.colors.black};
      color: ${theme.colors.white};
    }
  `}
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2rem;
`;

export const StatCard = styled.div`
  ${({ theme }) => css`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
    padding: 2rem;
    text-align: center;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-2px);
    }
  `}
`;

export const StatIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const StatValue = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxlarge};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.primary};
    margin-bottom: 0.5rem;
  `}
`;

export const StatLabel = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    color: ${theme.colors.textName};
    font-weight: ${theme.font.medium};
  `}
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  ${media.lessThan('large')`
    grid-template-columns: 1fr;
  `}
`;

export const ChartCard = styled.div`
  ${({ theme }) => css`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
    padding: 2rem;
  `}
`;

export const ChartTitle = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.large};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.white};
    margin: 0 0 2rem 0;
    text-align: center;
  `}
`;

export const BarChart = styled.div`
  display: grid;
  gap: 1rem;
`;

export const BarItem = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr auto;
  gap: 1rem;
  align-items: center;
`;

export const BarLabel = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.textName};
    font-weight: ${theme.font.bold};
    text-align: center;
  `}
`;

export const BarContainer = styled.div`
  ${({ theme }) => css`
    height: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
  `}
`;

export const Bar = styled.div<{ width: string }>`
  ${({ theme, width }) => css`
    height: 100%;
    width: ${width};
    background: linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
    border-radius: 1rem;
    transition: width 0.3s ease;
  `}
`;

export const BarValue = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.primary};
    font-weight: ${theme.font.bold};
    text-align: right;
  `}
`;

export const ServiceList = styled.div`
  display: grid;
  gap: 1rem;
`;

export const ServiceItem = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.8rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  `}
`;

export const ServiceName = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    color: ${theme.colors.white};
    font-weight: ${theme.font.bold};
  `}
`;

export const ServiceStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
`;

export const ServiceCount = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    color: ${theme.colors.textName};
  `}
`;

export const ServiceRevenue = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.primary};
    font-weight: ${theme.font.bold};
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
