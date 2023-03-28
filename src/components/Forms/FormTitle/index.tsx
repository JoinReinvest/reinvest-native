import React, {PropsWithChildren, ReactNode} from 'react';
import {StyledText} from '@components/typography/StyledText';
import {View} from 'react-native';
import {styles} from './styles';
import {palette} from '@constants/theme';
import {Row} from '@components/Containers/Box/Row';
import {Icon} from '@components/Icon';

interface Props {
  headline: string | ReactNode;
  description?: string | ReactNode;
  dark?: boolean;
  informationMessage?: string;
}

export const FormTitle = ({
  headline,
  description,
  dark,
  informationMessage,
}: PropsWithChildren<Props>) => {
  return (
    <View style={styles.wrapper}>
      <StyledText
        color={dark ? palette.pureWhite : palette.pureBlack}
        variant={'h5'}
        style={styles.headline}>
        {headline}
      </StyledText>
      {description && (
        <StyledText
          color={dark ? palette.pureWhite : palette.pureBlack}
          variant={'paragraphLarge'}
          style={styles.description}>
          {description}
        </StyledText>
      )}
      {informationMessage && (
        <Row mt={'8'} alignItems={'center'}>
          <Icon icon={'circleAlert'} color={palette.frostGreen} />
          <StyledText variant={'paragraphSmall'} color={palette.frostGreen}>
            {informationMessage}
          </StyledText>
        </Row>
      )}
    </View>
  );
};
