import {StyleSheet} from 'react-native';
import {palette} from '@constants/theme';
import {yScale} from '@src/utils/scale';

export const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
    marginBottom: yScale(12),
  },
  error: {color: palette.error},
  info: {color: palette.frostGreen},
});
