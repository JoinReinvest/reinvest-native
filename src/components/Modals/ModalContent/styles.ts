import { StyleSheet } from 'react-native';

import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../../constants/styles';
import { yScale } from '../../../utils/scale';

export const styles = StyleSheet.create({
  header: {
    marginTop: yScale(53),
    marginBottom: yScale(24),
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
  },
  disclaimersContent: {
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
  },
});
