import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { RECURRING_INVESTMENT_INTERVAL_LABELS } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { useGetActiveRecurringInvestment } from 'reinvest-app-common/src/services/queries/getActiveRecurringInvestment';
import { useReadBankAccount } from 'reinvest-app-common/src/services/queries/readBankAccount';
import { RecurringInvestmentStatus } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { ScreenHeader } from '../../../components/CustomHeader';
import { HeaderCancel } from '../../../components/HeaderCancel';
import { Icon } from '../../../components/Icon';
import { MainWrapper } from '../../../components/MainWrapper';
import { ConfirmDelete } from '../../../components/Modals/ModalContent/ConfirmDelete';
import { UpdateSuccess } from '../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { SummaryDetail } from '../../../components/SummaryDetail';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../navigation/hooks';
import { useDialog } from '../../../providers/DialogProvider';

const INVESTMENT_STATUS_LABELS: { [key in RecurringInvestmentStatus]: string } = {
  [RecurringInvestmentStatus.Active]: 'Active',
  [RecurringInvestmentStatus.Draft]: 'Draft',
  [RecurringInvestmentStatus.Inactive]: 'Inactive',
  [RecurringInvestmentStatus.Suspended]: 'Suspended',
  [RecurringInvestmentStatus.WaitingForSigningSubscriptionAgreement]: 'Waiting for signing subscription agreement',
};

export const RecurringInvestments = () => {
  const route = useRoute();
  const navigation = useLogInNavigation();
  const { activeAccount } = useCurrentAccount();
  const { openDialog } = useDialog();

  const { data: recurringInvestment, isLoading: isLoadingRecurringInvestment } = useGetActiveRecurringInvestment(getApiClient, {
    accountId: activeAccount.id ?? '',
    config: { enabled: !!activeAccount.id },
  });
  const { data: bankData, isLoading: isLoadingBankAccount } = useReadBankAccount(getApiClient, { accountId: activeAccount.id || '' });

  const openCancelDialog = useCallback(() => {
    const handleSuccess = () => {
      openDialog(
        <UpdateSuccess
          info="Your recurring investments are canceled"
          buttonLabel="Dashboard"
        />,
        {
          showLogo: true,
          header: <HeaderWithLogo onClose={navigation.goBack} />,
        },
        'main',
      );
    };

    openDialog(
      <ConfirmDelete
        heading={'Are you sure you want to cancel future recurring transactions?'}
        onSuccess={handleSuccess}
      />,
      undefined,
      'sheet',
    );
  }, [navigation.goBack, openDialog]);

  const headerLeft = () => (
    <Icon
      onPress={navigation.goBack}
      icon="down"
      style={{ transform: [{ rotate: '90deg' }] }}
      color={palette.pureBlack}
    />
  );

  const headerRight = () => <HeaderCancel onPress={openCancelDialog} />;

  const isLoading = isLoadingBankAccount || isLoadingRecurringInvestment;
  const formattedBankAccount = `${bankData?.bankName?.toUpperCase()} ${bankData?.accountNumber?.slice(9).replace(' ', '')}`;

  return (
    <>
      <ScreenHeader
        navigation={navigation}
        route={route}
        options={{
          headerLeft,
          headerRight,
          title: 'Recurring Investment',
        }}
      />
      <MainWrapper isLoading={isLoading}>
        {recurringInvestment && (
          <Box
            fw
            mt="24"
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
      </MainWrapper>
    </>
  );
};
