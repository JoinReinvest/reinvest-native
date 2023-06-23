import React, { useEffect } from 'react';

import { Icon } from '../../../components/Icon';
import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { palette } from '../../../constants/theme';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../navigation/hooks';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import Screens from '../../../navigation/screens';
import { DialogProvider } from '../../../providers/DialogProvider';
import { BeneficiaryCreationFormFields } from '../form-fields';
import { useBeneficiaryCreationFlow } from '../steps';

interface Props {
  shouldShowFooter?: boolean;
}
export const AddBeneficiaryLayout = ({ shouldShowFooter = true }: Props) => {
  const {
    CurrentStepView,
    meta: { isLastStep },
  } = useBeneficiaryCreationFlow();
  const navigation = useLogInNavigation();
  useStepBackOverride<BeneficiaryCreationFormFields, LogInStackParamList>(useBeneficiaryCreationFlow, navigation, true, isLastStep);
  useKeyboardAware();

  useEffect(() => {
    if (!isLastStep) {
      return;
    }

    navigation.setOptions({
      headerLeft: () => (
        <Icon
          icon="hamburgerClose"
          color={palette.pureBlack}
          onPress={() => navigation.replace(Screens.BottomNavigator, { screen: Screens.Dashboard })}
        />
      ),
    });
  }, [isLastStep, navigation]);

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
