import { StyledText } from '@components/typography/StyledText';
import React from 'react';

import { styles } from './styles';

enum MessageVariant {
  error = 'error',
  info = 'info',
}

type MessageVariants = keyof typeof MessageVariant;

interface Props {
  message: string;
  variant: MessageVariants;
}

export const FormMessage = ({ variant, message }: Props) => {
  return (
    <StyledText
      style={[styles.message, styles[`${variant}`]]}
      variant={'h6'}
    >
      {message}
    </StyledText>
  );
};
