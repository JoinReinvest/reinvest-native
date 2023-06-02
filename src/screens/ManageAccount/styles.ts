import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.pureWhite,
  },
  wrapper: {
    marginTop: 24,
    flex: 1,
  },

  companyDocumentsWrapper: {
    flexDirection: 'column-reverse',
  },
});
