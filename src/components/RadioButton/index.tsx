import React, { PropsWithChildren } from 'react';
import { Pressable } from 'react-native';

import { palette } from '../../constants/theme';
import { Icon } from '../Icon';
import { StyledText } from '../typography/StyledText';
import { styles } from './styles';
import { RadioButtonProps } from './types';

// eslint-disable-next-line prettier/prettier
export const RadioButton = <TValue = unknown, >({
  dark = true,
  value,
  checked,
  onPress,
  radioStyles,
  labelStyles,
  children,
}: PropsWithChildren<RadioButtonProps<TValue>>) => {
  const icon = checked ? 'checkbox' : 'checkboxUnchecked';
  const handlePress = () => onPress?.(value);

  const getRadioColor = () => {
    if (checked || dark) {
      return palette.frostGreen;
    }

    return palette.dark3;
  };

  return (
    <Pressable
      id={`${value}`}
      style={[styles.radio, radioStyles]}
      onPress={handlePress}
      pointerEvents={onPress ? 'auto' : 'none'}
    >
      <Icon
        icon={icon}
        color={getRadioColor()}
      />
      <StyledText
        variant="bonusHeading"
        style={[styles.label, labelStyles, { color: dark ? palette.pureWhite : palette.pureBlack }]}
      >
        {children}
      </StyledText>
    </Pressable>
  );
};
