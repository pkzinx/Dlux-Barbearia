import React from 'react';
import * as S from '../ModalForm.styles';
import * as C from './ConfirmationModal.styles';

type Barber = { id: number; name: string; photo_url?: string };
type Service = { id: number; name: string; duration_minutes: number };

type AppointmentData = {
  name: string;
  phone: string;
  barber: Barber;
  service: Service;
  date: string;
  time: string;
  endTime: string;
};

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  appointmentData: AppointmentData | null;
};

export const ConfirmationModal = ({ isOpen, onClose, appointmentData }: ConfirmationModalProps) => {
  if (!appointmentData) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    const time = new Date(timeStr);
    return time.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateWhatsAppMessage = () => {
    const dateFormatted = formatDate(appointmentData.date);
    const timeFormatted = formatTime(appointmentData.time);
    const endTimeFormatted = formatTime(appointmentData.endTime);

    return `Olá! Gostaria de confirmar meu agendamento na Dlux Barbearia:

📅 *Data:* ${dateFormatted}
🕐 *Horário:* ${timeFormatted} às ${endTimeFormatted}
💇‍♂️ *Barbeiro:* ${appointmentData.barber.name}
✂️ *Serviço:* ${appointmentData.service.name}
⏱️ *Duração:* ${appointmentData.service.duration_minutes} minutos

👤 *Cliente:* ${appointmentData.name}
📱 *Telefone:* ${appointmentData.phone}

Por favor, confirme se está tudo correto! Obrigado! 😊`;
  };

  const handleWhatsAppClick = () => {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <S.Background aria-hidden={isOpen} aria-label="Overlay Modal" isOpen={isOpen} onClick={onClose} />
      <S.Modal
        isOpen={isOpen}
        aria-label="Modal de Confirmação"
        role="dialog"
        aria-modal="true"
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
      >
        <C.ConfirmationWrapper>
          <C.CloseButton type="button" aria-label="Fechar" onClick={onClose}>
            ✕
          </C.CloseButton>

          <C.SuccessIcon>✓</C.SuccessIcon>

          <C.ConfirmationTitle>Agendamento Criado!</C.ConfirmationTitle>
          <C.ConfirmationSubtitle>
            Envie uma mensagem para o WhatsApp para confirmar seu agendamento
          </C.ConfirmationSubtitle>

          <C.AppointmentDetails>
            <C.DetailRow>
              <C.DetailLabel>Cliente:</C.DetailLabel>
              <C.DetailValue>{appointmentData.name}</C.DetailValue>
            </C.DetailRow>

            <C.DetailRow>
              <C.DetailLabel>Telefone:</C.DetailLabel>
              <C.DetailValue>{appointmentData.phone}</C.DetailValue>
            </C.DetailRow>

            <C.DetailRow>
              <C.DetailLabel>Barbeiro:</C.DetailLabel>
              <C.DetailValue>{appointmentData.barber.name}</C.DetailValue>
            </C.DetailRow>

            <C.DetailRow>
              <C.DetailLabel>Serviço:</C.DetailLabel>
              <C.DetailValue>{appointmentData.service.name}</C.DetailValue>
            </C.DetailRow>

            <C.DetailRow>
              <C.DetailLabel>Data:</C.DetailLabel>
              <C.DetailValue>{formatDate(appointmentData.date)}</C.DetailValue>
            </C.DetailRow>

            <C.DetailRow>
              <C.DetailLabel>Horário:</C.DetailLabel>
              <C.DetailValue>
                {formatTime(appointmentData.time)} - {formatTime(appointmentData.endTime)}
              </C.DetailValue>
            </C.DetailRow>
          </C.AppointmentDetails>

          <C.MessagePreview>
            <C.MessageTitle>📱 Mensagem que será enviada:</C.MessageTitle>
            <C.MessageText>{generateWhatsAppMessage()}</C.MessageText>
          </C.MessagePreview>

          <C.Actions>
            <C.GhostButton type="button" onClick={onClose}>
              Fechar
            </C.GhostButton>
            <C.WhatsAppButton type="button" onClick={handleWhatsAppClick}>
              <C.WhatsAppIcon>📱</C.WhatsAppIcon>
              Enviar para WhatsApp
            </C.WhatsAppButton>
          </C.Actions>
        </C.ConfirmationWrapper>
      </S.Modal>
    </>
  );
};
