import {StyleSheet} from 'react-native';
import {palette} from '@src/constants/theme';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
    width: '100%',
  },
  list: {
    marginTop: -12,
    backgroundColor: palette.frostGreen,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    textAlign: 'left',
  },
});
