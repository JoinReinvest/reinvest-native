import {StyleSheet} from 'react-native';
import {palette} from '@src/constants/theme';
import {isIOS} from '@src/constants/common';
import {xScale, yScale} from '@src/utils/scale';

export const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
    columnGap: xScale(20),
  },
  label: {
    top: isIOS ? yScale(4) : 0,
    color: palette.pureWhite,
    flexShrink: 1,
    lineHeight: 21 * 1.1,
  },
});
