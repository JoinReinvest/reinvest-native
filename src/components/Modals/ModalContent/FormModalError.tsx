import React from 'react';

import { Box } from '../../Containers/Box/Box';
import { StatusCircle } from '../../StatusCircle';
import { StyledText } from '../../typography/StyledText';
import { MainModalWrapper } from '../ModalWrappers/MainModalWrapper';

export const FormModalError = ({ title, message, dark = true }: { message: string; title: string; dark?: boolean }) => {
  return (
    <MainModalWrapper dark={dark}>
      <StatusCircle
        variant={'error'}
        title={title}
        dark={dark}
      >
        <Box pt={'12'}>
          <StyledText color={dark ? 'pureWhite' : 'pureBlack'}>{message}</StyledText>
        </Box>
      </StatusCircle>
    </MainModalWrapper>
  );
};
