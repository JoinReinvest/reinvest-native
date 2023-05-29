import { useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';

import { Box } from '../../../../../components/Containers/Box/Box';
import { DarkScreenHeader, ScreenHeader } from '../../../../../components/CustomHeader';
import { MainWrapper } from '../../../../../components/MainWrapper';
import { TermsFooter } from '../../../../../components/TermsFooter';
import { useStepBackOverride } from '../../../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import { LogInStackParamList } from '../../../../../navigation/LogInNavigator/types';
import { DEVICE_WIDTH } from '../../../../../utils/scale';
import { UpdateEmailFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { useUpdateEmailFlow } from '../steps';

interface Props {
  shouldShowFooter?: boolean;
}
export const UpdateEmailLayout = ({ shouldShowFooter = true }: Props) => {
  const {
    CurrentStepView,
    meta: { currentStepIdentifier },
  } = useUpdateEmailFlow();
  const navigation = useLogInNavigation();
  const route = useRoute();
  const isOnAuthCodeStep = currentStepIdentifier === Identifiers.AUTHENTICATION_CODE;

  useStepBackOverride<UpdateEmailFormFields, LogInStackParamList>(useUpdateEmailFlow, navigation, false, isOnAuthCodeStep);
  useKeyboardAware();

  useLayoutEffect(() => {
    if (isOnAuthCodeStep) {
      navigation.setOptions({
        header: DarkScreenHeader,
        title: 'logo',
      });
    }
  }, [isOnAuthCodeStep, navigation]);

  return (
    <>
      <MainWrapper
        noPadding
        bottomSafe
        dark={isOnAuthCodeStep}
      >
        <Box fw>
          <ScreenHeader
            dark={isOnAuthCodeStep}
            navigation={navigation}
            route={route}
            options={{
              title: isOnAuthCodeStep ? 'logo' : 'Email Address',
            }}
            style={{ paddingHorizontal: 16 }}
            showGradient={true}
          />
        </Box>
        <Box
          mt="24"
          px="default"
          flex={1}
          style={{ width: DEVICE_WIDTH }}
        >
          <CurrentStepView />
        </Box>
        {shouldShowFooter && <TermsFooter />}
      </MainWrapper>
    </>
  );
};
