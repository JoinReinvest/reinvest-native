import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';
import { yScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    padding: yScale(24),
    borderWidth: 1,
  },
  compact: {
    paddingVertical: yScale(16),
  },
  darkWrapper: {
    borderColor: palette.darkerGray,
  },
  cardTitle: {
    marginBottom: yScale(4),
  },
  cardContent: {
    textAlign: 'center',
  },
  selected: {
    borderColor: palette.frostGreen,
    backgroundColor: palette.frostGreen,
    color: palette.pureBlack,
  },
});
