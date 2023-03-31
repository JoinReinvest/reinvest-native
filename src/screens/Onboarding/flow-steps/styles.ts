import { StyleSheet } from 'react-native';

import { yScale } from '../../../utils/scale';

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
