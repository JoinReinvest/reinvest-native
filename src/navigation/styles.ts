import { StyleSheet } from 'react-native';

import { palette } from '../constants/theme';

export const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: palette.onboarding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationWrapper: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    backgroundColor: 'red',
    top: -5,
    right: -5,
    height: 14,
    width: 14,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    zIndex: 1,
  },
});
