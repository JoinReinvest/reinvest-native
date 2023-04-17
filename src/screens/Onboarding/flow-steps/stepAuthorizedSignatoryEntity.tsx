import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { RadioButtonGroup } from '../../../components/RadioButtonGroup';
import { BOOLEAN_OPTIONS } from '../../../constants/booleanOptions';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

interface Fields {
  isAuthorizedSignatoryEntity: boolean | undefined;
}

const schema = z.object({
  isAuthorizedSignatoryEntity: z.boolean(),
});

export const StepAuthorizedSignatoryEntity: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.AUTHORIZED_SIGNATORY_ENTITY,

  doesMeetConditionFields(fields) {
    return !!fields.accountType && fields.accountType !== DraftAccountType.Individual;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const storedValue = storeFields.isAuthorizedSignatoryEntity;
    const defaultValues: Fields = { isAuthorizedSignatoryEntity: storedValue };

    const { handleSubmit, setValue, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = watch('isAuthorizedSignatoryEntity') !== undefined;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields({ isAuthorizedSignatoryEntity: fields.isAuthorizedSignatoryEntity });
      moveToNextStep();
    };

    const watchedAuthorizedSignatoryEntity = watch('isAuthorizedSignatoryEntity');

    const selectedValue = watchedAuthorizedSignatoryEntity ? (watchedAuthorizedSignatoryEntity ? 'yes' : 'false') : undefined;

    return (
      <>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Are you an authorized signatory & beneficiary owner of this entity?"
          />
          <RadioButtonGroup
            selectedValue={selectedValue}
            onSelect={val => setValue('isAuthorizedSignatoryEntity', val === 'yes' ? true : false)}
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
