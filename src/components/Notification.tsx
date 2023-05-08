import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { Pressable, PressableProps, StyleSheet, View } from 'react-native';

import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../constants/styles';
import { palette } from '../constants/theme';
import { hexToRgbA } from '../utils/hexToRgb';
import { xScale } from '../utils/scale';
import { Box } from './Containers/Box/Box';
import { Icon } from './Icon';
import { StyledText } from './typography/StyledText';

interface NotificationProps extends Omit<PressableProps, 'children'> {
  content: ReactNode;
  date: string;
  title: string;
}

export const Notification = ({ title, content, date, ...rest }: NotificationProps) => {
  const dayDifference = dayjs().diff(dayjs(date), 'd');

  return (
    <Pressable
      style={styles.container}
      {...rest}
    >
      <View>
        <Box mb="4">
          <StyledText variant="h6">{title}</StyledText>
        </Box>
        <Box mb="12">
          <StyledText
            variant="paragraphLarge"
            style={{ maxWidth: xScale(279) }}
          >
            {content}
          </StyledText>
        </Box>
        <StyledText variant="paragraph">{dayDifference}d</StyledText>
      </View>
      <Icon icon="arrowRight" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: hexToRgbA(palette.frostGreen, 0.3),
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
