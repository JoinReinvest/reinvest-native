import {StyleSheet} from 'react-native';
import {palette} from '@constants/theme';
import {MAIN_WRAPPER_PADDING_HORIZONTAL} from '@constants/styles';

const HEADER_HEIGHT = 56;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: palette.pureWhite,
    alignItems: 'center',
  },
  wrapperDark: {
    backgroundColor: palette.onboarding,
  },
  header: {
    justifyContent: 'space-between',
    height: HEADER_HEIGHT,
  },
  innerWrapper: {
    // We need to decrease padding for usage of Icons safe viewBox
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL - 8,
    width: '100%',
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightColumn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '35%',
  },
  sideSegment: {
    minWidth: '15%',
  },
});

export default styles;
