import { Loader } from '@components/Loader';
import { palette } from '@src/constants/theme';
import React, { PropsWithChildren } from 'react';
import { Pressable, View } from 'react-native';

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
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const renderButtonLabel = () => {
    if (!disabled && isLoading) {
      return <Loader color={variant === 'primary' ? palette.deepGreen : palette.frostGreen} />;
    }

    return children;
  };

  return (
    <Pressable
      pointerEvents={!vessel ? 'auto' : 'none'}
      style={[styles.button, styles[`${variant}`], disabled && styles[`${variant}Disabled`]]}
      disabled={disabled}
      {...rest}
    >
      <View style={[styles.labelWrapper, isPill && styles.pillLabel]}>
        {startIcon}
        <StyledText
          variant={variant === 'combo' ? 'h5' : 'button'}
          style={[
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
