import React, {PropsWithChildren} from 'react';
import {ActivityIndicator, Pressable, View} from 'react-native';
import StyledText from '../typography/StyledText/StyledText';
import {ButtonProps} from './Button.types';
import styles from './Button.styles';
import {theme} from '@src/assets/theme';

const Button = ({
  startIcon,
  endIcon,
  isLoading = false,
  variant = 'primary',
  children,
  disabled,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const variantButtonStyles = disabled
    ? styles[`${variant}--disabled`]
    : styles[variant];
  const variantLabelStyles = disabled
    ? styles[`${variant}-label--disabled`]
    : styles[`${variant}-label`];

  return (
    <Pressable
      style={[styles.button, variantButtonStyles]}
      disabled={disabled}
      {...rest}>
      <View style={styles.labelWrapper}>
        {startIcon}
        <StyledText
          variant={variant === 'combo' ? 'h5' : 'button'}
          style={variantLabelStyles}>
          {!disabled && isLoading ? (
            <ActivityIndicator
              color={variant === 'primary' ? theme.deepGreen : theme.frostGreen}
            />
          ) : (
            children
          )}
        </StyledText>
        {endIcon}
      </View>
    </Pressable>
  );
};

export default Button;
