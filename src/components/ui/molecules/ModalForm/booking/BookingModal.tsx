import { useEffect, useMemo, useState } from 'react';
import * as S from '../ModalForm.styles';
import * as B from './BookingModal.styles';
import { getNext3WorkingDays, getDisplayLabel } from '../../../../../utils/dateHelper';
import { ConfirmationModal } from './ConfirmationModal';

type Barber = { id: number; name: string; photo_url?: string };
type Service = { id: number; name: string; duration_minutes: number };
type AvailableTime = { time: string; datetime: string; end_time: string };
type DateOption = {
  date: Date;
  dateStr: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
  isToday: boolean;
  isTomorrow: boolean;
};

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string | null;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const BookingModal = ({ isOpen, onClose, serviceTitle }: BookingModalProps) => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [availableTimes, setAvailableTimes] = useState<AvailableTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>(null);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    barber_id: '',
    service_id: '',
    date: '',
    time: ''
  });

  // Gerar próximos 3 dias úteis
  const availableDates = useMemo(() => getNext3WorkingDays(), [isOpen]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setLoading(true);
        const [barbersRes, servicesRes] = await Promise.all([
          fetch(`${API_BASE}/api/barbers/`),
          fetch(`${API_BASE}/api/services/`)
        ]);
        const [barbersJson, servicesJson] = await Promise.all([barbersRes.json(), servicesRes.json()]);
        if (!ignore) {
          // Fallback: se não houver photo_url no backend, tenta mapear pelas fotos da seção de profissionais
          const fallbackPhotos: Record<string, string> = {
            Rikelv: '/assets/img/desc.jpg',
            Emerso: '/assets/img/desc.jpg',
            Kaue: '/assets/img/desc.jpg',
            Kevin: '/assets/img/desc.jpg',
            Alafi: '/assets/img/desc.jpg'
          };
          const withPhotos = barbersJson.map((b: any) => ({
            ...b,
            photo_url: b.photo_url || fallbackPhotos[b.name] || '/assets/img/testUser.png'
          }));
          const ensuredBarbers =
            withPhotos.length > 0
              ? withPhotos
              : [
                  { id: 1, name: 'Rikelv', photo_url: '/assets/img/desc.jpg' },
                  { id: 2, name: 'Emerso', photo_url: '/assets/img/desc.jpg' },
                  { id: 3, name: 'Kaue', photo_url: '/assets/img/desc.jpg' },
                  { id: 4, name: 'Kevin', photo_url: '/assets/img/desc.jpg' },
                  { id: 5, name: 'Alafi', photo_url: '/assets/img/desc.jpg' }
                ];
          setBarbers(ensuredBarbers);
          setServices(servicesJson);
          if (serviceTitle) {
            const found = servicesJson.find((s: Service) => s.name.toLowerCase() === serviceTitle.toLowerCase());
            if (found) setForm((f) => ({ ...f, service_id: String(found.id) }));
          }
        }
      } catch (e) {
        if (!ignore) {
          // fallback completo com 5 barbeiros
          setBarbers([
            { id: 1, name: 'Rikelv', photo_url: '/assets/img/desc.jpg' },
            { id: 2, name: 'Emerso', photo_url: '/assets/img/desc.jpg' },
            { id: 3, name: 'Kaue', photo_url: '/assets/img/desc.jpg' },
            { id: 4, name: 'Kevin', photo_url: '/assets/img/desc.jpg' },
            { id: 5, name: 'Alafi', photo_url: '/assets/img/desc.jpg' }
          ]);
          setError('Falha ao carregar dados.');
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    if (isOpen) {
      load();
    }
    return () => {
      ignore = true;
    };
  }, [isOpen, serviceTitle]);

  const selectedService = useMemo(
    () => services.find((s) => String(s.id) === form.service_id),
    [services, form.service_id]
  );

  // Função para carregar horários disponíveis
  const loadAvailableTimes = async (barberId: string, date: string, serviceId: string) => {
    if (!barberId || !date || !serviceId) {
      setAvailableTimes([]);
      return;
    }

    setLoadingTimes(true);
    try {
      const response = await fetch(
        `${API_BASE}/api/appointments/available_times/?barber_id=${barberId}&date=${date}&service_id=${serviceId}`
      );

      if (response.ok) {
        const data = await response.json();
        setAvailableTimes(data.available_times || []);
      } else {
        setAvailableTimes([]);
      }
    } catch (error) {
      console.error('Erro ao carregar horários:', error);
      setAvailableTimes([]);
    } finally {
      setLoadingTimes(false);
    }
  };

  // Carregar horários quando barbeiro, data ou serviço mudarem
  useEffect(() => {
    if (form.barber_id && form.date && form.service_id) {
      loadAvailableTimes(form.barber_id, form.date, form.service_id);
      setForm((prev) => ({ ...prev, time: '' })); // Limpar horário selecionado
    }
  }, [form.barber_id, form.date, form.service_id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    try {
      if (!form.name || !form.phone || !form.barber_id || !form.service_id || !form.date || !form.time) {
        setError('Preencha todos os campos.');
        return;
      }

      const selectedService = services.find((s) => String(s.id) === form.service_id);
      const startAtLocal = new Date(`${form.date}T${form.time}:00`);
      const durationMin = selectedService?.duration_minutes || 30;
      const endAtLocal = new Date(startAtLocal.getTime() + durationMin * 60000);

      const clientRes = await fetch(`${API_BASE}/api/clients/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone })
      });
      const client = await clientRes.json();

      const apptRes = await fetch(`${API_BASE}/api/appointments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          barber_id: Number(form.barber_id),
          service_id: Number(form.service_id),
          client_id: client.id,
          start_at: startAtLocal.toISOString(),
          end_at: endAtLocal.toISOString(),
          status: 'pending'
        })
      });

      if (apptRes.status === 409) {
        setError('Horário indisponível. Escolha outro.');
        return;
      }
      if (!apptRes.ok) {
        setError('Falha ao criar agendamento.');
        return;
      }

      // Preparar dados para o modal de confirmação
      const selectedBarber = barbers.find((b) => String(b.id) === form.barber_id);
      const selectedTime = availableTimes.find((t) => t.datetime === form.time);

      if (selectedBarber && selectedService && selectedTime) {
        setAppointmentData({
          name: form.name,
          phone: form.phone,
          barber: selectedBarber,
          service: selectedService,
          date: form.date,
          time: selectedTime.datetime,
          endTime: selectedTime.end_time
        });
        setShowConfirmation(true);
      } else {
        setSuccess('Agendamento criado com sucesso!');
      }
    } catch (err) {
      setError('Falha ao criar agendamento.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <S.Background aria-hidden={isOpen} aria-label="Overlay Modal" isOpen={isOpen} onClick={onClose} />
      <S.Modal
        isOpen={isOpen}
        aria-label="Modal"
        role="dialog"
        aria-modal="true"
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
      >
        <B.Wrapper>
          <B.CloseButton type="button" aria-label="Fechar" onClick={onClose}>
            ✕
          </B.CloseButton>
          <B.Title>Agendar</B.Title>
          {serviceTitle && (
            <B.Subtle>
              Serviço: <strong>{serviceTitle}</strong>
            </B.Subtle>
          )}
          {loading ? (
            <B.Loading>Carregando...</B.Loading>
          ) : (
            <B.Form onSubmit={handleSubmit}>
              {error && <B.AlertError>{error}</B.AlertError>}
              {success && <B.AlertSuccess>{success}</B.AlertSuccess>}

              <B.Field>
                <B.Label>Nome</B.Label>
                <B.Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Seu nome"
                />
              </B.Field>

              <B.Field>
                <B.Label>Telefone</B.Label>
                <B.Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(DDD) 99999-9999"
                />
              </B.Field>

              <B.Field>
                <B.Label>Escolha o barbeiro</B.Label>
                <B.BarberGrid>
                  {barbers.map((b) => {
                    const isSelected = String(b.id) === form.barber_id;
                    return (
                      <B.BarberCard
                        key={b.id}
                        type="button"
                        selected={isSelected}
                        aria-pressed={isSelected}
                        onClick={() => setForm({ ...form, barber_id: String(b.id) })}
                      >
                        <B.BarberPhoto src={b.photo_url || '/assets/img/desc.jpg'} alt={b.name} selected={isSelected} />
                        <B.BarberName selected={isSelected}>{b.name}</B.BarberName>
                      </B.BarberCard>
                    );
                  })}
                </B.BarberGrid>
              </B.Field>

              <B.Field>
                <B.Label>Serviço</B.Label>
                <B.Select value={form.service_id} onChange={(e) => setForm({ ...form, service_id: e.target.value })}>
                  <option value="">Selecione...</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </B.Select>
                {selectedService && <B.Subtle>Duração: {selectedService.duration_minutes} min</B.Subtle>}
              </B.Field>

              <B.Field>
                <B.Label>Escolha o dia</B.Label>
                <B.DateGrid>
                  {availableDates.map((dateOption: DateOption) => (
                    <B.DateButton
                      key={dateOption.dateStr}
                      type="button"
                      selected={form.date === dateOption.dateStr}
                      onClick={() => setForm({ ...form, date: dateOption.dateStr, time: '' })}
                    >
                      <B.DateDay>
                        {getDisplayLabel(
                          dateOption.isToday,
                          dateOption.isTomorrow,
                          dateOption.dayName,
                          dateOption.dayNumber
                        )}
                      </B.DateDay>
                      <B.DateMonth>{dateOption.monthName}</B.DateMonth>
                    </B.DateButton>
                  ))}
                </B.DateGrid>
              </B.Field>

              <B.Field>
                <B.Label>Horário Disponível</B.Label>
                {loadingTimes ? (
                  <B.LoadingTimes>Carregando horários...</B.LoadingTimes>
                ) : availableTimes.length > 0 ? (
                  <B.TimeGrid>
                    {availableTimes.map((timeSlot) => (
                      <B.TimeButton
                        key={timeSlot.datetime}
                        type="button"
                        selected={form.time === timeSlot.datetime}
                        onClick={() => setForm({ ...form, time: timeSlot.datetime })}
                      >
                        <B.TimeText>{timeSlot.time}</B.TimeText>
                        <B.TimeDuration>{timeSlot.end_time}</B.TimeDuration>
                      </B.TimeButton>
                    ))}
                  </B.TimeGrid>
                ) : form.barber_id && form.date && form.service_id ? (
                  <B.NoTimesMessage>Nenhum horário disponível para esta data</B.NoTimesMessage>
                ) : (
                  <B.SelectTimeMessage>Selecione barbeiro, data e serviço para ver horários</B.SelectTimeMessage>
                )}
              </B.Field>

              <B.Actions>
                <B.GhostButton type="button" onClick={onClose}>
                  Cancelar
                </B.GhostButton>
                <B.PrimaryButton type="submit" disabled={submitting}>
                  {submitting ? 'Agendando...' : 'Confirmar'}
                </B.PrimaryButton>
              </B.Actions>
            </B.Form>
          )}
        </B.Wrapper>
      </S.Modal>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          setAppointmentData(null);
          onClose(); // Fechar o modal principal também
        }}
        appointmentData={appointmentData}
      />
    </>
  );
};
