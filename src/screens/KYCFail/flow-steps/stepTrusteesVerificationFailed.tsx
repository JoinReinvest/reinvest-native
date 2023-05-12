import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetTrustAccount } from 'reinvest-app-common/src/services/queries/getTrustAccount';
import { AccountType, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';

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

  doesMeetConditionFields({ _actions, accountType }) {
    return accountType === AccountType.Trust && !!_actions?.find(({ onObject: { type } }) => type === VerificationObjectType.Stakeholder);
  },

  Component: ({ storeFields: { accountId, accountType }, updateStoreFields, moveToNextStep }: StepComponentProps<KYCFailedFormFields>) => {
    const { data: trustProfile, isLoading: isTrustProfileLoading } = useGetTrustAccount(getApiClient, {
      accountId,
      config: {
        enabled: accountType === AccountType.Trust,
      },
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
        <PaddedScrollView>
          <FormTitle
            dark
            headline="We could not verify your applicant's information"
            description="Please verify your information and we will run our verification process again."
          />
          <Box>
            <StatusCircle variant="error" />
          </Box>
        </PaddedScrollView>
        <Box
          fw
          px="default"
          pb="24"
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
