import React, { PropsWithChildren } from 'react';
import { Pressable, View } from 'react-native';

import { palette } from '../../constants/theme';
import { Loader } from '../Loader';
import { StyledText } from '../typography/StyledText';
import { styles } from './styles';
import { ButtonProps } from './types';

export const Button = ({
  vessel,
  startIcon,
  endIcon,
  isLoading = false,
  variant = 'primary',
  children,
  disabled,
  isPill,
  dark,
  style,
  labelStyle,
  isDestructive,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const labelWidth = !startIcon && !endIcon ? '90%' : startIcon && endIcon ? '70%' : '80%';

  return (
    <Pressable
      pointerEvents={!vessel ? 'auto' : 'none'}
      style={[styles.button, styles[`${variant}`], isDestructive && styles[`${variant}Destructive`], disabled && styles[`${variant}Disabled`], style]}
      disabled={disabled}
      {...rest}
    >
      {isLoading ? (
        <Loader
          align={'center'}
          color={variant === 'primary' ? palette.deepGreen : palette.frostGreen}
        />
      ) : (
        <View style={[styles.labelWrapper, isPill && styles.pillLabel, labelStyle]}>
          {startIcon}
          <StyledText
            variant={variant === 'combo' ? 'h5' : 'button'}
            numberOfLines={1}
            style={[
              { maxWidth: labelWidth },
              styles[`${variant}Label`],
              !!isDestructive && variant === 'primary' && styles.destructiveFilledLabel,
              disabled && styles[`${variant}LabelDisabled`],
              (variant === 'outlined' || variant === 'draft') && dark && styles.darkLabel,
            ]}
          >
            {children}
          </StyledText>
          {endIcon}
        </View>
      )}
    </Pressable>
  );
};
