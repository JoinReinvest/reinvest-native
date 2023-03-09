import {theme} from '@src/assets/theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
  },
  primary: {
    backgroundColor: theme.frostGreen,
  },
  primaryLabel: {
    color: theme.deepGreen,
  },
  primaryDisabled: {
    backgroundColor: theme.lightGray,
  },
  primaryLabelDisabled: {
    color: theme.dark3,
  },
  combo: {
    backgroundColor: theme.frostGreen,
  },
  comboLabel: {
    color: theme.deepGreen,
  },
  comboDisabled: {
    backgroundColor: theme.lightGray,
  },
  comboLabelDisabled: {
    color: theme.dark3,
  },
  secondary: {
    backgroundColor: theme.pureWhite,
  },
  secondaryDisabled: {
    backgroundColor: theme.lightGray,
  },
  secondaryLabel: {
    color: theme.deepGreen,
  },
  secondaryLabelDisabled: {
    color: theme.dark3,
  },
  outlined: {
    borderWidth: 2,
    borderColor: theme.frostGreen,
  },
  outlinedDisabled: {
    borderWidth: 2,
    borderColor: theme.lightGray,
  },
  outlinedLabel: {
    color: theme.frostGreen,
  },
  outlinedLabelDisabled: {
    color: theme.darkerGray,
  },
});

export default styles;
