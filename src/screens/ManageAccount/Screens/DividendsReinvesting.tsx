import React from 'react';
import { View } from 'react-native';
import { useSetAutomaticDividendReinvestmentAgreement } from 'reinvest-app-common/src/services/queries/setAutomaticDividendReinvestmentAgreement';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { FormDisclaimer } from '../../../components/FormDisclaimer';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { InvestingDisclaimers } from '../../../constants/strings';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { useCurrentAccountConfig } from '../../../hooks/useActiveAccountConfig';
import { useDialog } from '../../../providers/DialogProvider';
import { styles } from '../../Investing/flow-steps/styles';

const { headline, content } = InvestingDisclaimers.whatIsAutomaticDividendReinvesting;

export const DividendsReinvesting = () => {
  const {
    activeAccount: { id: accountId },
  } = useCurrentAccount();
  const { openDialog } = useDialog();
  const { mutateAsync, isLoading, error } = useSetAutomaticDividendReinvestmentAgreement(getApiClient);
  const { accountConfig, refetch, isLoading: configLoading } = useCurrentAccountConfig();

  const setValueHandler = async (optIn: boolean) => {
    if (accountId) {
      await mutateAsync({ accountId, automaticDividendReinvestmentAgreement: optIn });
      await refetch();
    }
  };

  const showInfo = () => {
    openDialog(
      <FormModalDisclaimer
        headline={headline}
        content={content}
      />,
    );
  };

  const status = accountConfig?.automaticDividendReinvestmentAgreement.signed ? 'Active' : 'Inactive';

  return (
    <>
      <PaddedScrollView isLoading={isLoading || configLoading}>
        <Box py={'16'}>
          <StyledText variant={'h5'}>Automatic Dividend Reinvesting</StyledText>
        </Box>
        {error && <ErrorMessagesHandler error={error} />}
        <StyledText>{`Current Status: ${status}`}</StyledText>
        <FormDisclaimer mt={'8'}>
          <StyledText
            variant="link"
            onPress={showInfo}
          >
            What is automatic dividend reinvesting?
          </StyledText>
        </FormDisclaimer>
      </PaddedScrollView>
      <View
        key="buttons_section"
        style={styles.buttonsSection}
      >
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          variant="outlined"
          onPress={() => setValueHandler(false)}
        >
          Opt Out
        </Button>
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          onPress={() => setValueHandler(true)}
        >
          Opt In
        </Button>
      </View>
    </>
  );
};
