import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { COUNTRIES } from 'reinvest-app-common/src/constants/countries';
import { VISAS_AS_OPTIONS } from 'reinvest-app-common/src/constants/visas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Dropdown } from '../../../components/Dropdown';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Icon } from '../../../components/Icon';
import { Input } from '../../../components/Input';
import { FilterDialog } from '../../../components/Modals/ModalContent/FilterDialog';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { VisaType } from '../../../types/visaType';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'birthCountry' | 'citizenshipCountry' | 'visaType'>;

const schema = z.object({
  birthCountry: formValidationRules.birthCountry,
  citizenshipCountry: formValidationRules.citizenshipCountry,
  visaType: formValidationRules.visaType,
});

export const StepResidencyVisa: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.RESIDENCY_VISA,
  willBePartOfTheFlow(fields) {
    return fields.residency === DomicileType.Visa && !fields.isCompletedProfile;
  },
  doesMeetConditionFields(fields) {
    return fields.residency === DomicileType.Visa && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { formState, handleSubmit, watch, setValue } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const { openDialog } = useDialog();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const { isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const onSubmit: SubmitHandler<Fields> = async ({ birthCountry, citizenshipCountry, visaType }) => {
      if (visaType && birthCountry && citizenshipCountry) {
        await updateStoreFields({ domicile: { forVisa: { birthCountry, citizenshipCountry, visaType } } });
        await completeProfileMutate({
          input: {
            domicile: {
              type: DomicileType.Visa,
              forVisa: {
                visaType,
                birthCountry,
                citizenshipCountry,
              },
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
    const visa = watch('visaType');

    const openPicker = (variant: keyof Fields) => {
      openDialog(
        <FilterDialog
          options={COUNTRIES}
          fillDetailsCallback={value => setValue(variant, value)}
          value={birthCountry}
        />,
        {},
        'sheet',
      );
    };

    return (
      <>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Please enter your US Visa details."
            informationMessage="US Residents Only"
          />
          <Pressable onPress={() => openPicker('citizenshipCountry')}>
            <Input
              placeholder="Citizenship Country"
              pointerEvents={'none'}
              disabled
              editable={false}
              dark
              value={citizenshipCountry}
              rightSection={
                <Icon
                  onPress={() => openPicker('citizenshipCountry')}
                  color={palette.pureWhite}
                  icon="arrowDown"
                />
              }
            ></Input>
          </Pressable>
          <Pressable onPress={() => openPicker('birthCountry')}>
            <Input
              placeholder="Birth Country"
              pointerEvents={'none'}
              disabled
              editable={false}
              dark
              value={birthCountry}
              rightSection={
                <Icon
                  onPress={() => openPicker('birthCountry')}
                  color={palette.pureWhite}
                  icon="arrowDown"
                />
              }
            ></Input>
          </Pressable>
          <Dropdown
            dark
            value={visa}
            placeholder="Visa Type"
            data={VISAS_AS_OPTIONS}
            onSelect={option => setValue('visaType', option.value as VisaType)}
          />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={!shouldButtonBeDisabled || isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
