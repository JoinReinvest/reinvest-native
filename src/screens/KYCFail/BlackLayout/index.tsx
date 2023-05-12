import { useRoute } from '@react-navigation/native';
import React from 'react';

import { Box } from '../../../components/Containers/Box/Box';
import { DarkScreenHeader } from '../../../components/CustomHeader';
import { Icon } from '../../../components/Icon';
import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../navigation/hooks';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import { DialogProvider } from '../../../providers/DialogProvider';
import { useKYCFailedFlow } from '../flow-steps';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({ shouldShowFooter = true }: Props) => {
  const {
    CurrentStepView,
    meta: { currentStepIdentifier },
  } = useKYCFailedFlow();
  const navigation = useLogInNavigation();
  const route = useRoute();

  useStepBackOverride<KYCFailedFormFields, LogInStackParamList>(useKYCFailedFlow, navigation);
  useKeyboardAware();

  const headerLeft = () =>
    currentStepIdentifier === Identifiers.MANUAL_REVIEW ? null : (
      <Icon
        color={'#FFF'}
        icon={'down'}
        style={{ transform: [{ rotate: '90deg' }] }}
        onPress={() => navigation.goBack()}
      />
    );

  return (
    <DialogProvider dark>
      <MainWrapper
        dark
        noPadding
      >
        <Box fw>
          <DarkScreenHeader
            options={{
              headerLeft,
              title: 'logo',
            }}
            route={route}
            navigation={navigation}
          />
        </Box>
        <CurrentStepView />
        {shouldShowFooter && <TermsFooter dark />}
      </MainWrapper>
    </DialogProvider>
  );
};
