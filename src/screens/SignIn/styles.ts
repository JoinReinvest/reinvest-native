import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';
import { Fonts } from '../../types/fonts';
import { isIOS } from './../../constants/common';
import { MAIN_WRAPPER_PADDING_HORIZONTAL } from './../../constants/styles';
import { DEVICE_HEIGHT, STATUS_BAR, xScale, yScale } from './../../utils/scale';

export const styles = StyleSheet.create({
  signet: {
    position: 'absolute',
    top: 86,
    width: 144,
    height: 144,
  },
  text: {
    fontFamily: Fonts.GTAmericaExtendedRegular,
    color: palette.pureWhite,
    marginBottom: 16,
    maxWidth: xScale(265),
  },
  descriptionSegment: {
    width: '100%',
    paddingBottom: 8,
    fontSize: 15,
  },
  scrollContainer: {
    height: isIOS ? '100%' : DEVICE_HEIGHT - STATUS_BAR,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
    paddingBottom: 36,
  },
  fw: {
    width: '100%',
  },
});
