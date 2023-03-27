import { StyledText } from '@components/typography/StyledText';
import { palette } from '@constants/theme';
import React from 'react';
import { PropsWithChildren, ReactNode } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

interface Props {
  headline: string | ReactNode;
  dark?: boolean;
  description?: string | ReactNode;
}

export const FormTitle = ({ headline, description, dark }: PropsWithChildren<Props>) => {
  return (
    <View style={styles.wrapper}>
      <StyledText
        color={dark ? palette.pureWhite : palette.pureBlack}
        variant={'h5'}
        style={styles.headline}
      >
        {headline}
      </StyledText>
      {description && (
        <StyledText
          color={dark ? palette.pureWhite : palette.pureBlack}
          variant={'paragraphLarge'}
          style={styles.description}
        >
          {description}
        </StyledText>
      )}
    </View>
  );
};
