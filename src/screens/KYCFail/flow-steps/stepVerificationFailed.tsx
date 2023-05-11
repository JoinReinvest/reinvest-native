import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { ActionName } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StatusCircle } from '../../../components/StatusCircle';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';

export const StepVerificationFailed: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.VERIFICATION_FAILED,

  Component: ({ storeFields, moveToNextStep }: StepComponentProps<KYCFailedFormFields>) => {
    const { _actions } = storeFields;

    const failedAgain = _actions?.find(({ action }) => action === ActionName.UpdateMemberAgain) ?? false;

    const headline = failedAgain ? 'We still are unable to verify your information' : 'We could not verify your information';

    return (
      <>
        <PaddedScrollView contentContainerStyle={{ position: 'relative' }}>
          <Box pt="24">
            <StatusCircle variant={'error'} />
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
          <Button onPress={moveToNextStep}>Edit Information</Button>
        </Box>
      </>
    );
  },
};
