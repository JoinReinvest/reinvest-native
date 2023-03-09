import {StyleSheet} from 'react-native';
import {palette} from '@assets/theme';
import {hexToRgbA} from '@utils/hexToRgb';
import {isIOS} from '@constants/common';

const PADDING_HORIZONTAL = 8;

export const styles = StyleSheet.create({
  wrapper: {
    maxWidth: '100%',
    height: 48,
    marginBottom: 24,
    flexShrink: 1,
  },
  disabled: {
    borderColor: palette.darkerGray,
    backgroundColor: palette.lightesGray,
  },
  error: {
    backgroundColor: hexToRgbA(palette.error, 0.05),
    borderColor: palette.error,
    borderWidth: 1,
  },
  focused: {
    backgroundColor: hexToRgbA(palette.frostGreen, 0.08),
    borderColor: palette.frostGreen,
    borderWidth: 2,
  },
  input: {
    paddingHorizontal: PADDING_HORIZONTAL,
    height: 48,
    borderWidth: 1,
    borderColor: palette.darkerGray,
    /*
     * android is applying its own padding to text input values
     */
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    width: '100%',
  },
  mainSection: {
    flex: 1,
    paddingHorizontal: 8,
    alignSelf: 'flex-end',
  },
  nativeInput: {
    width: '100%',
    color: palette.pureBlack,
    alignSelf: 'flex-end',
    paddingHorizontal: 0,
    paddingVertical: 0,
    textAlignVertical: 'bottom',
    fontSize: 15,
    fontWeight: '400',
    // TODO additional check of fonts , postcript name is updated, RN is missing this font
    fontFamily: 'GTAmerica-ExtendedRegular',
    lineHeight: 19,
  },
  dark: {
    color: palette.pureWhite,
  },
  placeholder: {
    position: 'absolute',
    left: PADDING_HORIZONTAL,
    top: isIOS ? -16 : -8,
  },
  placeholderText: {
    color: palette.dark3,
    fontWeight: '400',
  },
  errorMessage: {
    maxWidth: '100%',
    color: palette.error,
    position: 'absolute',
    bottom: -20,
    left: 0,
  },

  nativeInputDisabled: {color: palette.darkerGray},
  rightSegmentDisabled: {opacity: 0.7},
});
