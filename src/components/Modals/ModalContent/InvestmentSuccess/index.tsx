import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { palette } from '../../../../constants/theme';
import { useLogInNavigation } from '../../../../navigation/hooks';
import Screens from '../../../../navigation/screens';
import { useDialog } from '../../../../providers/DialogProvider';
import { Button } from '../../../Button';
import { Box } from '../../../Containers/Box/Box';
import { Row } from '../../../Containers/Row';
import { FormDisclaimer } from '../../../FormDisclaimer';
import { Icon } from '../../../Icon';
import { PaddedScrollView } from '../../../PaddedScrollView';
import { StyledText } from '../../../typography/StyledText';
import { styles } from './styles';

export type DialogInvestment = {
  amount: string;
  date: string;
  headline: string;
  isRecurring?: boolean;
};

interface Props {
  disclaimer: string;
  investments: DialogInvestment[];
  type: 'invest' | 'withdrawal' | 'reward';
}

const headlines = {
  invest: 'Thank you for investing in Community REIT',
  withdrawal: '',
  reward: '',
  beneficiary: '',
};

export const InvestSuccess = ({ disclaimer, investments, type }: Props) => {
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
          {headlines[type]}
        </StyledText>
        {investments.map((investment, idx) => {
          return (
            <React.Fragment key={`${investment.headline}+${investment.date}`}>
              <InvestSuccessInfo {...investment} />
              {idx !== investments.length - 1 && (
                <Box
                  fw
                  style={{ borderBottomColor: palette.lightGray, borderBottomWidth: 1 }}
                />
              )}
            </React.Fragment>
          );
        })}
        <FormDisclaimer>{disclaimer}</FormDisclaimer>
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

const InvestSuccessInfo = ({ headline, amount, date, isRecurring }: DialogInvestment) => {
  return (
    <Box
      fw
      py="32"
      alignItems="center"
    >
      <StyledText variant="paragraphEmp">{headline}</StyledText>
      <Row
        alignItems="center"
        pt="16"
      >
        <Icon
          color={palette.success}
          icon={!isRecurring ? 'down' : 'refresh'}
          style={{ transform: [{ rotate: '180deg' }] }}
        />
        <StyledText variant="h1">{`$${amount}`}</StyledText>
      </Row>
      <StyledText
        color="dark3"
        variant="h6"
      >
        {`${isRecurring ? 'Starting ' : ''}${formatDate(date, 'INVESTMENT', { currentFormat: 'DEFAULT' })}`}
      </StyledText>
    </Box>
  );
};
