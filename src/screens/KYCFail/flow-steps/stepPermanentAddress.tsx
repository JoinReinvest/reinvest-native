import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Pressable } from 'react-native';
import { STATES_AS_SELECT_OPTION } from 'reinvest-app-common/src/constants/states';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { ActionName, Address, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Icon } from '../../../components/Icon';
import { Input } from '../../../components/Input';
import { FilterDialog } from '../../../components/Modals/ModalContent/FilterDialog';
import { SearchDialog } from '../../../components/Modals/ModalContent/PlacesModal';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { Controller } from '../../../components/typography/Controller';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';
import { styles } from './styles';

type Fields = Exclude<KYCFailedFormFields['address'], null>;

const schema = formValidationRules.address;

const placeholders = {
  addressLine1: 'Street Address or P.O. Box',
  addressLine2: 'Unit No. (Optional)',
  zip: 'Zip Code',
  state: 'State',
  city: 'City',
};

const getValueFromOption = (id: string) => STATES_AS_SELECT_OPTION.find(({ value }) => value === id)?.label || id;

export const StepPermanentAddress: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.PROFILE_ADDRESS,

  doesMeetConditionFields({ _actions, _forceManualReviewScreen, _bannedAction, ...fields }) {
    const { name, dateOfBirth } = fields;

    const requiredFields = [name?.firstName, name?.lastName, dateOfBirth];
    const profileVerificationAction = _actions?.find(({ onObject: { type } }) => type === VerificationObjectType.Profile);
    const doesRequireManualReview = profileVerificationAction?.action === ActionName.RequireManualReview ?? false;

    return !!profileVerificationAction && !doesRequireManualReview && allRequiredFieldsExists(requiredFields) && !_forceManualReviewScreen && !_bannedAction;
  },

  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<KYCFailedFormFields>) => {
    const initialValues: Fields = { addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: 'USA' };
    const defaultValues: Fields = storeFields.address ? { ...storeFields.address, state: getValueFromOption(storeFields.address.state || '') } : initialValues;

    const { openDialog } = useDialog();

    const { handleSubmit, setValue, control, formState, watch, reset } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async address => {
      const selectedStateCode = STATES_AS_SELECT_OPTION.find(({ label }) => label === address?.state)?.value || '';

      await updateStoreFields({ address: { ...address, state: selectedStateCode } });
      moveToNextStep();
    };

    const addressWatched = watch('addressLine1');
    const stateWatched = watch('state');

    const fillFieldsFromPrediction = useCallback(
      (address: Address) => {
        reset({ ...address, state: STATES_AS_SELECT_OPTION.find(({ value }) => value === address.state)?.label });
      },
      [reset],
    );

    const showSearchDialog = useCallback(() => {
      return openDialog(
        <SearchDialog
          dark={true}
          value={addressWatched || ''}
          placeholder={placeholders.addressLine1}
          fillDetailsCallback={fillFieldsFromPrediction}
        />,
        {},
        'sheet',
      );
    }, [addressWatched, fillFieldsFromPrediction, openDialog]);

    const openPicker = () => {
      openDialog(
        <FilterDialog
          options={STATES_AS_SELECT_OPTION}
          fillDetailsCallback={value => setValue('state', value)}
          value={stateWatched || ''}
        />,
        {},
        'sheet',
      );
    };

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
        <PaddedScrollView
          dark
          keyboardShouldPersistTaps="never"
        >
          <FormTitle
            dark
            headline="Verify that you entered your information correctly"
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
          <Pressable onPress={() => openPicker()}>
            <Input
              placeholder="State"
              pointerEvents={'none'}
              editable={false}
              dark
              value={stateWatched || ''}
              rightSection={
                <Icon
                  onPress={() => openPicker()}
                  color={palette.pureWhite}
                  icon="arrowDown"
                />
              }
            ></Input>
          </Pressable>
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="zip"
            inputProps={{ placeholder: placeholders.zip, dark: true, maxLength: 5, keyboardType: 'numeric', style: styles.removeMargin }}
          />
        </PaddedScrollView>
        <Box
          fw
          pb="8"
          style={[styles.buttonsSection]}
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
