import { palette } from '@src/constants/theme';
import { xScale, yScale } from '@src/utils/scale';
import { StyleSheet } from 'react-native';

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
