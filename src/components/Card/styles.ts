import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';
import { xScale, yScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: yScale(24),
    borderWidth: 1,
    borderColor: palette.darkerGray,
  },
  cardTitle: {
    marginBottom: yScale(4),
  },
  cardContent: {
    textAlign: 'center',
    maxWidth: xScale(209),
  },
  selected: {
    borderColor: palette.frostGreen,
    backgroundColor: palette.frostGreen,
    color: palette.pureBlack,
  },
});
