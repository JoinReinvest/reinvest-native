import React, { useCallback, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { useGetDividend } from 'reinvest-app-common/src/services/queries/getDividend';
import { useReinvestDividends } from 'reinvest-app-common/src/services/queries/reinvestDividends';
import { useWithdrawDividends } from 'reinvest-app-common/src/services/queries/withdrawDividends';
import { NotificationType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../api/getApiClient';
import { Button } from '../../components/Button';
import { Box } from '../../components/Containers/Box/Box';
import { ContainerOverlay } from '../../components/Containers/ContainerOverlay';
import { ErrorMessagesHandler } from '../../components/ErrorMessagesHandler';
import { Loader } from '../../components/Loader';
import { MainWrapper } from '../../components/MainWrapper';
import { DialogItem, InvestSuccess } from '../../components/Modals/ModalContent/InvestmentSuccess';
import { HeaderWithLogo } from '../../components/Modals/ModalHeaders/HeaderWithLogo';
import { StyledText } from '../../components/typography/StyledText';
import { InvestingDialogDisclaimers } from '../../constants/strings';
import { useCurrentAccount } from '../../hooks/useActiveAccount';
import { LogInProps } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { useDialog } from '../../providers/DialogProvider';
import { styles } from './styles';

const configStrings = {
  [NotificationType.DividendReceived]: { navHeader: 'Dividends', headline: 'Manage Dividends', type: 'Dividend' },
  [NotificationType.RewardDividendReceived]: { navHeader: 'Referral Reward', headline: 'Manage Rewards', type: 'Reward' },
} as Record<NotificationType, { headline: string; navHeader: string; type: string }>;

const notificationWithReinvestOption = [NotificationType.DividendReceived, NotificationType.RewardDividendReceived];

export const NotificationDetails = ({ route, navigation }: LogInProps<Screens.NotificationDetails>) => {
  const { notification } = route.params;
  const { data: dividend, isLoading } = useGetDividend(getApiClient, {
    dividendId: notification.onObject?.id || '',
    config: { enabled: !!notification.onObject?.id },
  });
  const { mutateAsync: reinvest, isLoading: reinvestLoading, error: reinvestError } = useReinvestDividends(getApiClient);
  const { mutateAsync: withdraw, isLoading: withdrawLoading, error: withdrawError } = useWithdrawDividends(getApiClient);
  const { openDialog } = useDialog();
  const { activeAccount } = useCurrentAccount();

  useLayoutEffect(() => {
    navigation.setOptions({ title: configStrings[notification.notificationType]?.navHeader });
  }, [navigation, notification.notificationType]);

  const showSuccessDialog = useCallback(
    (variant: 'reinvest' | 'withdrawal') => {
      const dialogItems: DialogItem[] = [];
      dialogItems.push({ amount: dividend?.amount.value, headline: `Amount` });

      openDialog(
        <InvestSuccess
          type={variant}
          dialogItems={dialogItems}
          disclaimer={InvestingDialogDisclaimers[variant]}
          buttonLabel="Dashboard"
        />,
        {
          showLogo: true,
          header: <HeaderWithLogo onClose={() => navigation.goBack()} />,
          closeIcon: false,
        },
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dividend, navigation, openDialog],
  );

  const onReinvest = async () => {
    if (notification.onObject) {
      await reinvest({ accountId: activeAccount.id ?? '', dividendIds: [notification.onObject.id] });
      showSuccessDialog('reinvest');
    }
  };

  const onWithdraw = async () => {
    if (notification.onObject) {
      await withdraw({ accountId: activeAccount.id ?? '', dividendIds: [notification.onObject.id] });
      showSuccessDialog('withdrawal');
    }
  };

  const error = reinvestError || withdrawError;

  return (
    <MainWrapper
      noPadding
      bottomSafe
    >
      <Box
        flex={1}
        fw
      >
        <Box
          px="default"
          py="24"
          fw
        >
          <StyledText variant="h5">{configStrings[notification.notificationType]?.headline}</StyledText>
        </Box>
        <Box px="default">
          <StyledText variant="h6">{`${configStrings[notification.notificationType]?.type} Amount`}</StyledText>
          <Box
            pb="16"
            pt="8"
          >
            <StyledText variant="h1">{dividend?.amount.formatted}</StyledText>
          </Box>
          <StyledText
            variant="paragraph"
            color="dark1"
          >
            Make a decision on whether to reinvest or withdraw your dividend. If you take no action within (30) days, your dividend will be reinvested.
          </StyledText>
          {error && <ErrorMessagesHandler error={error} />}
        </Box>
        {isLoading && (
          <ContainerOverlay>
            <Loader />
          </ContainerOverlay>
        )}
      </Box>
      {notificationWithReinvestOption.includes(notification.notificationType) && (
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            variant="outlined"
            onPress={onReinvest}
            disabled={reinvestLoading || withdrawLoading}
            isLoading={reinvestLoading}
          >
            Reinvest
          </Button>
          <Button
            disabled={reinvestLoading || withdrawLoading}
            onPress={onWithdraw}
            isLoading={withdrawLoading}
          >
            Withdraw
          </Button>
        </View>
      )}
    </MainWrapper>
  );
};
