import {StyleSheet} from 'react-native';
import {palette} from '@constants/theme';

export const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
    marginBottom: 12,
  },
  error: {color: palette.error},
  info: {color: palette.frostGreen},
});
