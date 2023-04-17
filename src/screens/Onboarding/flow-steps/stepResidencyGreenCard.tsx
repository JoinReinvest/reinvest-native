import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { COUNTRIES } from 'reinvest-app-common/src/constants/countries';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Dropdown } from '../../../components/Dropdown';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'birthCountry' | 'citizenshipCountry'>;

const schema = z.object({
  birthCountry: formValidationRules.birthCountry,
  citizenshipCountry: formValidationRules.citizenshipCountry,
});

export const StepResidencyGreenCard: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.RESIDENCY_GREEN_CARD,
  willBePartOfTheFlow(fields) {
    return fields.residency === DomicileType.GreenCard && !fields.isCompletedProfile;
  },
  doesMeetConditionFields(fields) {
    return fields.residency === DomicileType.GreenCard && !fields.isCompletedProfile;
  },
  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { handleSubmit, setValue, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: {
        birthCountry: storeFields.birthCountry,
        citizenshipCountry: storeFields.citizenshipCountry,
      },
    });

    const { isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);

      if (fields.birthCountry && fields.citizenshipCountry) {
        await completeProfileMutate({
          input: {
            domicile: {
              type: DomicileType.GreenCard,
              forGreenCard: { birthCountry: fields.birthCountry, citizenshipCountry: fields.citizenshipCountry },
            },
          },
        });
      }
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    const birthCountry = watch('birthCountry');
    const citizenshipCountry = watch('citizenshipCountry');

    return (
      <>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Please enter your US Green Card details."
            informationMessage="US Residents Only"
          />
          <Dropdown
            dark
            value={citizenshipCountry}
            placeholder="Citizenship Country"
            data={COUNTRIES}
            onSelect={value => setValue('citizenshipCountry', value.value.toString())}
          />
          <Dropdown
            value={birthCountry}
            placeholder="Birth Country"
            dark
            data={COUNTRIES}
            onSelect={option => setValue('birthCountry', option.value.toString())}
          />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={(!birthCountry && !citizenshipCountry) || isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
