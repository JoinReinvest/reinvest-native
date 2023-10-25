import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useAbortInvestment } from 'reinvest-app-common/src/services/queries/abortInvestment';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StatusCircle } from '../../../components/StatusCircle';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';
export const StepManualReview: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.MANUAL_REVIEW,

  doesMeetConditionFields({ fees, _bannedAction }) {
    return !!fees && !_bannedAction;
  },

  Component: ({
    storeFields: { _oneTimeInvestmentId, _recurringInvestmentId, fees },
    updateStoreFields,
    moveToStepByIdentifier,
  }: StepComponentProps<KYCFailedFormFields>) => {
    const { navigate } = useLogInNavigation();
    const { mutateAsync: abortInvestment } = useAbortInvestment(getApiClient);

    const handleSubmit = async () => {
      /*
        user approved fees, rerun validation
      */

      await updateStoreFields({ _approvedFees: true });
      moveToStepByIdentifier(Identifiers.REVERIFY);
    };

    const handleCancel = async () => {
      /*
        Cancel the investment and navigate back to dashboard
      */

      if (_oneTimeInvestmentId) {
        await abortInvestment({ investmentId: _oneTimeInvestmentId });
      }

      if (_recurringInvestmentId) {
        await abortInvestment({ investmentId: _recurringInvestmentId });
      }

      navigate(Screens.BottomNavigator, { screen: Screens.Dashboard });
    };

    return (
      <>
        <PaddedScrollView dark>
          <Box pt="24">
            <StatusCircle
              dark
              variant="alert"
            />
          </Box>
          <FormTitle
            dark
            headline={`Notice: ${fees?.formatted} fee for manual verification`}
            description="As your verification has failed twice, REINVEST needs to run a manual verification."
          />
        </PaddedScrollView>
        <Box
          fw
          px="default"
          pb="8"
        >
          <Button onPress={handleSubmit}>Submit</Button>
          <Button
            dark
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
