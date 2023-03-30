import { Icon } from '@components/Icon';
import { StyledText } from '@components/typography/StyledText';
import { palette } from '@constants/theme';
import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import type { Props } from './types';

export const StatusCircle = ({ variant = 'success', title, children }: PropsWithChildren<Props>) => {
  const success = variant === 'success';

  return (
    <View style={[styles.wrapper]}>
      <View style={[styles.iconContainer, !success && styles.iconContainerError]}>
        <Icon
          size={'xl'}
          icon={success ? 'tick' : 'hamburgerClose'}
          color={success ? palette.pureBlack : palette.pureWhite}
        />
      </View>
      <StyledText
        variant="h5"
        style={styles.title}
        color={palette.pureWhite}
      >
        {title}
      </StyledText>
      {children}
    </View>
  );
};
