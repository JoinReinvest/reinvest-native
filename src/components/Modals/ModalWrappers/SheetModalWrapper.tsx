import React, { PropsWithChildren, ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HEADER_HEIGHT } from '../../../constants/styles';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { hexToRgbA } from '../../../utils/hexToRgb';
import { Box } from '../../Containers/Box/Box';
import { styles } from './styles';

export const SheetModalWrapper = ({
  dialogContent,
  children,
  safeTop,
}: PropsWithChildren<{ closeIcon?: boolean; dialogContent?: ReactNode; safeTop?: boolean }>) => {
  const { top } = useSafeAreaInsets();
  const { closeDialog } = useDialog();
  /*
  Extend with gestures when needed
   */

  return (
    <Box
      style={[styles.fh, { backgroundColor: hexToRgbA(palette.pureBlack, 0.5), paddingTop: safeTop ? top + HEADER_HEIGHT : 0 }]}
      onPress={closeDialog}
    >
      {dialogContent || children}
    </Box>
  );
};
