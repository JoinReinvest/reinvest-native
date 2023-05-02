import { StyleSheet } from 'react-native';

import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../../../constants/styles';
import { yScale } from '../../../../utils/scale';

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
    marginTop: yScale(64),
  },

  iconContainer: {
    backgroundColor: 'black',
    height: 96,
    width: 96,
    borderRadius: 96,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: yScale(64),
  },

  inputRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
    marginBottom: yScale(12),
  },

  inputButton: {
    height: 48,
    width: 48,
  },
});
