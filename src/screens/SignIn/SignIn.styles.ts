import {StyleSheet} from 'react-native';
import {palette} from '@constants/theme';
import {xScale, yScale} from '@src/utils/scale';
import {Fonts} from '@src/types/fonts';

export const styles = StyleSheet.create({
  signet: {
    width: yScale(72),
    height: yScale(72),
    marginTop: yScale(80),
  },
  text: {
    color: palette.pureWhite,
    marginBottom: yScale(16),
  },
  description: {
    fontSize: 15,
    fontFamily: Fonts.GTAmericaExtendedRegular,
    width: xScale(252),
    lineHeight: 18 * 1.1,
    marginBottom: yScale(24),
  },
  descriptionSegment: {
    width: '100%',
    paddingBottom: yScale(8),
    justifyContent: 'center',
    alignContent: 'center',
  },
});
