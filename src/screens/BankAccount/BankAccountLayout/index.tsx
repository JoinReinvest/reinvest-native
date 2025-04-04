import React, { useCallback, useEffect } from 'react';

import { HeaderAvatar } from '../../../components/HeaderAvatar';
import { HeaderCancel } from '../../../components/HeaderCancel';
import { Icon } from '../../../components/Icon';
import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useLogInNavigation } from '../../../navigation/hooks';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import Screens from '../../../navigation/screens';
import { DialogProvider } from '../../../providers/DialogProvider';
import { useBankAccountFlow } from '../flow-steps';
import { Identifiers } from '../identifiers';
import { BankAccountFormFields } from '../types';

interface Props {
  initialInvestment?: boolean;
  shouldShowFooter?: boolean;
}
/*
 * Add identifiers for skipping cancel element Probably will be Identifiers.PLAID , Identifiers.ACCOUNT_SELECTION
 */

const stepsWithCancelOption: Identifiers[] = [Identifiers.BANK_ACCOUNT_CONFIRMED];
const stepsWithoutHeader: Identifiers[] = [Identifiers.PLAID_INFORMATION, Identifiers.PLAID];
export const BankAccountLayout = ({ shouldShowFooter = true, initialInvestment }: Props) => {
  const {
    resetStoreFields,
    CurrentStepView,
    meta: { currentStepIdentifier },
  } = useBankAccountFlow();
  const navigation = useLogInNavigation();

  useStepBackOverride<BankAccountFormFields, LogInStackParamList>(useBankAccountFlow, navigation, false);

  const onCancel = useCallback(async () => {
    await resetStoreFields();
    navigation.reset({ index: 0, routes: [{ name: Screens.BottomNavigator, params: { screen: Screens.Dashboard } }] });
  }, [navigation, resetStoreFields]);

  const getLeftHeader = useCallback(() => {
    return () => (
      <Icon
        icon={'hamburgerClose'}
        onPress={() => {
          if (initialInvestment) {
            return navigation.navigate(Screens.BottomNavigator, { screen: Screens.Dashboard });
          }

          return navigation.goBack();
        }}
      />
    );
  }, [initialInvestment, navigation]);

  const getRightHeader = useCallback(() => {
    if (stepsWithCancelOption.includes(currentStepIdentifier as Identifiers)) {
      return undefined;
    }

    if (initialInvestment) {
      return () => <HeaderAvatar />;
    }

    return () => <HeaderCancel onPress={onCancel} />;
  }, [currentStepIdentifier, initialInvestment, onCancel]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: !stepsWithoutHeader.includes(currentStepIdentifier as Identifiers),
      headerRight: getRightHeader(),
      headerLeft: getLeftHeader(),
    });
  }, [currentStepIdentifier, getLeftHeader, getRightHeader, initialInvestment, navigation, onCancel]);

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
