import {StyledText} from '@components/typography/StyledText';
import {styles} from './styles';
import React from 'react';

enum MessageVariant {
  error = 'error',
  info = 'info',
}

type MessageVariants = keyof typeof MessageVariant;

interface Props {
  message: string;
  variant: MessageVariants;
}

export const FormMessage = ({variant, message}: Props) => {
  return (
    <StyledText style={[styles.message, styles[variant]]} variant={'h6'}>
      {message}
    </StyledText>
  );
};
