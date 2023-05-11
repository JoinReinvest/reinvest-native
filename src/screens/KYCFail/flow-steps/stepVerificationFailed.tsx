import { Alert } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { ActionName } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StatusCircle } from '../../../components/StatusCircle';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';

export const StepVerificationFailed: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.VERIFICATION_FAILED,

  Component: ({ storeFields, moveToNextStep }: StepComponentProps<KYCFailedFormFields>) => {
    const { _actions } = storeFields;
    const { navigate } = useLogInNavigation();

    const failedAgain = _actions?.find(({ action }) => action === ActionName.UpdateMemberAgain) ?? false;
    const isManualReviewRequired = _actions?.find(({ action }) => action === ActionName.RequireManualReview) ?? false;

    const getFormHeadline = () => {
      const formTitle = {
        headline: 'We could not verify your information',
        description: 'Please update your information and we will run our verification process again.',
      };

      if (failedAgain) {
        formTitle.headline = 'We still are unable to verify your information';
      }

      if (isManualReviewRequired) {
        formTitle.headline = 'Notice: $10 fee for manual verification ';
        formTitle.description = 'As your verification has failed twice, REINVEST needs to run a manual verification.';
      }

      return formTitle;
    };

    const { headline, description } = getFormHeadline();

    const handleContinue = () => {
      if (isManualReviewRequired) {
        return Alert.alert('Submit for manual review');
      }

      moveToNextStep();
    };

    return (
      <>
        <PaddedScrollView contentContainerStyle={{ position: 'relative' }}>
          <Box pt="24">
            <StatusCircle variant={isManualReviewRequired ? 'alert' : 'error'} />
          </Box>
          <FormTitle
            dark
            headline={headline}
            description={description}
          />
        </PaddedScrollView>
        <Box
          fw
          px="default"
          pb="24"
        >
          {isManualReviewRequired ? (
            <>
              <Button onPress={handleContinue}>Submit</Button>
              <Button onPress={() => navigate(Screens.Dashboard)}>Cancel</Button>
            </>
          ) : (
            <Button onPress={handleContinue}>Edit Information</Button>
          )}
        </Box>
      </>
    );
  },
};
