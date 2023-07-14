import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useApproveFees } from 'reinvest-app-common/src/services/queries/approveFees';
import { useCancelInvestment } from 'reinvest-app-common/src/services/queries/cancel-investment';
import { useGetInvestmentSummary } from 'reinvest-app-common/src/services/queries/getInvestmentSummary';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { getApiClient } from '../../api/getApiClient';
import { Button } from '../../components/Button';
import { Box } from '../../components/Containers/Box/Box';
import { FormTitle } from '../../components/Forms/FormTitle';
import { Loader } from '../../components/Loader';
import { MainWrapper } from '../../components/MainWrapper';
import { ConfirmDelete } from '../../components/Modals/ModalContent/ConfirmDelete';
import { UpdateSuccess } from '../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../components/PaddedScrollView';
import { StatusCircle } from '../../components/StatusCircle';
import { StyledText } from '../../components/typography/StyledText';
import { useLogInNavigation } from '../../navigation/hooks';
import { LogInStackParamList } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { useDialog } from '../../providers/DialogProvider';

const FeesApproval = ({
  route: {
    params: { investmentId },
  },
}: NativeStackScreenProps<LogInStackParamList, Screens.FeesApproval>) => {
  const { data: investmentSummary, isLoading: isGettingInvestmentSummary } = useGetInvestmentSummary(getApiClient, {
    investmentId,
    config: { enabled: !!investmentId },
  });
  const { mutateAsync: approveFees, isLoading: isApproving } = useApproveFees(getApiClient);
  const { mutateAsync: cancelInvestment, isLoading: isCanceling } = useCancelInvestment(getApiClient);
  const { goBack, navigate } = useLogInNavigation();
  const { openDialog } = useDialog();

  const isLoading = isApproving || isCanceling || isGettingInvestmentSummary;

  const goToDashboard = () => navigate(Screens.BottomNavigator, { screen: Screens.Dashboard });

  const handleSubmit = async () => {
    await approveFees({ investmentId });
    openDialog(
      <UpdateSuccess
        info="Fees Approved"
        buttonLabel="Dashboard"
        onProceed={goToDashboard}
      />,
      { showLogo: true, header: <HeaderWithLogo onClose={goBack} /> },
    );
    goBack();
  };

  const handleCancel = async () => {
    openDialog(
      <ConfirmDelete
        heading={'Are you sure you want to cancel the transaction'}
        onSuccess={async () => {
          await cancelInvestment({ investmentId });
          goBack();
        }}
      />,
      { closeIcon: false },
      'sheet',
    );
  };

  if (isLoading && !investmentSummary) {
    return (
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <Loader size="xl" />
        {isApproving && <StyledText>Approving the fees</StyledText>}
        {isCanceling && <StyledText>Canceling the investment</StyledText>}
      </Box>
    );
  }

  return (
    <MainWrapper
      dark
      noPadding
    >
      <PaddedScrollView dark>
        <Box pt="24">
          <StatusCircle
            dark
            variant="alert"
          />
        </Box>
        <FormTitle
          dark
          headline={`Notice: ${investmentSummary?.investmentFees?.formatted} fee for manual verification`}
          description="As your verification has failed twice. REINVEST needs to run manual verification"
        />
        <Box mt="12">
          <StyledText>Trade ID: ${investmentSummary?.tradeId}</StyledText>
          {investmentSummary?.createdAt && (
            <StyledText>Date ID: {formatDate(investmentSummary.createdAt, 'INVESTMENT_SUMMARY', { currentFormat: 'API' })}</StyledText>
          )}
          <StyledText>Amount: ${investmentSummary?.amount.formatted}</StyledText>
        </Box>
      </PaddedScrollView>
      <Box
        fw
        px="default"
        pb="8"
      >
        <Button
          onPress={handleSubmit}
          disabled={isLoading}
        >
          Submit
        </Button>
        <Button
          dark
          variant="outlined"
          disabled={isLoading}
          onPress={handleCancel}
        >
          Cancel
        </Button>
      </Box>
    </MainWrapper>
  );
};

export default FeesApproval;
