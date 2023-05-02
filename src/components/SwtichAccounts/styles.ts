import { StyleSheet } from 'react-native';

import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../constants/styles';

export const styles = StyleSheet.create({
  switchAccountContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchAccountsList: {
    rowGap: 16,
    paddingLeft: MAIN_WRAPPER_PADDING_HORIZONTAL,
  },
});
