import styled, { css } from 'styled-components';

export const ConfirmationWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

export const ConfirmationTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
  text-align: center;
`;

export const ConfirmationSubtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  text-align: center;
  margin: 0 0 24px 0;
`;

export const AppointmentDetails = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid #e5e7eb;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const DetailLabel = styled.span`
  font-weight: 600;
  color: #374151;
  font-size: 14px;
`;

export const DetailValue = styled.span`
  color: #1f2937;
  font-size: 14px;
  text-align: right;
`;

export const MessagePreview = styled.div`
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;

export const MessageTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0369a1;
  margin: 0 0 8px 0;
`;

export const MessageText = styled.p`
  font-size: 13px;
  color: #0c4a6e;
  margin: 0;
  line-height: 1.5;
  white-space: pre-line;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const GhostButton = styled.button`
  background: transparent;
  border: 2px solid #d1d5db;
  color: #6b7280;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
    color: #374151;
  }
`;

export const WhatsAppButton = styled.button`
  background: #25d366;
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #22c55e;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const WhatsAppIcon = styled.span`
  font-size: 16px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #6b7280;
  }
`;

export const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 24px;
  color: white;
`;
