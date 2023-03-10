import React, {PropsWithChildren} from 'react';
import {ActivityIndicator, Pressable, View} from 'react-native';
import {StyledText} from '../typography/StyledText/StyledText';
import {ButtonProps} from './Button.types';
import {styles} from './Button.styles';
import {palette} from '@src/constants/theme';

export const Button = ({
  startIcon,
  endIcon,
  isLoading = false,
  variant = 'primary',
  children,
  disabled,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const renderButtonLabel = () => {
    if (!disabled && isLoading) {
      return (
        <ActivityIndicator
          color={variant === 'primary' ? palette.deepGreen : palette.frostGreen}
        />
      );
    }

    return children;
  };

  return (
    <Pressable
      style={[
        styles.button,
        styles[variant],
        disabled && styles[`${variant}Disabled`],
      ]}
      disabled={disabled}
      {...rest}>
      <View style={styles.labelWrapper}>
        {startIcon}
        <StyledText
          variant={variant === 'combo' ? 'h5' : 'button'}
          style={[
            styles[`${variant}Label`],
            disabled && styles[`${variant}LabelDisabled`],
          ]}>
          {renderButtonLabel()}
        </StyledText>
        {endIcon}
      </View>
    </Pressable>
  );
};
