import React, {PropsWithChildren} from 'react';
import {Pressable} from 'react-native';
import {Icon} from '../Icon';
import {palette} from '@src/constants/theme';
import {StyledText} from '../typography/StyledText/StyledText';
import {RadioButtonProps} from './types';
import {styles} from './styles';

export const RadioButton = ({
  id,
  checked,
  onPress,
  radioStyles,
  labelStyles,
  children,
}: PropsWithChildren<RadioButtonProps>) => {
  const icon = checked ? 'checkbox' : 'checkboxUnchecked';
  const handlePress = () => onPress(id);

  return (
    <Pressable
      id={id}
      style={[styles.radio, radioStyles]}
      onPress={handlePress}>
      <Icon icon={icon} color={palette.frostGreen} />
      <StyledText variant="bonusHeading" style={[styles.label, labelStyles]}>
        {children}
      </StyledText>
    </Pressable>
  );
};
