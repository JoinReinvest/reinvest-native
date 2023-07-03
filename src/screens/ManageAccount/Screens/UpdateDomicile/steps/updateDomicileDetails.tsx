import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Pressable } from 'react-native';
import { COUNTRIES } from 'reinvest-app-common/src/constants/countries';
import { VISAS_AS_OPTIONS } from 'reinvest-app-common/src/constants/visas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { useUpdateProfile } from 'reinvest-app-common/src/services/queries/updateProfile';
import { DomicileInput, DomicileType, GreenCardInput, VisaInput } from 'reinvest-app-common/src/types/graphql';
import z from 'zod';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Dropdown } from '../../../../../components/Dropdown';
import { FormTitle } from '../../../../../components/Forms/FormTitle';
import { Icon } from '../../../../../components/Icon';
import { Input } from '../../../../../components/Input';
import { FilterDialog } from '../../../../../components/Modals/ModalContent/FilterDialog';
import { UpdateSuccess } from '../../../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { palette } from '../../../../../constants/theme';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import Screens from '../../../../../navigation/screens';
import { useDialog } from '../../../../../providers/DialogProvider';
import { VisaType } from '../../../../../types/visaType';
import { formValidationRules } from '../../../../../utils/formValidationRules';
import { UpdateDomicileFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Exclude<UpdateDomicileFormFields, 'type'>;

const getSchema = (domicileType: DomicileType) => {
  if (domicileType === DomicileType.Visa) {
    return z.object({
      birthCountry: formValidationRules.birthCountry,
      citizenshipCountry: formValidationRules.citizenshipCountry,
      visaType: formValidationRules.visaType.optional(),
    });
  }

  return z.object({
    birthCountry: formValidationRules.birthCountry,
    citizenshipCountry: formValidationRules.citizenshipCountry,
  });
};

export const StepUpdateDomicileDetails: StepParams<UpdateDomicileFormFields> = {
  identifier: Identifiers.UPDATE_DOMICILE_TYPE,

  Component: ({ storeFields }: StepComponentProps<UpdateDomicileFormFields>) => {
    const { handleSubmit, setValue, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(getSchema(storeFields.type as DomicileType)),
      defaultValues: {
        ...storeFields,
      },
    });

    const { mutateAsync: updateProfile, isLoading } = useUpdateProfile(getApiClient);
    const { refetch, isRefetching } = useGetUserProfile(getApiClient);
    const { openDialog } = useDialog();
    const { navigate, goBack } = useLogInNavigation();

    const birthCountry = watch('birthCountry');
    const citizenshipCountry = watch('citizenshipCountry');
    const visa = watch('visaType');

    const shouldButtonBeDisabled = !birthCountry || !citizenshipCountry || (storeFields.type === DomicileType.Visa && !visa) || isLoading || isRefetching;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      const domicile: DomicileInput = {
        type: storeFields.type as DomicileType,
        forGreenCard:
          storeFields.type === DomicileType.GreenCard
            ? ({ birthCountry: fields.birthCountry, citizenshipCountry: fields.citizenshipCountry } as GreenCardInput)
            : null,
        forVisa:
          storeFields.type === DomicileType.Visa
            ? ({ birthCountry: fields.birthCountry, citizenshipCountry: fields.citizenshipCountry, visaType: fields.visaType } as VisaInput)
            : null,
      };

      await updateProfile({
        input: {
          domicile,
        },
      });
      await refetch();
      openDialog(
        <UpdateSuccess
          info="Updated Residency Successfully!"
          buttonLabel="Dashboard"
          onProceed={() => navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
        />,
        {
          showLogo: true,
          header: <HeaderWithLogo onClose={goBack} />,
        },
      );
    };

    const openPicker = (variant: keyof Fields) => {
      openDialog(
        <FilterDialog
          options={COUNTRIES}
          fillDetailsCallback={value => setValue(variant, value)}
          value={birthCountry ?? ''}
        />,
        {},
        'sheet',
      );
    };

    return (
      <Box
        fw
        flex={1}
        mt="24"
      >
        <PaddedScrollView dark>
          <FormTitle
            headline="Please enter your US Visa details."
            informationMessage="US Residents Only"
          />
          <Pressable onPress={() => openPicker('citizenshipCountry')}>
            <Input
              placeholder="Citizenship Country"
              pointerEvents={'none'}
              editable={false}
              value={citizenshipCountry ?? ''}
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
              editable={false}
              value={birthCountry ?? ''}
              rightSection={
                <Icon
                  onPress={() => openPicker('birthCountry')}
                  color={palette.pureWhite}
                  icon="arrowDown"
                />
              }
            ></Input>
          </Pressable>
          {storeFields.type === DomicileType.Visa && (
            <Dropdown
              value={visa ?? ''}
              placeholder="Visa Type"
              data={VISAS_AS_OPTIONS}
              onSelect={option => setValue('visaType', option.value as VisaType)}
            />
          )}
        </PaddedScrollView>
        <Box
          fw
          px="default"
        >
          <Button
            isLoading={isLoading || isRefetching}
            disabled={shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Update Residency
          </Button>
        </Box>
      </Box>
    );
  },
};
