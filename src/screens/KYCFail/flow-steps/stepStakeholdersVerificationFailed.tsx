import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetCorporateAccount } from 'reinvest-app-common/src/services/queries/getCorporateAccount';
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

export const StepStakeholdersVerificationFailed: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.STAKEHOLDER_VERIFICATION_FAILED,

  doesMeetConditionFields({ _actions, accountType }) {
    const stakeholderVerificationAction = _actions?.find(({ onObject: { type } }) => type === VerificationObjectType.Stakeholder);
    const doesRequireManualReview = stakeholderVerificationAction?.action === ActionName.RequireManualReview ?? false;

    return accountType === AccountType.Corporate && !!stakeholderVerificationAction && !doesRequireManualReview;
  },

  Component: ({ storeFields: { accountId, accountType }, updateStoreFields, moveToStepByIdentifier }: StepComponentProps<KYCFailedFormFields>) => {
    const { data: corporationProfile, isLoading: isCorporateProfileLoading } = useGetCorporateAccount(getApiClient, {
      config: {
        enabled: accountType === AccountType.Corporate,
      },
      accountId,
    });

    const handleContinue = async () => {
      if (!accountType) {
        return;
      }

      await updateStoreFields({
        stakeholders: corporationProfile?.details?.stakeholders?.map(apiStakeholderToApplicant),
      });

      moveToStepByIdentifier(Identifiers.STAKEHOLDER_LIST);
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
            onPress={isCorporateProfileLoading ? undefined : handleContinue}
            isLoading={isCorporateProfileLoading}
          >
            Edit Information
          </Button>
        </Box>
      </>
    );
  },
};
