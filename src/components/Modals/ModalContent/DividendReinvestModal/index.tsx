import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette } from '../../../../constants/theme';
import { useLogInNavigation } from '../../../../navigation/hooks';
import Screens from '../../../../navigation/screens';
import { useDialog } from '../../../../providers/DialogProvider';
import { Fonts } from '../../../../types/fonts';
import { yScale } from '../../../../utils/scale';
import { Button } from '../../../Button';
import { Box } from '../../../Containers/Box/Box';
import { Icon } from '../../../Icon';
import { StyledText } from '../../../typography/StyledText';
import { styles } from './styles';

interface Props {
  amount?: string;
  footer?: string;
  headline?: string;
  info?: string;
}

export const DividendReinvestModal = ({ headline = 'Thank you for reinvesting', info = 'Successfully reinvested.', footer = '', amount = '' }: Props) => {
  const { closeDialog } = useDialog();
  const { bottom } = useSafeAreaInsets();
  const navigation = useLogInNavigation();

  const returnToDashboard = async () => {
    navigation.navigate(Screens.BottomNavigator, { screen: Screens.Dashboard });
    closeDialog();
  };

  return (
    <>
      <View style={[styles.center, styles.container, { paddingBottom: bottom }]}>
        <StyledText
          variant="h4"
          textAlign="center"
        >
          {headline}
        </StyledText>
        <Box
          fw
          alignItems="center"
          justifyContent="center"
          style={{ marginTop: yScale(70) }}
        >
          <StyledText variant="paragraphEmp">Amount</StyledText>
          <Box
            flexDirection="row"
            alignItems="center"
            mt="16"
            mb="32"
          >
            <Icon
              color={palette.success}
              icon="up"
            />
            <StyledText
              variant="dividend"
              style={{ fontFamily: Fonts.GTAmericaMedium }}
            >
              {amount}
            </StyledText>
          </Box>
          <Box
            fw
            flexDirection="row"
            alignItems="center"
            style={{ columnGap: 4 }}
          >
            <Icon
              color={palette.dark2}
              icon="info"
              size="s"
            />
            <StyledText
              variant="paragraph"
              color="dark2"
            >
              {info}
            </StyledText>
          </Box>
          {footer && (
            <Box mt="32">
              <StyledText
                variant="paragraphLarge"
                textAlign="center"
              >
                {footer}
              </StyledText>
            </Box>
          )}
        </Box>
      </View>
      <Box
        px="default"
        pb={bottom}
      >
        <Button onPress={returnToDashboard}>Dashboard</Button>
      </Box>
    </>
  );
};
