import { ServiceBoxProps } from '../../molecules/ServiceBox/ServiceBox';

const services: ServiceBoxProps[] = [
  {
    infos: [
      {
        title: 'Corte de Cabelo Masculino',
        price: 'R$ 30,00',
        description: 'Realizado em qualquer tecnica de corte de cabelo, incluindo tesouras.',
        duration: '30 min'
      }
    ],
    type: 'hair'
  },
  {
    infos: [
      {
        title: 'Barba',
        price: 'R$ 20,00',
        description: 'Aparar o volume ou cortá-la, manutenção do desenho, da hidratação e esfoliação.',
        duration: '20 min'
      }
    ],
    type: 'baber'
  },
  {
    infos: [
      {
        title: 'Corte + Barba',
        price: 'R$ 35,00',
        description:
          'Corte de cabelo masculino com qualquer técnica, incluindo tesouras, mais aparação da barba, manutenção do desenho, hidratação e esfoliação.',
        duration: '50 min'
      }
    ],
    type: 'full'
  }
];

export default services;
