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

export type DialogItem = {
  amount: number;
  headline: string;
  date?: string;
  isRecurring?: boolean;
};

interface Props {
  dialogItems: DialogItem[];
  disclaimer: string;
  type: 'invest' | 'withdrawal' | 'reward' | 'reinvest';
  buttonLabel?: string;
  onProceed?: () => void;
}

const headlines = {
  invest: 'Thank you for investing in Community REIT',
  withdrawal: 'Thank you for withdrawing',
  reward: '',
  reinvest: 'Thank you for reinvesting.',
  beneficiary: '',
};

export const InvestSuccess = ({ disclaimer, dialogItems, type, onProceed, buttonLabel = 'Continue' }: Props) => {
  const { closeDialog } = useDialog();
  const { bottom } = useSafeAreaInsets();
  const navigation = useLogInNavigation();

  const returnToDashboard = () => {
    if (!onProceed) {
      navigation.navigate(Screens.Dashboard);
    }

    onProceed?.();
    closeDialog();
  };

  return (
    <View style={[styles.center, styles.container, { paddingBottom: bottom }]}>
      <PaddedScrollView contentContainerStyle={[styles.center]}>
        <StyledText
          textAlign="center"
          variant="h3"
        >
          {headlines[type]}
        </StyledText>
        {dialogItems.map((item, idx) => {
          return (
            <React.Fragment key={`${item.headline}+${item.date}`}>
              <InvestSuccessInfo {...item} />
              {idx !== dialogItems.length - 1 && (
                <Box
                  fw
                  style={{ borderBottomColor: palette.lightGray, borderBottomWidth: 1 }}
                />
              )}
            </React.Fragment>
          );
        })}
        <FormDisclaimer fw>{disclaimer}</FormDisclaimer>
      </PaddedScrollView>
      <Box
        fw
        pb="24"
        px="default"
      >
        <Button onPress={returnToDashboard}>{buttonLabel}</Button>
      </Box>
    </View>
  );
};

const InvestSuccessInfo = ({ headline, amount, date, isRecurring }: DialogItem) => {
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
        <StyledText
          numberOfLines={1}
          adjustsFontSizeToFit
          variant="h1"
        >{`$${amount.toFixed(2)}`}</StyledText>
      </Row>
      <StyledText
        color="dark3"
        variant="h6"
      >
        {date && `${isRecurring ? 'Starting ' : ''}${formatDate(date, 'INVESTMENT', { currentFormat: 'DEFAULT' })}`}
      </StyledText>
    </Box>
  );
};
