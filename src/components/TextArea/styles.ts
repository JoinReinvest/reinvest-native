import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    height: 120,
  },
  inputWrapper: {
    height: '100%',
    textAlignVertical: 'top',
    paddingTop: 18,
  },
  inputStyle: {
    height: '100%',
    ...Platform.select({
      ios: {
        paddingBottom: 8,
      },
    }),
    overflow: 'hidden',
  },
});
