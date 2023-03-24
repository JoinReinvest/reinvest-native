import {width, xScale} from '@utils/scale';

export const MAIN_WRAPPER_PADDING_HORIZONTAL = xScale(24);
export const PADDED_SAFE_WIDTH =
  width - (MAIN_WRAPPER_PADDING_HORIZONTAL || 0) * 2;
export const HEADER_HEIGHT = 56;
