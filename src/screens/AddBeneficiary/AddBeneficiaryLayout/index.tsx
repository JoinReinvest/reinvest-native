import React from 'react';

import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../navigation/hooks';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import { DialogProvider } from '../../../providers/DialogProvider';
import { BeneficiaryCreationFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { useBeneficiaryCreationFlow } from '../steps';

interface Props {
  shouldShowFooter?: boolean;
}
export const AddBeneficiaryLayout = ({ shouldShowFooter = true }: Props) => {
  const {
    CurrentStepView,
    meta: { currentStepIdentifier },
  } = useBeneficiaryCreationFlow();
  const navigation = useLogInNavigation();
  useStepBackOverride<BeneficiaryCreationFormFields, LogInStackParamList>(
    useBeneficiaryCreationFlow,
    navigation,
    false,
    currentStepIdentifier === Identifiers.INVESTING_PROMPT,
  );
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
