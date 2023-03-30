import { palette } from '@src/constants/theme';
import { xScale, yScale } from '@src/utils/scale';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
    marginTop: yScale(12),
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: xScale(8),
  },
  pillLabel: {
    columnGap: 0,
  },
  primary: {
    backgroundColor: palette.frostGreen,
  },
  primaryLabel: {
    color: palette.deepGreen,
  },
  primaryDisabled: {
    backgroundColor: palette.lightGray,
  },
  primaryLabelDisabled: {
    color: palette.dark3,
  },
  combo: {
    backgroundColor: palette.frostGreen,
  },
  comboLabel: {
    color: palette.deepGreen,
  },
  comboDisabled: {
    backgroundColor: palette.lightGray,
  },
  comboLabelDisabled: {
    color: palette.dark3,
  },
  secondary: {
    backgroundColor: palette.pureWhite,
  },
  secondaryDisabled: {
    backgroundColor: palette.lightGray,
  },
  secondaryLabel: {
    color: palette.deepGreen,
  },
  secondaryLabelDisabled: {
    color: palette.dark3,
  },
  outlined: {
    borderWidth: 2,
    borderColor: palette.frostGreen,
  },
  outlinedDisabled: {
    borderWidth: 2,
    borderColor: palette.lightGray,
  },
  outlinedLabel: {
    color: palette.frostGreen,
  },
  outlinedLabelDisabled: {
    color: palette.darkerGray,
  },
  pill: {},
});
