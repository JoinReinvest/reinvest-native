import { useRoute } from '@react-navigation/native';
import { useCallback } from 'react';

import { Box } from '../../../../../components/Containers/Box/Box';
import { ScreenHeader } from '../../../../../components/CustomHeader';
import { HeaderCancel } from '../../../../../components/HeaderCancel';
import { Icon } from '../../../../../components/Icon';
import { MainWrapper } from '../../../../../components/MainWrapper';
import { useStepBackOverride } from '../../../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import { LogInStackParamList } from '../../../../../navigation/LogInNavigator/types';
import { DialogProvider } from '../../../../../providers/DialogProvider';
import { WithdrawalFundsFormFields } from '../form-fields';
import { useWithdrawalFundsFlow } from '../steps';

export const WithdrawalFundsLayout = () => {
  const {
    CurrentStepView,
    moveToPreviousValidStep,
    meta: { isFirstStep },
  } = useWithdrawalFundsFlow();
  const navigation = useLogInNavigation();
  const route = useRoute();

  useStepBackOverride<WithdrawalFundsFormFields, LogInStackParamList>(useWithdrawalFundsFlow, navigation, false);
  useKeyboardAware();

  const headerLeft = useCallback(
    () => (
      <Icon
        icon={'down'}
        style={{ transform: [{ rotate: '90deg' }] }}
        onPress={isFirstStep ? navigation.goBack : moveToPreviousValidStep}
      />
    ),
    [isFirstStep, moveToPreviousValidStep, navigation],
  );

  const headerRight = useCallback(() => <HeaderCancel onPress={navigation.goBack} />, [navigation]);

  return (
    <DialogProvider>
      <ScreenHeader
        navigation={navigation}
        route={route}
        options={{
          title: 'Withdraw Funds',
          headerLeft,
          headerRight,
        }}
        showGradient={true}
      />
      <MainWrapper
        noPadding
        bottomSafe
      >
        <Box
          fw
          flex={1}
          mt="24"
          px="default"
        >
          <CurrentStepView />
        </Box>
      </MainWrapper>
    </DialogProvider>
  );
};
