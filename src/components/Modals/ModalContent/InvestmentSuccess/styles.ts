import { StyleSheet } from 'react-native';

import { palette } from '../../../../constants/theme';
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
    marginTop: 0,
  },
  separator: { borderBottomColor: palette.lightGray, borderBottomWidth: 1 },
  icon: { transform: [{ rotate: '180deg' }] },
});
