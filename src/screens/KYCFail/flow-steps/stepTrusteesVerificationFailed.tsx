import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetTrustAccount } from 'reinvest-app-common/src/services/queries/getTrustAccount';
import { AccountType, ActionName, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StatusCircle } from '../../../components/StatusCircle';
import { apiStakeholderToApplicant } from '../../../utils/mappers';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';

export const StepTrusteesVerificationFailed: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.TRUSTEES_VERIFICATION_FAILED,

  doesMeetConditionFields({ _actions, accountType, _forceManualReviewScreen, _bannedAction, _skipStakeholders }) {
    const stakeholderVerificationAction = _actions?.find(({ onObject: { type } }) => type === VerificationObjectType.Stakeholder);
    const doesRequireManualReview = stakeholderVerificationAction?.action === ActionName.RequireManualReview ?? false;

    return (
      accountType === AccountType.Trust &&
      !!stakeholderVerificationAction &&
      !doesRequireManualReview &&
      !_forceManualReviewScreen &&
      !_bannedAction &&
      !_skipStakeholders
    );
  },

  Component: ({ storeFields: { accountId, accountType }, updateStoreFields, moveToNextStep }: StepComponentProps<KYCFailedFormFields>) => {
    const { data: trustProfile, isLoading: isTrustProfileLoading } = useGetTrustAccount(getApiClient, {
      accountId,
      config: {},
    });

    const handleContinue = async () => {
      if (!accountType) {
        return;
      }

      //prefill stakeholders info from API:
      await updateStoreFields({
        stakeholders: trustProfile?.details?.stakeholders?.map(apiStakeholderToApplicant),
      });

      moveToNextStep();
    };

    return (
      <>
        <PaddedScrollView dark>
          <FormTitle
            dark
            headline="We could not verify your applicant's information"
            description="Please verify your information and we will run our verification process again."
          />
          <Box>
            <StatusCircle
              dark
              variant="error"
            />
          </Box>
        </PaddedScrollView>
        <Box
          fw
          px="default"
          pb="8"
        >
          <Button
            onPress={isTrustProfileLoading ? undefined : handleContinue}
            isLoading={isTrustProfileLoading}
          >
            Edit Information
          </Button>
        </Box>
      </>
    );
  },
};
