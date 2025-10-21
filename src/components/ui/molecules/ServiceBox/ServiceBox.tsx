import { HairIcon, HairIconProps } from '../../atoms/HairIcon/HairIcon';

import * as S from './ServiceBox.styles';

type InfosProps = {
  title: string;
  price: string;
  description: string;
  duration?: string;
};

export type ServiceBoxProps = {
  infos: InfosProps[];
  onSchedule?: (serviceTitle: string) => void;
} & HairIconProps;

export const ServiceBox = ({ infos, type, onSchedule }: ServiceBoxProps) => (
  <S.Wrapper>
    <HairIcon type={type} />

    <S.ContentInfos>
      {infos.map(({ title, price, description, duration }) => (
        <S.Content key={`Service - ${title}`}>
          <S.InfoPrimary>
            <S.Title>{title}</S.Title>
            <S.Price>{price}</S.Price>
          </S.InfoPrimary>

          <S.Description>{description}</S.Description>

          {duration && (
            <S.Duration>
              <S.DurationIcon>⏱️</S.DurationIcon>
              <S.DurationText>{duration}</S.DurationText>
            </S.Duration>
          )}

          <S.CtaArea>
            <button type="button" aria-label={`Agendar agora ${title}`} onClick={() => onSchedule?.(title)}>
              Agendar agora
            </button>
          </S.CtaArea>
        </S.Content>
      ))}
    </S.ContentInfos>
  </S.Wrapper>
);
