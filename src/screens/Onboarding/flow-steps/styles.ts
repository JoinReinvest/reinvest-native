import { yScale } from '@src/utils/scale';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardsWrapper: {
    rowGap: yScale(16),
  },
  link: {
    textAlign: 'center',
    marginTop: yScale(24),
  },
  buttonsSection: {
    width: '100%',
  },
  footer: {
    alignItems: 'center',
  },
  fw: {
    width: '100%',
  },
  phoneRow: {
    flexDirection: 'row',
  },
  callingCodeDropdown: {
    flexBasis: '30%',
  },
  phoneInputWrapper: {
    flexBasis: '70%',
    marginLeft: -1,
  },
});
