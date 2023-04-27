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
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const renderButtonLabel = () => {
    if (!disabled && isLoading) {
      return <Loader color={variant === 'primary' ? palette.deepGreen : palette.frostGreen} />;
    }

    return children;
  };

  const labelWidth = !startIcon && !endIcon ? '90%' : startIcon && endIcon ? '70%' : '80%';

  return (
    <Pressable
      pointerEvents={!vessel ? 'auto' : 'none'}
      style={[styles.button, styles[`${variant}`], disabled && styles[`${variant}Disabled`], style]}
      disabled={disabled}
      {...rest}
    >
      <View style={[styles.labelWrapper, isPill && styles.pillLabel]}>
        {startIcon}
        <StyledText
          variant={variant === 'combo' ? 'h5' : 'button'}
          numberOfLines={1}
          style={[
            { maxWidth: labelWidth },
            styles[`${variant}Label`],
            disabled && styles[`${variant}LabelDisabled`],
            (variant === 'outlined' || variant === 'draft') && dark && styles.darkLabel,
          ]}
        >
          {renderButtonLabel()}
        </StyledText>
        {endIcon}
      </View>
    </Pressable>
  );
};
