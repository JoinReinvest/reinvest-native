import { palette } from '@src/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: palette.onboarding,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
