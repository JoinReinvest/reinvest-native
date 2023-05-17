import { Pressable, StyleSheet, View } from 'react-native';
import { Notification as BaseNotification } from 'reinvest-app-common/src/types/graphql';
import { formatDateForNotification } from 'reinvest-app-common/src/utilities/dates';

import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../constants/styles';
import { palette } from '../constants/theme';
import { hexToRgbA } from '../utils/hexToRgb';
import { parse } from '../utils/parse';
import { xScale } from '../utils/scale';
import { Box } from './Containers/Box/Box';
import { Icon } from './Icon';
import { StyledText } from './typography/StyledText';

interface NotificationProps extends Partial<BaseNotification> {
  id: string;
  onPress?: (id: string) => void;
}

export const Notification = ({ id, header, body, date, isRead, onPress }: NotificationProps) => {
  const parsedBody = parse(body, { variant: 'paragraphLarge', style: { fontWeight: '700' } }, { variant: 'paragraphLarge' });

  return (
    <Pressable
      style={[styles.container, isRead && styles.read]}
      onPress={() => onPress?.(id)}
    >
      <View>
        <Box mb="4">
          <StyledText variant="h6">{header}</StyledText>
        </Box>
        <Box mb="12">
          <StyledText
            variant="paragraphLarge"
            style={{ maxWidth: xScale(279) }}
          >
            {parsedBody.map(text => text)}
          </StyledText>
        </Box>
        <StyledText variant="paragraph">{formatDateForNotification(date)}</StyledText>
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
    borderBottomWidth: 1,
    borderBottomColor: palette.lightGray,
  },
  read: {
    backgroundColor: palette.pureWhite,
  },
});
