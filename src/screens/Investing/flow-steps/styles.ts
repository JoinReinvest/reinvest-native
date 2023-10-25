import { StyleSheet } from 'react-native';

import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../../constants/styles';
import { palette } from '../../../constants/theme';
import { yScale } from '../../../utils/scale';

export const styles = StyleSheet.create({
  buttonsSection: {
    width: '100%',
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
    justifyContent: 'center',
    alignContent: 'center',
  },
  agreementsRadioStyles: {
    columnGap: yScale(8),
    paddingTop: yScale(8),
  },
  scrollViewPaddingTop: { paddingTop: 24 },
  scrollView: { width: '100%' },
  lastSummaryDetail: { borderBottomWidth: 1, borderBottomColor: palette.lightGray },
});
