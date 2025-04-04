import React, { useCallback } from 'react';
import { RECURRING_INVESTMENT_INTERVAL_LABELS } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { useDeactivateRecurringInvestment } from 'reinvest-app-common/src/services/queries/deactivateRecurringInvestment';
import { useGetActiveRecurringInvestment } from 'reinvest-app-common/src/services/queries/getActiveRecurringInvestment';
import { useGetNotifications } from 'reinvest-app-common/src/services/queries/getNotifications';
import { useReadBankAccount } from 'reinvest-app-common/src/services/queries/readBankAccount';
import { useUnsuspendRecurringInvestment } from 'reinvest-app-common/src/services/queries/unsuspendRecurringInvestment';
import { RecurringInvestmentStatus } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { Icon } from '../../../components/Icon';
import { MainWrapper } from '../../../components/MainWrapper';
import { ConfirmDelete } from '../../../components/Modals/ModalContent/ConfirmDelete';
import { UpdateSuccess } from '../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { SummaryDetail } from '../../../components/SummaryDetail';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { useDialog } from '../../../providers/DialogProvider';

const INVESTMENT_STATUS_LABELS: { [key in RecurringInvestmentStatus]: string } = {
  [RecurringInvestmentStatus.Active]: 'Active',
  [RecurringInvestmentStatus.Draft]: 'Draft',
  [RecurringInvestmentStatus.Inactive]: 'Inactive',
  [RecurringInvestmentStatus.Suspended]: 'Suspended',
  [RecurringInvestmentStatus.WaitingForSigningSubscriptionAgreement]: 'Waiting for signing subscription agreement',
};

export const RecurringInvestments = () => {
  const { goBack, navigate } = useLogInNavigation();
  const { activeAccount } = useCurrentAccount();
  const { openDialog } = useDialog();
  const { refetch: refetchNotifications } = useGetNotifications(getApiClient, {
    accountId: activeAccount.id || '',
  });

  const { data: recurringInvestment, isLoading: isLoadingRecurringInvestment } = useGetActiveRecurringInvestment(getApiClient, {
    accountId: activeAccount.id ?? '',
    config: { enabled: !!activeAccount.id },
  });
  const { data: bankData, isLoading: isLoadingBankAccount } = useReadBankAccount(getApiClient, { accountId: activeAccount.id || '' });
  const { mutateAsync: deactivateRecurringInvestment } = useDeactivateRecurringInvestment(getApiClient);
  const { mutateAsync: unsuspendRecurringInvestment } = useUnsuspendRecurringInvestment(getApiClient);

  const openCancelDialog = useCallback(() => {
    const handleSuccess = async () => {
      const response = await deactivateRecurringInvestment({ accountId: activeAccount.id ?? '' });

      if (response) {
        await refetchNotifications();
        openDialog(
          <UpdateSuccess
            info="Your recurring investments are canceled"
            buttonLabel="Dashboard"
            onProceed={() => navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
          />,
          {
            showLogo: true,
            header: <HeaderWithLogo onClose={goBack} />,
          },
          'main',
        );
      }
    };

    openDialog(
      <ConfirmDelete
        heading={'Are you sure you want to cancel future recurring transactions?'}
        onSuccess={handleSuccess}
      />,
      undefined,
      'sheet',
    );
  }, [activeAccount.id, deactivateRecurringInvestment, goBack, navigate, openDialog, refetchNotifications]);

  const openReinstateDialog = async () => {
    const response = await unsuspendRecurringInvestment({ accountId: activeAccount.id ?? '' });

    if (response) {
      await refetchNotifications();

      openDialog(<UpdateSuccess info="Your recurring investment is reinstated" />, {
        showLogo: true,
        header: <HeaderWithLogo onClose={() => navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })} />,
      });
    }
  };

  const isLoading = isLoadingBankAccount || isLoadingRecurringInvestment;
  const formattedBankAccount = `${bankData?.bankName?.toUpperCase()} ${bankData?.accountNumber?.slice(9).replace(' ', '')}`;

  if (isLoading) {
    return <MainWrapper isLoading={isLoading} />;
  }

  if (!isLoading && (!bankData || !recurringInvestment)) {
    return (
      <MainWrapper
        bottomSafe
        noPadding
      >
        <PaddedScrollView style={{ marginTop: 24 }}>
          <Row alignItems="center">
            <Icon icon="info" />
            {!bankData && <StyledText>You have no Bank Account linked</StyledText>}
            {bankData && !recurringInvestment && <StyledText>You do not have a scheduled investment</StyledText>}
          </Row>
        </PaddedScrollView>
        <Box
          fw
          px="default"
        >
          <Button onPress={() => navigate(Screens.Investing, { skipOneTimeInvestment: true, accountId: activeAccount.id ?? '' })}>
            {!bankData ? 'Connect' : 'Invest'}
          </Button>
        </Box>
      </MainWrapper>
    );
  }

  return (
    <>
      <MainWrapper bottomSafe>
        {recurringInvestment && (
          <Box
            fw
            mt="24"
            flex={1}
          >
            <Box
              fw
              pb="16"
              style={{ borderBottomWidth: 1, borderBottomColor: palette.lightGray }}
            >
              <Row mb="16">
                <StyledText
                  variant="h6"
                  color="dark3"
                >
                  From
                </StyledText>
              </Row>
              <Row
                alignItems="center"
                style={{ columnGap: 8 }}
                fw
              >
                <Icon icon="bank" />
                <StyledText variant="paragraphEmp">{formattedBankAccount}</StyledText>
              </Row>
            </Box>
            {!!recurringInvestment?.schedule.frequency && (
              <SummaryDetail
                label="Frequency"
                value={RECURRING_INVESTMENT_INTERVAL_LABELS.get(recurringInvestment.schedule.frequency) as string}
              />
            )}
            <SummaryDetail
              label="Amount"
              value={recurringInvestment.amount.formatted as string}
            />
            <SummaryDetail
              label="Status"
              value={INVESTMENT_STATUS_LABELS[recurringInvestment.status]}
              valueColor={recurringInvestment.status === RecurringInvestmentStatus.Active ? 'success' : 'error'}
            />
          </Box>
        )}
        <Box fw>
          {recurringInvestment?.status === RecurringInvestmentStatus.Active && (
            <Button
              variant="outlined"
              isDestructive
              onPress={openCancelDialog}
            >
              Cancel Transaction
            </Button>
          )}
          {recurringInvestment?.status === RecurringInvestmentStatus.Suspended && (
            <Button
              variant="primary"
              onPress={openReinstateDialog}
            >
              Reinstate
            </Button>
          )}
        </Box>
      </MainWrapper>
    </>
  );
};
