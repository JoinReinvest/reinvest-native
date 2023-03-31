import { StyleSheet } from 'react-native';

import { palette } from '../constants/theme';

export const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: palette.onboarding,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
