import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import { customMedia } from '~src/utils/media/customMedia';

import { LogotipoProps } from './Logotipo';

const wrapperModifiers = {
  small: () => css`
    width: 4.8rem;
    height: 4rem;
  `,

  normal: () => css`
    width: 7rem;
    height: 6rem;
  `,

  large: () => css`
    width: 8.5rem;
    height: 7.5rem;
  `,

  hideOnMobile: () => css`
    ${media.lessThan('medium')`
      width: 4.8rem;
      height: 4rem;
    `}
  `
};

export const Wrapper = styled.div<LogotipoProps>`
  ${({ theme, color, size, hideOnMobile }) => css`
    color: ${theme.colors[color!]};
    cursor: pointer;

    ${customMedia.greaterThan('medium')`
      margin: 0 ${theme.spacings.huge};
    `}

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    ${!!size && wrapperModifiers[size]}
    ${!!hideOnMobile && wrapperModifiers.hideOnMobile}
  `}
`;
