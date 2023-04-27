import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { FormModalError } from '../../../components/Modals/ModalContent/FormModalError';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { RadioButtonGroup } from '../../../components/RadioButtonGroup';
import { BOOLEAN_OPTIONS } from '../../../constants/booleanOptions';
import { useDialog } from '../../../providers/DialogProvider';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

interface Fields {
  isAuthorizedSignatoryEntity: boolean | undefined;
}

const schema = z.object({
  isAuthorizedSignatoryEntity: z.boolean(),
});

export const StepAuthorizedSignatoryEntity: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.AUTHORIZED_SIGNATORY_ENTITY,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType !== DraftAccountType.Individual;
  },

  doesMeetConditionFields: fields => {
    const profileFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.dateOfBirth,
      fields.residency,
      fields.ssn,
      fields.address,
      fields.experience,
      fields.employmentStatus,
    ];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const trustFieldsValid =
      fields.accountType === DraftAccountType.Trust && allRequiredFieldsExists([fields.trustType, fields.trustLegalName]) && hasProfileFields;
    const corporateFieldsValid =
      fields.accountType === DraftAccountType.Corporate && allRequiredFieldsExists([fields.corporationType, fields.corporationLegalName]) && hasProfileFields;

    return trustFieldsValid || corporateFieldsValid;
  },

  Component: ({ storeFields: { accountType, isAuthorizedSignatoryEntity }, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const defaultValues: Fields = { isAuthorizedSignatoryEntity };

    const { openDialog } = useDialog();

    const { handleSubmit, setValue, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = watch('isAuthorizedSignatoryEntity') !== undefined;

    const openDenialDialog = useCallback(() => {
      const account = accountType === DraftAccountType.Trust ? 'Trust' : 'Corporate';
      const title = `You are unable to create a ${account} Account`;
      const message = `You need to be an authorized signatory and beneficiary owner of a corporation to have a ${account} account on REINVEST.`;
      openDialog(
        <FormModalError
          title={title}
          message={message}
        />,
      );
    }, [openDialog, accountType]);

    const onSubmit: SubmitHandler<Fields> = async ({ isAuthorizedSignatoryEntity }) => {
      await updateStoreFields({ isAuthorizedSignatoryEntity });

      if (!isAuthorizedSignatoryEntity) {
        return openDenialDialog();
      }

      moveToNextStep();
    };

    const watchedAuthorizedSignatoryEntity = watch('isAuthorizedSignatoryEntity');

    const selectedValue = watchedAuthorizedSignatoryEntity ? (watchedAuthorizedSignatoryEntity ? 'yes' : 'no') : undefined;

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Are you an authorized signatory & beneficiary owner of this entity?"
          />
          <RadioButtonGroup
            selectedValue={selectedValue}
            onSelect={val => setValue('isAuthorizedSignatoryEntity', val === 'yes')}
            options={BOOLEAN_OPTIONS}
          />
        </PaddedScrollView>
        <View
          key={'buttons_section'}
          style={styles.buttonsSection}
        >
          <Button
            disabled={!shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
