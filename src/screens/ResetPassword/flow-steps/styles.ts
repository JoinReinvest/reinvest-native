import { StyleSheet } from 'react-native';

import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../../constants/styles';
import { palette } from '../../../constants/theme';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  error: { textAlign: 'center', marginBottom: 24 },
  firstStepLink: {
    textDecorationColor: palette.pureWhite,
    marginBottom: 12,
  },
  buttonsSection: { alignSelf: 'flex-end', width: '100%', paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL },
  fw: {
    width: '100%',
  },
  padded: { paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL },
});
