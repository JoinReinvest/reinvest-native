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
  'primary-label': {
    color: theme.deepGreen,
  },
  'primary--disabled': {
    backgroundColor: theme.lightGray,
  },
  'primary-label--disabled': {
    color: theme.dark3,
  },
  combo: {
    backgroundColor: theme.frostGreen,
  },
  'combo-label': {
    color: theme.deepGreen,
  },
  'combo--disabled': {
    backgroundColor: theme.lightGray,
  },
  'combo-label--disabled': {
    color: theme.dark3,
  },
  secondary: {
    backgroundColor: theme.pureWhite,
  },
  'secondary--disabled': {
    backgroundColor: theme.lightGray,
  },
  'secondary-label': {
    color: theme.deepGreen,
  },
  'secondary-label--disabled': {
    color: theme.dark3,
  },
  outlined: {
    borderWidth: 2,
    borderColor: theme.frostGreen,
  },
  'outlined--disabled': {
    borderWidth: 2,
    borderColor: theme.lightGray,
  },
  'outlined-label': {
    color: theme.frostGreen,
  },
  'outlined-label--disabled': {
    color: theme.darkerGray,
  },
});

export default styles;
