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
    top: -4,
    right: -4,
    height: 14,
    minWidth: 14,
    borderRadius: 14,
    paddingLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    zIndex: 1,
  },
  threeDigitsBadge: {
    right: -7,
  },
  count: { textAlign: 'center' },
});
