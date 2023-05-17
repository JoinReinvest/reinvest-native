import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { ActionName, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StatusCircle } from '../../../components/StatusCircle';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';

export const StepProfileManualReview: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.PROFILE_MANUAL_REVIEW,

  doesMeetConditionFields({ _actions }) {
    const profileVerificationAction = _actions?.find(({ onObject: { type } }) => type === VerificationObjectType.Profile);
    const doesRequireManualReview = profileVerificationAction?.action === ActionName.RequireManualReview ?? false;

    return !!profileVerificationAction && doesRequireManualReview;
  },

  Component: ({ moveToNextStep }: StepComponentProps<KYCFailedFormFields>) => {
    const { navigate } = useLogInNavigation();

    const handleSubmit = async () => {
      /*
        - Submit profile for manual review
        - Continue verification with next verification object
      */

      moveToNextStep();
    };

    const handleCancel = () => {
      /*
        Cancel the investment and navigate back to dashboard
      */
      navigate(Screens.Dashboard);
    };

    return (
      <>
        <PaddedScrollView>
          <Box pt="24">
            <StatusCircle variant="alert" />
          </Box>
          <FormTitle
            dark
            headline="Notice: $10 fee for manual verification"
            description="As your verification has failed twice, REINVEST needs to run a manual verification."
          />
        </PaddedScrollView>
        <Box
          fw
          px="default"
          pb="24"
        >
          <Button onPress={handleSubmit}>Submit</Button>
          <Button
            variant="outlined"
            onPress={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </>
    );
  },
};
