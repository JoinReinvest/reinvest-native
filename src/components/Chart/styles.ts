import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';

export const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: palette.lightGray,
  },
  compact: {
    borderWidth: 0,
  },
});
