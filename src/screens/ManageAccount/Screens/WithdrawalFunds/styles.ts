import { StyleSheet } from 'react-native';

import { palette } from '../../../../constants/theme';
import { yScale } from '../../../../utils/scale';

export const styles = StyleSheet.create({
  row: {
    borderBottomWidth: 1,
    borderBottomColor: palette.lightGray,
    paddingVertical: 8,
  },
  agreementsRadioStyles: {
    columnGap: yScale(8),
    paddingTop: yScale(8),
  },
});
