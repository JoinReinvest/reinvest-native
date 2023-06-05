import React, { useCallback, useLayoutEffect } from 'react';
import { useAbortInvestment } from 'reinvest-app-common/src/services/queries/abortInvestment';
import { useGetDraftRecurringInvestment } from 'reinvest-app-common/src/services/queries/getDraftRecurringInvestment';

import { getApiClient } from '../../../api/getApiClient';
import { HeaderAvatar } from '../../../components/HeaderAvatar';
import { Icon } from '../../../components/Icon';
import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { StyledText } from '../../../components/typography/StyledText';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../navigation/hooks';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import Screens from '../../../navigation/screens';
import { DialogProvider } from '../../../providers/DialogProvider';
import { useInvestFlow } from '../flow-steps';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';

interface Props {
  initialInvestment?: boolean;
  isSingleAccount?: boolean;
  shouldShowFooter?: boolean;
}
/*
 * Add identifiers for skipping cancel element Probably will be Identifiers.PLAID , Identifiers.ACCOUNT_SELECTION
 */

const stepsWithCancelOption: Identifiers[] = [];
const stepsWithoutHeader: Identifiers[] = [Identifiers.PLAID_INFORMATION, Identifiers.PLAID, Identifiers.INITIALISE];
const stepsWithoutBack: Identifiers[] = [Identifiers.BANK_ACCOUNT_CONFIRMED];
const overrideBackSteps: Identifiers[] = [Identifiers.ONE_TIME_INVESTMENT];
export const InvestmentLayout = ({ shouldShowFooter = true, initialInvestment, isSingleAccount }: Props) => {
  const {
    resetStoreFields,
    CurrentStepView,
    meta: { currentStepIdentifier },
    moveToPreviousValidStep,
  } = useInvestFlow();
  const { activeAccount } = useCurrentAccount();
  const navigation = useLogInNavigation();
  const { mutateAsync: abortInvestment } = useAbortInvestment(getApiClient);
  const { refetch: refetchRecurringInvestmentDraft } = useGetDraftRecurringInvestment(getApiClient, {
    accountId: activeAccount.id ?? '',
    config: { enabled: !!activeAccount.id },
  });

  useStepBackOverride<InvestFormFields, LogInStackParamList>(
    useInvestFlow,
    navigation,
    false,
    overrideBackSteps.includes(currentStepIdentifier as Identifiers),
  );
  useKeyboardAware();

  const onCancelInvestment = useCallback(async () => {
    await resetStoreFields();
    navigation.pop(isSingleAccount ? 1 : 2);
  }, [isSingleAccount, navigation, resetStoreFields]);

  const getLeftHeader = useCallback(() => {
    if (initialInvestment) {
      return () => (
        <Icon
          icon={'hamburgerClose'}
          onPress={() => navigation.navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
        />
      );
    }

    // abort recurring investment when going back from deposit schedule
    if (currentStepIdentifier === Identifiers.RECURRING_DEPOSIT_SCHEDULE) {
      return () => (
        <Icon
          icon={'down'}
          style={{ transform: [{ rotate: '90deg' }] }}
          onPress={async () => {
            const { data } = await refetchRecurringInvestmentDraft();

            if (data?.id) {
              await abortInvestment({ investmentId: data.id });
            }

            moveToPreviousValidStep();
          }}
        />
      );
    }

    if (stepsWithoutBack.includes(currentStepIdentifier as Identifiers)) {
      return () => null;
    }

    return undefined;
  }, [initialInvestment, currentStepIdentifier, navigation, refetchRecurringInvestmentDraft, moveToPreviousValidStep, abortInvestment]);

  const getRightHeader = useCallback(() => {
    if (stepsWithCancelOption.includes(currentStepIdentifier as Identifiers)) {
      return undefined;
    }

    if (initialInvestment) {
      return () => <HeaderAvatar disabled />;
    }

    return () => (
      <StyledText
        variant={'h6'}
        onPress={onCancelInvestment}
      >
        Cancel
      </StyledText>
    );
  }, [currentStepIdentifier, initialInvestment, onCancelInvestment]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !stepsWithoutHeader.includes(currentStepIdentifier as Identifiers),
      headerRight: getRightHeader(),
      headerLeft: getLeftHeader(),
    });
  }, [currentStepIdentifier, getLeftHeader, getRightHeader, initialInvestment, navigation, onCancelInvestment]);

  return (
    <DialogProvider>
      <MainWrapper
        noPadding
        bottomSafe
      >
        <CurrentStepView />
        {shouldShowFooter && <TermsFooter />}
      </MainWrapper>
    </DialogProvider>
  );
};
