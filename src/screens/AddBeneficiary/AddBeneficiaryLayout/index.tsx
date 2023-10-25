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
    meta: { isLastStep, isFirstStep },
    moveToPreviousValidStep,
  } = useBeneficiaryCreationFlow();
  const navigation = useLogInNavigation();
  useStepBackOverride<BeneficiaryCreationFormFields, LogInStackParamList>(useBeneficiaryCreationFlow, navigation, true, isLastStep);
  useKeyboardAware();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          onPress={isFirstStep ? navigation.goBack : moveToPreviousValidStep}
          icon="down"
          style={{ transform: [{ rotate: '90deg' }] }}
          color={palette.pureBlack}
        />
      ),
    });

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
  }, [isFirstStep, isLastStep, moveToPreviousValidStep, navigation]);

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
