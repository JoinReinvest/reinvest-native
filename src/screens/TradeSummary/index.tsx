import React from 'react';
import { useGetInvestmentSummary } from 'reinvest-app-common/src/services/queries/getInvestmentSummary';
import { InvestmentStatus } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { getApiClient } from '../../api/getApiClient';
import { queryClient } from '../../App';
import { Button } from '../../components/Button';
import { Box } from '../../components/Containers/Box/Box';
import { Loader } from '../../components/Loader';
import { MainWrapper } from '../../components/MainWrapper';
import { AmountUpdate } from '../../components/Modals/ModalContent/AmountUpdate';
import { ConfirmDelete } from '../../components/Modals/ModalContent/ConfirmDelete';
import { HeaderWithLogo } from '../../components/Modals/ModalHeaders/HeaderWithLogo';
import { StyledText } from '../../components/typography/StyledText';
import { useLogInNavigation } from '../../navigation/hooks';
import { LogInProps } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { useDialog } from '../../providers/DialogProvider';
import { styles } from './styles';

const Item = ({ title, value, showBorder = true }: { title: string; value: string; showBorder?: boolean }) => {
  return (
    <Box
      fw
      pb="16"
      style={[showBorder && styles.separator]}
    >
      <StyledText
        variant="paragraph"
        color="dark2"
      >
        {title}
      </StyledText>
      <StyledText variant="h6">{value}</StyledText>
    </Box>
  );
};

const STATUS_LABEL: { [key in InvestmentStatus]: string } = {
  [InvestmentStatus.Failed]: 'Failed',
  [InvestmentStatus.Finished]: 'Finished',
  [InvestmentStatus.Funded]: 'Funded',
  [InvestmentStatus.InProgress]: 'Pending',
  [InvestmentStatus.WaitingForFeesApproval]: 'Waiting For Fees Approval',
  [InvestmentStatus.WaitingForInvestmentStart]: 'Waiting For Investment Start',
  [InvestmentStatus.WaitingForSubscriptionAgreement]: 'Waiting For Subscription Agreement',
};

export const TradeSummary = ({
  route: {
    params: { investmentId, investmentSummary },
  },
}: LogInProps<Screens.TradeSummary>) => {
  const { openDialog } = useDialog();
  const { navigate } = useLogInNavigation();
  const { data: summary, isLoading } = useGetInvestmentSummary(getApiClient, {
    investmentId: investmentId ?? '',
    config: { enabled: !!investmentId || !investmentSummary },
  });

  if (!investmentSummary && (isLoading || !summary)) {
    return (
      <Box
        fw
        flex={1}
        justifyContent="center"
      >
        <Loader size="xxl" />
      </Box>
    );
  }

  const tradeId = investmentSummary?.tradeId ?? summary?.tradeId;
  const status = investmentSummary?.status ?? summary?.status;
  const createdAt = investmentSummary?.createdAt ?? summary?.createdAt;
  const amount = investmentSummary?.amount ?? summary?.amount;

  const handleDialogClose = () => {
    queryClient.invalidateQueries(['getAccountStats', 'getAccountsOverview']);

    navigate(Screens.BottomNavigator, { screen: Screens.Dashboard });
  };

  const cancelTransaction = () => {
    if (!amount) {
      return;
    }

    openDialog(
      <ConfirmDelete
        heading="Are you sure you want to cancel this transaction?"
        onSuccess={() =>
          openDialog(
            <AmountUpdate
              amount={{ ...amount, value: -amount.value }}
              headline={`Trade ${tradeId} cancelled`}
              disclaimer="Please expect funds to be returned to your bank account within 3-5 business days."
              onClose={handleDialogClose}
            />,
            { showLogo: true, header: <HeaderWithLogo onClose={handleDialogClose} /> },
          )
        }
      />,
      undefined,
      'sheet',
    );
  };

  return (
    <>
      <MainWrapper
        style={styles.container}
        bottomSafe
      >
        <Box
          fw
          mb="16"
        >
          <Box mb="12">
            <StyledText variant="h5">Trade ID {tradeId}</StyledText>
          </Box>
          {status && (
            <StyledText
              variant="h6"
              color="dark3"
            >
              {STATUS_LABEL[status]}
            </StyledText>
          )}
        </Box>
        <Box
          fw
          flex={1}
          style={styles.tradeDetailsList}
        >
          <Item
            title="Date"
            value={formatDate(createdAt, 'INVESTMENT', { currentFormat: 'API' })}
          />
          <Item
            title="Amount"
            value={amount?.formatted ?? ''}
          />
          {status && (
            <Item
              title="Status"
              value={STATUS_LABEL[status]}
            />
          )}
          {/* TODO: Replace bank account when implemented on backend */}
          <Item
            title="Bank Account"
            value="123456123456"
            showBorder={false}
          />
        </Box>
        <Box fw>
          {status === InvestmentStatus.InProgress && (
            <Button
              variant="outlined"
              isDestructive
              onPress={cancelTransaction}
            >
              Cancel Transaction{' '}
            </Button>
          )}
        </Box>
      </MainWrapper>
    </>
  );
};
