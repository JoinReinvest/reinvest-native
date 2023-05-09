import React, { PropsWithChildren } from 'react';
import { Pressable } from 'react-native';

import { palette } from '../../constants/theme';
import { Icon } from '../Icon';
import { StyledText } from '../typography/StyledText';
import { styles } from './styles';
import { RadioButtonProps } from './types';

export const RadioButton = <T extends string>({ value, checked, onPress, radioStyles, labelStyles, children }: PropsWithChildren<RadioButtonProps<T>>) => {
  const icon = checked ? 'checkbox' : 'checkboxUnchecked';
  const handlePress = () => onPress(value);

  return (
    <Pressable
      id={value}
      style={[styles.radio, radioStyles]}
      onPress={handlePress}
    >
      <Icon
        icon={icon}
        color={palette.frostGreen}
      />
      <StyledText
        variant="bonusHeading"
        style={[styles.label, labelStyles]}
      >
        {children}
      </StyledText>
    </Pressable>
  );
};
