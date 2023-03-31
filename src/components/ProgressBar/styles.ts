import { StyleSheet } from 'react-native';

import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../constants/styles';
import { yScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginTop: yScale(4),
  },
  bar: {
    height: 4,
  },
  absolute: {
    position: 'absolute',
    marginHorizontal: -MAIN_WRAPPER_PADDING_HORIZONTAL,
  },
});
