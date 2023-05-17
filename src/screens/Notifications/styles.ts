import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';

export const styles = StyleSheet.create({
  noNotificationContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 10,
  },
  notificationHeaderContainer: { borderBottomColor: palette.lightGray, borderBottomWidth: 1 },
});
