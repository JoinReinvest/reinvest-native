import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';
import { Fonts } from '../../types/fonts';
import { isIOS } from './../../constants/common';
import { AVAILABLE_HEIGHT, STATUS_BAR, xScale, yScale } from './../../utils/scale';

const signetMargin = isIOS ? yScale(86) : yScale(86 + STATUS_BAR);

export const styles = StyleSheet.create({
  signet: {
    width: 144,
    height: 144,
    marginTop: signetMargin,
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
    height: isIOS ? '100%' : AVAILABLE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
});
