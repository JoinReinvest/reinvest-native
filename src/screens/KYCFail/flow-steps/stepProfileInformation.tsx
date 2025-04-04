import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Masks } from 'react-native-mask-input';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { ActionName, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';
import z from 'zod';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { Controller } from '../../../components/typography/Controller';
import { SSN_MASK } from '../../../constants/masks';
import { dateOlderThanEighteenYearsSchema, formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';

type Fields = Omit<KYCFailedFormFields, 'address'>;

const schema = z.object({
  name: z.object({
    firstName: formValidationRules.firstName,
    middleName: formValidationRules.middleName,
    lastName: formValidationRules.lastName,
  }),
  dateOfBirth: dateOlderThanEighteenYearsSchema,
  ssn: formValidationRules.maskedSocialSecurityNumber,
});

export const StepProfileInformation: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.PROFILE_INFORMATION,

  doesMeetConditionFields({ _actions, _forceManualReviewScreen, _bannedAction }) {
    const profileVerificationAction = _actions?.find(({ onObject: { type } }) => type === VerificationObjectType.Profile);
    const doesRequireManualReview = profileVerificationAction?.action === ActionName.RequireManualReview ?? false;

    return !!profileVerificationAction && !doesRequireManualReview && !_forceManualReviewScreen && !_bannedAction;
  },

  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<KYCFailedFormFields>) => {
    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'onBlur',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid;

    const onSubmit: SubmitHandler<Fields> = async ({ name, dateOfBirth }) => {
      await updateStoreFields({ name, dateOfBirth });
      moveToNextStep();
    };

    return (
      <>
        <PaddedScrollView dark>
          <FormTitle
            dark
            headline="Verify that you entered your information correctly"
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="name.firstName"
            inputProps={{ placeholder: 'First Name', dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="name.middleName"
            inputProps={{ placeholder: 'Middle Name (Optional)', dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="name.lastName"
            inputProps={{ placeholder: 'Last Name', dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="dateOfBirth"
            inputProps={{
              placeholder: 'MM/DD/YYYY',
              dark: true,
              keyboardType: 'numeric',
              mask: Masks.DATE_MMDDYYYY,
              maxLength: 10,
            }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="ssn"
            inputProps={{
              placeholder: '000-00-0000',
              dark: true,
              keyboardType: 'numeric',
              maxLength: 11,
              mask: SSN_MASK,
              disabled: true,
            }}
          />
        </PaddedScrollView>
        <Box
          fw
          px="default"
          pb="8"
        >
          <Button
            disabled={shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Confirm
          </Button>
        </Box>
      </>
    );
  },
};
