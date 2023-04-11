import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    height: 120,
  },
  inputWrapper: {
    height: '100%',
    textAlignVertical: 'top',
    paddingHorizontal: 0,
    color: '#fff',
  },
  inputStyle: {
    height: '100%',
    paddingTop: 12,
  },
  inputWrapperOnAndroid: {
    paddingTop: 10,
  },
  inputStyleOnIOS: {
    paddingTop: 18,
  },
});
