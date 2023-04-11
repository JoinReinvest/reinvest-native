import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { STATES_AS_SELECT_OPTION } from 'reinvest-app-common/src/constants/states';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { Address } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Icon } from '../../../components/Icon';
import { SearchDialog } from '../../../components/Modals/ModalContent/PlacesModal';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Exclude<OnboardingFormFields['permanentAddress'], undefined>;

const schema = formValidationRules.address;

const placeholders = {
  addressLine1: 'Street Address or P.O. Box',
  addressLine2: 'Apt, suite, unit, building, floor, etc',
  zip: 'Zip Code',
  state: 'State',
  city: 'City',
};

export const StepPermanentAddress: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PERMANENT_ADDRESS,

  willBePartOfTheFlow(fields) {
    return fields.accountType === DraftAccountType.Individual;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.phone?.number,
      fields.phone?.countryCode,
      fields.authCode,
      fields.dateOfBirth,
      fields.residency,
    ];

    const individualFields = [fields.ssn];

    return (
      (fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(requiredFields) && allRequiredFieldsExists(individualFields)) ||
      (fields.accountType !== DraftAccountType.Individual && allRequiredFieldsExists(requiredFields))
    );
  },
  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<OnboardingFormFields>) => {
    const initialValues: Fields = { addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: 'USA' };
    const defaultValues: Fields = storeFields.permanentAddress || initialValues;

    const { openDialog } = useDialog();

    const { progressPercentage } = useOnboardingFormFlow();
    const { handleSubmit, control, formState, watch, reset } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async permanentAddress => {
      const selectedStateCode = STATES_AS_SELECT_OPTION.find(({ label }) => label === permanentAddress.state)?.value;
      permanentAddress.state = selectedStateCode;
      await updateStoreFields({ permanentAddress });
      moveToNextStep();
    };

    const addressWatched = watch('addressLine1');

    const fillFieldsFromPrediction = (address: Address) => {
      reset(address);
    };

    const showSearchDialog = useCallback(() => {
      return openDialog(
        <SearchDialog
          value={addressWatched || ''}
          placeholder={placeholders.addressLine1}
          fillDetailsCallback={fillFieldsFromPrediction}
        />,
      );
    }, [addressWatched]);

    const getRightComponent = () => {
      return (
        <Icon
          onPress={showSearchDialog}
          color={palette.pureWhite}
          icon="search"
        />
      );
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <ScrollView
          style={[styles.fw]}
          keyboardShouldPersistTaps="always"
        >
          <FormTitle
            dark
            headline="What is your permanent address?"
            informationMessage="US Residents Only"
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="addressLine1"
            inputProps={{ placeholder: placeholders.addressLine1, dark: true, rightSection: getRightComponent() }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="addressLine2"
            inputProps={{ placeholder: placeholders.addressLine2, dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="city"
            inputProps={{ placeholder: placeholders.city, dark: true }}
          />
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="state"
            dropdownProps={{ placeholder: placeholders.state, data: STATES_AS_SELECT_OPTION, dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="zip"
            inputProps={{ placeholder: placeholders.zip, dark: true, maxLength: 5, keyboardType: 'numeric' }}
          />
        </ScrollView>
        <View
          key="buttons_section"
          style={[styles.buttonsSection]}
        >
          <Button
            disabled={shouldButtonBeDisabled}
            isLoading={false}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
