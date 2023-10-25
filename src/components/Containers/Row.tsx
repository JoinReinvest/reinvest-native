import React, { memo, PropsWithChildren } from 'react';

import { Box } from './Box/Box';
import type { BoxProps } from './Box/types';

export type RowProps = PropsWithChildren<BoxProps & { reverse?: boolean }>;
export const Row = memo(({ children, reverse, ...props }: RowProps) => {
  return (
    <Box
      {...props}
      flexDirection={reverse ? 'row-reverse' : 'row'}
    >
      {children}
    </Box>
  );
});
