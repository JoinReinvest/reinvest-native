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

export const StepStakeholderManualReview: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.STAKEHOLDER_MANUAL_REVIEW,

  doesMeetConditionFields({ _actions }) {
    const stakeholderVerificationAction = _actions?.find(({ onObject: { type } }) => type === VerificationObjectType.Stakeholder);
    const doesRequireManualReview = stakeholderVerificationAction?.action === ActionName.RequireManualReview ?? false;

    return !!stakeholderVerificationAction && doesRequireManualReview;
  },

  Component: ({ moveToNextStep }: StepComponentProps<KYCFailedFormFields>) => {
    const navigation = useLogInNavigation();

    const handleSubmit = async () => {
      /*
        - Submit Stakeholders for manual review
        - Continue verification with next verification object
      */
      moveToNextStep();
    };

    const handleCancel = () => {
      /*
        Cancel the investment and navigate back to dashboard
      */
      navigation.navigate(Screens.Dashboard);
    };

    return (
      <>
        <PaddedScrollView dark>
          <Box pt="24">
            <StatusCircle variant="alert" />
          </Box>
          <FormTitle
            dark
            headline="Notice: $10 fee for manual verification"
            description="As your applicants verification has failed twice, REINVEST needs to run a manual verification."
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
