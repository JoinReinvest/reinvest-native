import { Row } from '@components/Containers/Row';
import { Icon } from '@components/Icon';
import { StyledText } from '@components/typography/StyledText';
import { palette } from '@constants/theme';
import React, { PropsWithChildren, ReactNode } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

interface Props {
  headline: string | ReactNode;
  dark?: boolean;
  description?: string | ReactNode;
  informationMessage?: string;
}

export const FormTitle = ({ headline, description, dark, informationMessage }: PropsWithChildren<Props>) => {
  return (
    <View style={styles.wrapper}>
      <StyledText
        color={dark ? palette.pureWhite : palette.pureBlack}
        variant="h5"
        style={styles.headline}
      >
        {headline}
      </StyledText>
      {description && (
        <StyledText
          color={dark ? palette.pureWhite : palette.pureBlack}
          variant="paragraphLarge"
          style={styles.description}
        >
          {description}
        </StyledText>
      )}
      {informationMessage && (
        <Row
          mt="8"
          alignItems="center"
        >
          <Icon
            icon="circleAlert"
            color={palette.frostGreen}
          />
          <StyledText
            variant="paragraphSmall"
            color={palette.frostGreen}
          >
            {informationMessage}
          </StyledText>
        </Row>
      )}
    </View>
  );
};
