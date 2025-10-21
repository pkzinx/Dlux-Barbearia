import { useState } from 'react';
import MediaMatch from '../../molecules/MediaMatch/MediaMatch';

import { Background } from '../../atoms/Background/Background';
import { Heading } from '../../molecules/Heading/Heading';
import { ServiceBox, ServiceBoxProps } from '../../molecules/ServiceBox/ServiceBox';
import { BookingModal } from '../../molecules/ModalForm/booking/BookingModal';
import { Slider, SliderSettings } from '../../molecules/Slider/Slider';

import * as S from './MainServices.styles';

export type MainServicesProps = {
  items: ServiceBoxProps[];
};

const settings: SliderSettings = {
  slidesToShow: 2,
  arrows: false,
  infinite: false,
  speed: 500,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1.05,
        arrows: false,
        infinite: false,
        speed: 500
      }
    }
  ]
};

export const MainServices = ({ items }: MainServicesProps) => {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleSchedule = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setOpen(true);
  };

  return (
    <S.Wrapper>
      <Background src="/assets/img/slide-4.jpg">
        <Heading title="Pronto para Cortar" subtitle="Principais Serviços" lineBottom />

        <MediaMatch greaterThan="large">
          <S.WrapperServicesBox>
            {items.map(({ infos, type }, index) => (
              <ServiceBox
                key={`Service the ${type} - ${index}`}
                infos={infos}
                type={type}
                onSchedule={handleSchedule}
              />
            ))}
          </S.WrapperServicesBox>
        </MediaMatch>

        <MediaMatch lessThan="large">
          <Slider settings={settings}>
            {items.map(({ infos, type }, index) => (
              <ServiceBox
                key={`Service in the slider ${type} - ${index}`}
                infos={infos}
                type={type}
                onSchedule={handleSchedule}
              />
            ))}
          </Slider>
        </MediaMatch>
      </Background>

      <BookingModal isOpen={open} onClose={() => setOpen(false)} serviceTitle={selectedService} />
    </S.Wrapper>
  );
};
