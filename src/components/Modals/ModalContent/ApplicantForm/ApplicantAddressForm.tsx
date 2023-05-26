import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { STATES_AS_SELECT_OPTION } from 'reinvest-app-common/src/constants/states';
import { Address, AddressInput } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../../../constants/styles';
import { palette } from '../../../../constants/theme';
import { ApplicantFormFields } from '../../../../screens/Onboarding/utilities';
import { formValidationRules } from '../../../../utils/formValidationRules';
import { Button } from '../../../Button';
import { FormTitle } from '../../../Forms/FormTitle';
import { Icon } from '../../../Icon';
import { PaddedScrollView } from '../../../PaddedScrollView';
import { Controller } from '../../../typography/Controller';
import { SearchDialog } from '../PlacesModal';
import { styles } from '../styles';
import { ApplicantAddressFormProps } from './types';

const placeholders = {
  addressLine1: 'Street Address or P.O. Box',
  addressLine2: 'Unit No. (Optional)',
  zip: 'Zip Code',
  state: 'State',
  city: 'City',
};

type Fields = Pick<ApplicantFormFields, 'residentialAddress'>;

const schema = z.object({ residentialAddress: formValidationRules.address });

export const ApplicantAddressForm = ({
  isVisible,
  isSearchDialogOpen,
  onSearchIconPress,
  onContinue,
  defaultValues,
  dismissSearchDialog,
}: ApplicantAddressFormProps) => {
  const { control, formState, watch, reset, handleSubmit } = useForm<Fields>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues,
  });

  const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

  const addressWatched = watch('residentialAddress.addressLine1');

  const fillFieldsFromPrediction = useCallback(
    (address: Address) => {
      const residentialAddress: AddressInput = {
        addressLine1: address.addressLine1 ?? '',
        addressLine2: address.addressLine2 ?? '',
        country: 'USA',
        zip: address.zip ?? '',
        state: STATES_AS_SELECT_OPTION.find(({ value }) => value === address.state)?.label ?? '',
        city: address.city ?? '',
      };
      reset({ residentialAddress });
      dismissSearchDialog();
    },
    [dismissSearchDialog, reset],
  );

  const onSubmit: SubmitHandler<Fields> = fields => {
    onContinue(fields);
  };

  const getRightComponent = () => {
    return (
      <Icon
        onPress={onSearchIconPress}
        color={palette.pureWhite}
        icon="search"
      />
    );
  };

  return (
    <View
      pointerEvents={isVisible ? 'auto' : 'none'}
      style={[!isVisible ? { height: 0, opacity: 0 } : { height: '100%', opacity: 1 }]}
    >
      {isSearchDialogOpen && (
        <PaddedScrollView
          pointerEvents={isSearchDialogOpen ? 'auto' : 'none'}
          style={[!isSearchDialogOpen && { height: 0, opacity: 0 }]}
        >
          <SearchDialog
            shouldDismissModal={false}
            value={addressWatched || ''}
            placeholder={placeholders.addressLine1}
            fillDetailsCallback={fillFieldsFromPrediction}
            noPadding
          />
        </PaddedScrollView>
      )}
      <PaddedScrollView
        style={[isSearchDialogOpen && { height: 0, opacity: 0 }, { paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL }]}
        contentContainerStyle={{ height: '100%' }}
      >
        <FormTitle
          dark
          headline="Enter the following address for your applicant."
          informationMessage="US Residents Only"
        />
        <Controller
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          fieldName="residentialAddress.addressLine1"
          inputProps={{ placeholder: placeholders.addressLine1, dark: true, rightSection: getRightComponent() }}
        />
        <Controller
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          fieldName="residentialAddress.addressLine2"
          inputProps={{ placeholder: placeholders.addressLine2, dark: true }}
        />
        <Controller
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          fieldName="residentialAddress.city"
          inputProps={{ placeholder: placeholders.city, dark: true }}
        />
        <Controller
          type="dropdown"
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          fieldName="residentialAddress.state"
          dropdownProps={{ placeholder: placeholders.state, data: STATES_AS_SELECT_OPTION, dark: true }}
        />
        <Controller
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          fieldName="residentialAddress.zip"
          inputProps={{ placeholder: placeholders.zip, dark: true, maxLength: 5, keyboardType: 'numeric', style: styles.removeMargin }}
        />
      </PaddedScrollView>
      <View style={{ paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL }}>
        <Button
          disabled={shouldButtonBeDisabled}
          variant="primary"
          onPress={handleSubmit(onSubmit)}
        >
          Continue
        </Button>
      </View>
    </View>
  );
};
