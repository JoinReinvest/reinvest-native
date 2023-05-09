import React from 'react';

import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../navigation/hooks';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import { DialogProvider } from '../../../providers/DialogProvider';
import { useInvestFlow } from '../flow-steps';
import { InvestFormFields } from '../types';

interface Props {
  shouldShowFooter?: boolean;
}
export const InvestmentLayout = ({ shouldShowFooter = true }: Props) => {
  const { CurrentStepView } = useInvestFlow();
  const navigation = useLogInNavigation();

  useStepBackOverride<InvestFormFields, LogInStackParamList>(useInvestFlow, navigation, false);
  useKeyboardAware();

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
