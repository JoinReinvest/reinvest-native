import {StyleSheet} from 'react-native';
import {palette} from '@src/constants/theme';
import {isIOS} from '@src/constants/common';

export const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
    columnGap: 20,
  },
  label: {
    top: isIOS ? 4 : 0,
    color: palette.pureWhite,
    flexShrink: 1,
    lineHeight: 21 * 1.1,
  },
});
