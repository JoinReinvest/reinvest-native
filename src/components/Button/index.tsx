import React, { PropsWithChildren } from 'react';
import { Pressable, View } from 'react-native';

import { palette } from '../../constants/theme';
import { Loader } from '../Loader';
import { StyledText } from '../typography/StyledText';
import { styles } from './styles';
import { ButtonProps } from './types';

export const Button = ({ startIcon, endIcon, isLoading = false, variant = 'primary', children, disabled, isPill, ...rest }: PropsWithChildren<ButtonProps>) => {
  const renderButtonLabel = () => {
    if (!disabled && isLoading) {
      return <Loader color={variant === 'primary' ? palette.deepGreen : palette.frostGreen} />;
    }

    return children;
  };

  return (
    <Pressable
      style={[styles.button, styles[variant], disabled && styles[`${variant}Disabled`]]}
      disabled={disabled}
      {...rest}
    >
      <View style={[styles.labelWrapper, isPill && styles.pillLabel]}>
        {startIcon}
        <StyledText
          variant={variant === 'combo' ? 'h5' : 'button'}
          style={[styles[`${variant}Label`], disabled && styles[`${variant}LabelDisabled`]]}
        >
          {renderButtonLabel()}
        </StyledText>
        {endIcon}
      </View>
    </Pressable>
  );
};
