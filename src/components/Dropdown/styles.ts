import {StyleSheet} from 'react-native';
import {palette} from '@src/constants/theme';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  listWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
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
