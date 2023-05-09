import React, { useCallback, useLayoutEffect } from 'react';

import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { StyledText } from '../../../components/typography/StyledText';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../navigation/hooks';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import { DialogProvider } from '../../../providers/DialogProvider';
import { useInvestFlow } from '../flow-steps';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';

interface Props {
  shouldShowFooter?: boolean;
}
/*
 * Add identifiers for skipping cancel element Probably will be Identifiers.PLAID , Identifiers.ACCOUNT_SELECTION
 */

const stepsWithCancelOption: Identifiers[] = [];
export const InvestmentLayout = ({ shouldShowFooter = true }: Props) => {
  const {
    resetStoreFields,
    CurrentStepView,
    meta: { currentStepIdentifier },
  } = useInvestFlow();
  const navigation = useLogInNavigation();

  useStepBackOverride<InvestFormFields, LogInStackParamList>(useInvestFlow, navigation, false);
  useKeyboardAware();

  const onCancelInvestment = useCallback(async () => {
    await resetStoreFields();
    navigation.goBack();
  }, [navigation, resetStoreFields]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: stepsWithCancelOption.includes(currentStepIdentifier as Identifiers)
        ? undefined
        : () => (
            <StyledText
              variant={'h6'}
              onPress={onCancelInvestment}
            >
              Cancel
            </StyledText>
          ),
    });
  }, [currentStepIdentifier, navigation, onCancelInvestment]);

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
