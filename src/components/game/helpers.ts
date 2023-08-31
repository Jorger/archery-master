import type { BowProps, ArrowProps } from '../../interfaces/index';
import { HEIGHT } from '../../utils/constants';

export const DATA_BOW_ARROW: {
  bow: BowProps;
  arrow: ArrowProps;
}[] = [
  {
    bow: {
      fill: '#de8f6f',
      left: 176,
      top: HEIGHT - 190,
      rotation: 270,
      scale: 1
    },
    arrow: {
      left: 197,
      top: HEIGHT - 176,
      rotation: 180
    }
  },
  {
    bow: {
      fill: '#3c7cab',
      left: 176,
      top: 40,
      rotation: 270,
      scale: -1
    },
    arrow: {
      left: 197,
      top: 88,
      rotation: 0
    }
  }
];
