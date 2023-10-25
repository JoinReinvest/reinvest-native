import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';

export const styles = StyleSheet.create({
  tile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.darkGray,
    minWidth: 68,
    paddingVertical: 15,
  },
  text: {
    color: palette.pureBlack,
    fontWeight: '500',
  },
  selected: {
    backgroundColor: palette.pureBlack,
    color: palette.pureWhite,
    borderColor: palette.pureBlack,
  },
  row: {
    flexDirection: 'row',
    columnGap: 8,
  },
});
