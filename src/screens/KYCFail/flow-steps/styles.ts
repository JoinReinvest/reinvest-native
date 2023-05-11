import { StyleSheet } from 'react-native';

import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../../constants/styles';
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
});
