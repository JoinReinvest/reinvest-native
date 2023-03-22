import {StyleSheet} from 'react-native';
import {palette} from '@constants/theme';
import {yScale} from '@src/utils/scale';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  error: {textAlign: 'center', marginBottom: yScale(24)},
  firstStepLink: {
    textDecorationColor: palette.pureWhite,
    marginBottom: yScale(12),
  },
});
