import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { palette } from '../../constants/theme';
import { Icon } from '../Icon';
import { StyledText } from '../typography/StyledText';
import { styles } from './styles';
import type { Props } from './types';

export const StatusCircle = ({ variant = 'success', dark = true, title, children }: PropsWithChildren<Props>) => {
  const success = variant === 'success';

  return (
    <View style={[styles.wrapper]}>
      <View style={[styles.iconContainer, !success && styles.iconContainerError]}>
        <Icon
          size="xl"
          icon={success ? 'tick' : 'hamburgerClose'}
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
