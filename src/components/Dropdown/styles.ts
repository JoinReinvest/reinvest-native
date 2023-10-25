import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';
import { xScale } from '../../utils/scale';

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
    marginTop: -1,
    backgroundColor: palette.frostGreen,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: xScale(16),
    textAlign: 'left',
  },
});
