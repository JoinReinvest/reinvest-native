import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { COUNTRIES } from 'reinvest-app-common/src/constants/countries';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Icon } from '../../../components/Icon';
import { Input } from '../../../components/Input';
import { FilterDialog } from '../../../components/Modals/ModalContent/FilterDialog';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
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
        birthCountry: getLabel(storeFields.birthCountry),
        citizenshipCountry: getLabel(storeFields.citizenshipCountry),
      },
    });

    const { isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const onSubmit: SubmitHandler<Fields> = async fields => {
      const citizenshipCountry = getValue(fields.citizenshipCountry);
      const birthCountry = getValue(fields.birthCountry);
      await updateStoreFields({ citizenshipCountry, birthCountry });

      if (birthCountry && citizenshipCountry) {
        await completeProfileMutate({
          input: {
            domicile: {
              type: DomicileType.GreenCard,
              forGreenCard: { birthCountry, citizenshipCountry },
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

    const { openDialog } = useDialog();

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
            headline="Please enter your US Green Card details."
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

const getValue = (label?: string) => COUNTRIES?.find(el => el.label === label)?.value;
const getLabel = (value?: string) => COUNTRIES?.find(el => el.value === value)?.label;
