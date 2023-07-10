import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Pressable } from 'react-native';
import { STATES_AS_SELECT_OPTION } from 'reinvest-app-common/src/constants/states';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetCorporateAccount } from 'reinvest-app-common/src/services/queries/getCorporateAccount';
import { useGetTrustAccount } from 'reinvest-app-common/src/services/queries/getTrustAccount';
import { useUpdateCorporateAccount } from 'reinvest-app-common/src/services/queries/updateCorporateAccount';
import { useUpdateTrustAccount } from 'reinvest-app-common/src/services/queries/updateTrustAccount';
import { AccountType, Address, AddressInput } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Icon } from '../../../../../components/Icon';
import { Input } from '../../../../../components/Input';
import { FilterDialog } from '../../../../../components/Modals/ModalContent/FilterDialog';
import { SearchDialog } from '../../../../../components/Modals/ModalContent/PlacesModal';
import { UpdateSuccess } from '../../../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { Controller } from '../../../../../components/typography/Controller';
import { StyledText } from '../../../../../components/typography/StyledText';
import { palette } from '../../../../../constants/theme';
import { useCurrentAccount } from '../../../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import { useDialog } from '../../../../../providers/DialogProvider';
import { formValidationRules } from '../../../../../utils/formValidationRules';
import { AddressFields } from '../form-fields';
import { Identifiers } from '../identifiers';

const placeholders = {
  addressLine1: 'Street Address or P.O. Box',
  addressLine2: 'Unit No. (Optional)',
  zip: 'Zip Code',
  state: 'State',
  city: 'City',
};

const schema = formValidationRules.address;
const initialValues: AddressFields = { addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: 'USA' };
export const UpdateAddress: StepParams<AddressFields> = {
  identifier: Identifiers.UPDATE_ADDRESS,

  Component: ({ updateStoreFields }: StepComponentProps<AddressFields>) => {
    const { openDialog } = useDialog();
    const { activeAccount } = useCurrentAccount();
    const { refetch: refetchCorporate } = useGetCorporateAccount(getApiClient, {
      accountId: activeAccount.id ?? '',
      config: {
        enabled: !!activeAccount?.id && activeAccount.type === AccountType.Corporate,
      },
    });
    const { refetch: refetchTrust } = useGetTrustAccount(getApiClient, {
      accountId: activeAccount.id ?? '',
      config: {
        enabled: !!activeAccount?.id && activeAccount.type === AccountType.Trust,
      },
    });
    const { mutateAsync: updateCorporate, isLoading: isUpdatingCorporate } = useUpdateCorporateAccount(getApiClient);
    const { mutateAsync: updateTrust, isLoading: isUpdatingTrust } = useUpdateTrustAccount(getApiClient);
    const { handleSubmit, setValue, control, formState, watch, reset } = useForm<AddressFields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: initialValues,
    });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const navigation = useLogInNavigation();
    const isLoading = isUpdatingCorporate || isUpdatingTrust;

    const addressWatched = watch('addressLine1');
    const stateWatched = watch('state');

    const fillFieldsFromPrediction = useCallback(
      (address: Address) => {
        reset({ ...address, state: STATES_AS_SELECT_OPTION.find(({ value }) => value === address.state)?.label || '' });
      },
      [reset],
    );

    const showSearchDialog = useCallback(() => {
      return openDialog(
        <SearchDialog
          value={addressWatched || ''}
          placeholder={placeholders.addressLine1}
          fillDetailsCallback={fillFieldsFromPrediction}
        />,
        {},
        'sheet',
      );
    }, [addressWatched, fillFieldsFromPrediction, openDialog]);

    const showSuccessDialog = useCallback(() => {
      const header = <HeaderWithLogo onClose={() => navigation.goBack()} />;
      openDialog(<UpdateSuccess info="Address Updated Successfully" />, {
        showLogo: true,
        header,
        closeIcon: false,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation, openDialog]);

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

    const onSubmit: SubmitHandler<AddressFields> = async address => {
      const { addressLine1, addressLine2, city, zip, state } = address;

      await updateStoreFields({ ...address });

      if (addressLine1 && city && state && zip) {
        switch (activeAccount.type) {
          case AccountType.Corporate:
            await updateCorporate({
              accountId: activeAccount.id ?? '',
              input: { address: { addressLine1, addressLine2, state, city, zip, country: 'USA' } as AddressInput },
            });
            await refetchCorporate();
            break;
          case AccountType.Trust:
            await updateTrust({
              accountId: activeAccount.id ?? '',
              input: { address: { addressLine1, addressLine2, state, city, zip, country: 'USA' } as AddressInput },
            });
            await refetchTrust();
            break;
        }
        showSuccessDialog();
      }
    };

    const getRightComponent = useCallback(() => {
      return (
        <Icon
          onPress={showSearchDialog}
          color={palette.dark3}
          icon="search"
        />
      );
    }, [showSearchDialog]);

    return (
      <>
        <PaddedScrollView keyboardShouldPersistTaps="never">
          <Box pb="16">
            <StyledText>Enter your new address</StyledText>
          </Box>
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="addressLine1"
            inputProps={{ placeholder: placeholders.addressLine1, rightSection: getRightComponent() }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="addressLine2"
            inputProps={{ placeholder: placeholders.addressLine2 }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="city"
            inputProps={{ placeholder: placeholders.city }}
          />
          <Pressable onPress={() => openPicker()}>
            <Input
              placeholder="State"
              pointerEvents={'none'}
              editable={false}
              value={stateWatched || ''}
              rightSection={
                <Icon
                  onPress={() => openPicker()}
                  color={palette.dark3}
                  icon="arrowDown"
                />
              }
            ></Input>
          </Pressable>
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="zip"
            inputProps={{
              placeholder: placeholders.zip,
              maxLength: 5,
              keyboardType: 'numeric',
              style: {
                marginBottom: 0,
              },
            }}
          />
        </PaddedScrollView>
        <Box
          fw
          px="default"
        >
          <Button
            disabled={shouldButtonBeDisabled}
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Confirm
          </Button>
        </Box>
      </>
    );
  },
};
