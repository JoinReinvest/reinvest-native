import { StyleSheet } from 'react-native';

import { palette } from '../../../../constants/theme';
import { xScale } from '../../../../utils/scale';

export const styles = StyleSheet.create({
  wrapper: {},
  bordered: {
    borderWidth: 1,
    borderColor: palette.darkerGray,
  },
  activeTile: {
    backgroundColor: palette.pureBlack,
  },
  tile: {
    flex: 1,
  },
  optionsRow: {
    columnGap: xScale(8),
  },
});
