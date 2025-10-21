// Lista de feriados nacionais brasileiros (formato: MM-DD)
const BRAZILIAN_HOLIDAYS = [
  '01-01', // Ano Novo
  '04-21', // Tiradentes
  '05-01', // Dia do Trabalho
  '09-07', // Independência do Brasil
  '10-12', // Nossa Senhora Aparecida
  '11-02', // Finados
  '11-15', // Proclamação da República
  '12-25' // Natal
];

// Feriados móveis 2025 (atualizar anualmente)
const MOBILE_HOLIDAYS_2025 = [
  '02-24', // Carnaval
  '02-25', // Carnaval
  '04-18', // Paixão de Cristo
  '06-19' // Corpus Christi
];

export const isHoliday = (date: Date): boolean => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${month}-${day}`;
  const year = date.getFullYear();

  // Verificar feriados fixos
  if (BRAZILIAN_HOLIDAYS.includes(dateStr)) {
    return true;
  }

  // Verificar feriados móveis de 2025
  if (year === 2025 && MOBILE_HOLIDAYS_2025.includes(dateStr)) {
    return true;
  }

  return false;
};

export const isSunday = (date: Date): boolean => {
  return date.getDay() === 0; // 0 = domingo
};

export const isWorkingDay = (date: Date): boolean => {
  return !isSunday(date) && !isHoliday(date);
};

export const getNext3WorkingDays = (): Array<{
  date: Date;
  dateStr: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
  isToday: boolean;
  isTomorrow: boolean;
}> => {
  const workingDays = [];
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  let attempts = 0;
  const maxAttempts = 14; // Buscar até 14 dias à frente para encontrar 3 dias úteis

  while (workingDays.length < 3 && attempts < maxAttempts) {
    if (isWorkingDay(currentDate)) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      workingDays.push({
        date: new Date(currentDate),
        dateStr: `${year}-${month}-${day}`,
        dayName: dayNames[currentDate.getDay()],
        dayNumber: currentDate.getDate(),
        monthName: monthNames[currentDate.getMonth()],
        isToday: currentDate.getTime() === today.getTime(),
        isTomorrow: currentDate.getTime() === tomorrow.getTime()
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
    attempts++;
  }

  return workingDays;
};

export const formatDateBR = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getDisplayLabel = (isToday: boolean, isTomorrow: boolean, dayName: string, dayNumber: number): string => {
  if (isToday) return `Hoje (${dayNumber})`;
  if (isTomorrow) return `Amanhã (${dayNumber})`;
  return `${dayName} (${dayNumber})`;
};
