import React from 'react';
import {useStepBackOverride} from '@hooks/useBackOverride';
import {MainWrapper} from '@components/MainWrapper';
import {useRegisterFormFlow} from '@screens/SignUp/flow-steps';
import {RegisterFormFields} from '@screens/SignUp/SignUp.types';
import {TermsFooter} from '@components/TermsFooter';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({shouldShowFooter = true}: Props) => {
  const {CurrentStepView} = useRegisterFormFlow();
  useStepBackOverride<RegisterFormFields>(useRegisterFormFlow);

  return (
    <MainWrapper dark>
      <CurrentStepView />
      {shouldShowFooter && <TermsFooter />}
    </MainWrapper>
  );
};
