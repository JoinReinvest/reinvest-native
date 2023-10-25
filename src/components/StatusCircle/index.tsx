import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { palette } from '../../constants/theme';
import { Icon } from '../Icon';
import { StyledText } from '../typography/StyledText';
import { styles } from './styles';
import type { Props } from './types';

export const StatusCircle = ({ variant = 'success', dark, title, children, style, fillColor, justifyContent }: PropsWithChildren<Props>) => {
  const success = variant === 'success';

  const getIcon = () => {
    switch (variant) {
      case 'error':
        return 'hamburgerClose';
      case 'success':
        return 'tick';
      case 'alert':
        return 'alert';
    }
  };

  return (
    <View style={[styles.wrapper, justifyContent && { justifyContent }, style]}>
      <View style={[styles.iconContainer, !success && styles.iconContainerError, fillColor && { backgroundColor: palette[fillColor] }]}>
        <Icon
          size="xl"
          icon={getIcon()}
          color={success ? palette.pureBlack : dark ? palette.pureWhite : palette.pureBlack}
        />
      </View>
      <StyledText
        variant="h5"
        style={styles.title}
        color={dark ? 'pureWhite' : 'pureBlack'}
      >
        {title}
      </StyledText>
      {children}
    </View>
  );
};
