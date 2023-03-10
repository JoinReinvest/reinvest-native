import {StyleSheet} from 'react-native';
import {MAIN_WRAPPER_PADDING_HORIZONTAL} from '@constants/styles';
import {palette} from '@constants/theme';

export const styles = StyleSheet.create({
  staticWrapper: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  wrapper: {
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
    alignItems: 'center',
    minHeight: '100%',
    backgroundColor: 'white',
  },
  wrapperPadding: {
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
  },
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dark: {
    backgroundColor: palette.onboarding,
  },
});
