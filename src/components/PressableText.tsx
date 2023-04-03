import React, { PropsWithChildren } from 'react';
import { Pressable, PressableProps } from 'react-native';

import { StyledText } from './typography/StyledText';
import { StyledTextProps } from './typography/StyledText/types';

export interface PressableTextProps {
  pressableProps: Omit<PressableProps, 'children'>;
  textProps: Omit<StyledTextProps, 'children'>;
}

export const PressableText = ({ pressableProps, textProps, children }: PropsWithChildren<PressableTextProps>) => {
  return (
    <Pressable {...pressableProps}>
      <StyledText {...textProps}>{children}</StyledText>
    </Pressable>
  );
};
