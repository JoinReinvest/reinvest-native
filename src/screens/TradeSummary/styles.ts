import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },

  tradeDetailsList: {
    rowGap: 16,
  },

  separator: {
    borderBottomWidth: 1,
    borderBottomColor: palette.lightGray,
  },
});
