import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette } from '../../../../constants/theme';
import { useLogInNavigation } from '../../../../navigation/hooks';
import Screens from '../../../../navigation/screens';
import { useDialog } from '../../../../providers/DialogProvider';
import { Button } from '../../../Button';
import { Box } from '../../../Containers/Box/Box';
import { Row } from '../../../Containers/Row';
import { Icon } from '../../../Icon';
import { PaddedScrollView } from '../../../PaddedScrollView';
import { StyledText } from '../../../typography/StyledText';
import { styles } from './styles';

export const InvestSuccess = () => {
  const { closeDialog } = useDialog();
  const { bottom } = useSafeAreaInsets();
  const navigation = useLogInNavigation();

  const returnToDashboard = () => {
    navigation.navigate(Screens.Dashboard);
    closeDialog();
  };

  return (
    <View style={[styles.center, styles.container, { paddingBottom: bottom }]}>
      <PaddedScrollView contentContainerStyle={styles.center}>
        <StyledText
          textAlign="center"
          variant="h3"
        >
          Thank you for investing in Community REIT
        </StyledText>
        <InvestSuccessInfo
          type={'One Time'}
          amount={`10000`}
          date={`March 1, 2023`}
        />
        <Box
          fw
          style={{ borderBottomColor: palette.lightGray, borderBottomWidth: 1 }}
        />
        <InvestSuccessInfo
          type={'Recurring'}
          amount={`1000`}
          date={`March 1, 2023`}
        />
        <Row>
          <Icon icon="circleAlert" />
          <StyledText
            color="dark2"
            variant="paragraph"
          >
            Please expect funds to be drawn from your bank account within 3 days.
          </StyledText>
        </Row>
      </PaddedScrollView>
      <Box
        fw
        pb="24"
        px="default"
      >
        <Button onPress={returnToDashboard}>Continue</Button>
      </Box>
    </View>
  );
};

const InvestSuccessInfo = ({ type, amount, date }: { amount: string; date: string; type: string }) => {
  return (
    <Box
      fw
      py="32"
      alignItems="center"
    >
      <StyledText variant="paragraphEmp">{`${type} investment`}</StyledText>
      <Row
        alignItems="center"
        pt="16"
      >
        <Icon
          color={palette.success}
          icon="down"
          style={{ transform: [{ rotate: '180deg' }] }}
        />
        <StyledText variant="h1">{`$${amount}`}</StyledText>
      </Row>
      <StyledText
        color="dark3"
        variant="h6"
      >
        {date}
      </StyledText>
    </Box>
  );
};
