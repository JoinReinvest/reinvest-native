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
  secondary: {
    borderWidth: 2,
    borderColor: theme.frostGreen,
  },
  'secondary--disabled': {
    borderWidth: 2,
    borderColor: theme.lightGray,
  },
  'secondary-label': {
    color: theme.frostGreen,
  },
  'secondary-label--disabled': {
    color: theme.darkerGray,
  },
});

export default styles;
