import { StyleSheet } from 'react-native';

import { yScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  wrapper: {
    height: 120,
  },
  inputWrapper: {
    height: '100%',
    textAlignVertical: 'top',
    paddingHorizontal: 0,
  },
  inputStyle: {
    height: '100%',
  },
  inputStyleOnIOS: {
    paddingTop: yScale(16),
  },
});
