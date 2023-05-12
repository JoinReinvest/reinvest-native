import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { ActionName, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StatusCircle } from '../../../components/StatusCircle';
import { IdentificationDocuments } from '../../Onboarding/types';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';

export const StepVerificationFailed: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.VERIFICATION_FAILED,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<KYCFailedFormFields>) => {
    const { _actions } = storeFields;
    const { data: userProfile } = useGetUserProfile(getApiClient);
    const failedAgain = _actions?.find(({ action }) => action === ActionName.UpdateMemberAgain) ?? false;
    const headline = failedAgain ? 'We still are unable to verify your information' : 'We could not verify your information';

    const handleContinue = async () => {
      //prefill profile info from API:
      const onObjectTypes = _actions?.map(({ onObject }) => onObject.type);

      if (onObjectTypes?.includes(VerificationObjectType.Profile)) {
        await updateStoreFields({
          name: {
            firstName: userProfile?.details?.firstName ?? '',
            middleName: userProfile?.details?.middleName ?? '',
            lastName: userProfile?.details?.lastName ?? '',
          },
          dateOfBirth: userProfile?.details?.dateOfBirth ? formatDate(userProfile.details.dateOfBirth, 'DEFAULT', { currentFormat: 'API' }) : undefined,
          ssn: userProfile?.details?.ssn ?? '',
          identificationDocument: (userProfile?.details?.idScan as IdentificationDocuments) ?? [],
          address: {
            ...userProfile?.details?.address,
          },
        });
      }

      moveToNextStep();
    };

    return (
      <>
        <PaddedScrollView>
          <Box pt="24">
            <StatusCircle variant="error" />
          </Box>
          <FormTitle
            dark
            headline={headline}
            description="Please update your information and we will run our verification process again."
          />
        </PaddedScrollView>
        <Box
          fw
          px="default"
          pb="24"
        >
          <Button onPress={handleContinue}>Edit Information</Button>
        </Box>
      </>
    );
  },
};
