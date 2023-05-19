import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';
import { hexToRgbA } from '../../utils/hexToRgb';
import { Box } from './Box/Box';
import type { BoxProps } from './Box/types';

export const ContainerOverlay = memo(({ children, dark, ...props }: BoxProps & { dark?: boolean }) => {
  return (
    <Box
      {...props}
      style={[styles.container, dark && styles.dark]}
    >
      {children}
    </Box>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: hexToRgbA(palette.pureWhite, 0.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dark: {
    backgroundColor: hexToRgbA(palette.onboarding, 0.4),
  },
});
