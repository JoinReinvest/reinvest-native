import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { STATES_AS_SELECT_OPTION } from 'reinvest-app-common/src/constants/states';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { Address, DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Icon } from '../../../components/Icon';
import { Input } from '../../../components/Input';
import { FilterDialog } from '../../../components/Modals/ModalContent/FilterDialog';
import { SearchDialog } from '../../../components/Modals/ModalContent/PlacesModal';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Exclude<OnboardingFormFields['businessAddress'], undefined>;

const schema = formValidationRules.address;

const placeholders = {
  addressLine1: 'Street Address or P.O. Box',
  addressLine2: 'Unit No. (Optional)',
  zip: 'Zip Code',
  state: 'State',
  city: 'City',
};

const getValueFromOption = (id: string) => STATES_AS_SELECT_OPTION.find(({ value }) => value === id)?.label;

export const StepBusinessAddress: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.BUSINESS_ADDRESS,

  willBePartOfTheFlow(fields) {
    return fields.accountType !== DraftAccountType.Individual;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency];

    const individualFields = [fields.ssn];

    return fields.accountType !== DraftAccountType.Individual && allRequiredFieldsExists(requiredFields) && allRequiredFieldsExists(individualFields);
  },

  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<OnboardingFormFields>) => {
    const initialValues: Fields = { addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: 'USA' };
    const defaultValues: Fields = storeFields.businessAddress
      ? { ...storeFields.businessAddress, state: getValueFromOption(storeFields.businessAddress.state || '') }
      : initialValues;

    const { openDialog } = useDialog();

    const { progressPercentage } = useOnboardingFormFlow();
    const { setValue, handleSubmit, control, formState, watch, reset } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });
    const {
      error: trustUpdateError,
      mutateAsync: completeTrustDraftAccount,
      isSuccess: trustUpdateSuccess,
      isLoading: isLoadingTrust,
    } = useCompleteTrustDraftAccount(getApiClient);
    const {
      mutateAsync: completeCorporateDraftAccount,
      isSuccess: corporateUpdateSuccess,
      error: corporateUpdateError,
      isLoading: isLoadingCorporate,
    } = useCompleteCorporateDraftAccount(getApiClient);
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoadingCorporate || isLoadingTrust;

    const onSubmit: SubmitHandler<Fields> = async businessAddress => {
      if (!storeFields.accountId) {
        return;
      }

      const selectedStateCode = STATES_AS_SELECT_OPTION.find(({ label }) => label === businessAddress.state)?.value || '';
      const { addressLine1, addressLine2, city, zip, state } = businessAddress;

      if (!addressLine1 || !city || !state || !zip) {
        return;
      }

      const variables = {
        accountId: storeFields.accountId,
        input: { address: { addressLine1, addressLine2, city, state: selectedStateCode, zip, country: 'USA' } },
      };

      await updateStoreFields({ businessAddress });

      if (storeFields.accountType === DraftAccountType.Trust) {
        await completeTrustDraftAccount(variables);
      }

      if (storeFields.accountType === DraftAccountType.Corporate) {
        await completeCorporateDraftAccount(variables);
      }
    };

    useEffect(() => {
      if (trustUpdateSuccess || corporateUpdateSuccess) {
        moveToNextStep();
      }
    }, [corporateUpdateSuccess, trustUpdateSuccess, moveToNextStep]);

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

    const getRightComponent = () => {
      return (
        <Icon
          onPress={showSearchDialog}
          color={palette.pureWhite}
          icon="search"
        />
      );
    };

    const openPicker = () => {
      openDialog(
        <FilterDialog
          dark={true}
          options={STATES_AS_SELECT_OPTION}
          fillDetailsCallback={value => setValue('state', value)}
          value={stateWatched || ''}
        />,
        {},
        'sheet',
      );
    };

    const fiduciaryEntity = DraftAccountType.Corporate ? 'corporation' : 'trust';
    const error = trustUpdateError || corporateUpdateError;

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView
          keyboardShouldPersistTaps="never"
          dark
        >
          <FormTitle
            dark
            headline={`Enter the business address for your ${fiduciaryEntity}`}
            informationMessage="US Residents Only"
          />
          {error && <ErrorMessagesHandler error={error} />}
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
            inputProps={{ placeholder: placeholders.zip, dark: true, maxLength: 5, keyboardType: 'numeric' }}
          />
        </PaddedScrollView>
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
