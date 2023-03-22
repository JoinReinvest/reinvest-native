import {StyleSheet} from 'react-native';
import {palette} from '@constants/theme';
import {xScale, yScale} from '@src/utils/scale';
import {Fonts} from '@src/types/fonts';

export const styles = StyleSheet.create({
  signet: {
    width: 72,
    height: 72,
    marginVertical: yScale(80),
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
});
