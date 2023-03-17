import React, {memo, PropsWithChildren} from 'react';
import {Box} from './Box';
import {type BoxProps} from './types';

export const Row = memo(
  ({
    children,
    reverse,
    ...props
  }: PropsWithChildren<BoxProps & {reverse?: boolean}>) => {
    return (
      <Box {...props} flexDirection={reverse ? 'row-reverse' : 'row'}>
        {children}
      </Box>
    );
  },
);
