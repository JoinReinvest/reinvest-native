import { StyleSheet } from 'react-native';

import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../../constants/styles';
import { palette } from '../../../constants/theme';
import { yScale } from '../../../utils/scale';

export const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  flex: { flex: 1 },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  firstStepLink: {
    textDecorationColor: palette.pureWhite,
    marginVertical: yScale(12),
  },
  buttonsSection: {
    alignSelf: 'flex-end',
    width: '100%',
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
  },
  fw: {
    width: '100%',
  },
  hPadding: {
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
  },
});
