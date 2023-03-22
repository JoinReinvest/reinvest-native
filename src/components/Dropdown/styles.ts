import {StyleSheet} from 'react-native';
import {palette} from '@src/constants/theme';
import {yScale, xScale} from '@src/utils/scale';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: yScale(12),
  },
  listWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  list: {
    marginTop: yScale(-12),
    backgroundColor: palette.frostGreen,
  },
  item: {
    paddingVertical: yScale(12),
    paddingHorizontal: xScale(16),
    textAlign: 'left',
  },
});
