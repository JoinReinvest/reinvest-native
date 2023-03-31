import React, { PropsWithChildren, ReactNode } from 'react';
import { ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

import { palette } from '../../../constants/theme';
import { yScale } from '../../../utils/scale';
import { Row } from '../../Containers/Row';
import { Icon } from '../../Icon';
import { StyledText } from '../../typography/StyledText';
import { styles } from './styles';

interface Props extends ViewProps {
  headline: string | ReactNode;
  compact?: boolean;
  dark?: boolean;
  description?: string | ReactNode;
  informationMessage?: string;
  link?: string;
  onLinkPress?: () => void;
}
const MARGINS = {
  16: yScale(16),
  60: yScale(60),
};
export const FormTitle = ({ headline, description, dark, link, informationMessage, onLinkPress, compact, style, ...restProps }: PropsWithChildren<Props>) => {
  const sharedValue = useDerivedValue(() => (compact ? 1 : 0));

  const animatedStyles = useAnimatedStyle(() => ({
    marginBottom: withTiming(sharedValue.value ? MARGINS['16'] : MARGINS['60']),
  }));

  return (
    <Animated.View
      style={[styles.wrapper, animatedStyles, style]}
      {...restProps}
    >
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
      {link && (
        <StyledText
          color={dark ? palette.frostGreen : palette.pureBlack}
          variant={'link'}
          onPress={onLinkPress}
        >
          {link}
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
    </Animated.View>
  );
};
