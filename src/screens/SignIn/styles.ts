import { StyleSheet } from 'react-native';

import { isIOS } from '../../constants/common';
import { palette } from '../../constants/theme';
import { Fonts } from '../../types/fonts';
import { DEVICE_HEIGHT, STATUS_BAR, xScale } from '../../utils/scale';

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
    paddingBottom: 36,
  },
  fw: {
    width: '100%',
  },
});
