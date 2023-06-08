import React from 'react';

import { palette } from '../constants/theme';
import { Box } from './Containers/Box/Box';
import { Signet } from './Icon/icons';

export const HeaderSignet = () => {
  return (
    <Box
      m="8"
      width={32}
      height={32}
    >
      <Signet color={palette.pureBlack} />
    </Box>
  );
};
