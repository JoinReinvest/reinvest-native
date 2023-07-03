import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS, RESIDENCY_STATUS_VALUES } from 'reinvest-app-common/src/constants/residenty-status';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { useUpdateProfile } from 'reinvest-app-common/src/services/queries/updateProfile';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';
import z from 'zod';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { FormTitle } from '../../../../../components/Forms/FormTitle';
import { UpdateSuccess } from '../../../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { RadioButtonGroup } from '../../../../../components/RadioButtonGroup';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import Screens from '../../../../../navigation/screens';
import { useDialog } from '../../../../../providers/DialogProvider';
import { UpdateDomicileFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<UpdateDomicileFormFields, 'type'>;

const schema = z.object({
  type: z.enum(RESIDENCY_STATUS_VALUES),
});

export const StepUpdateDomicileType: StepParams<UpdateDomicileFormFields> = {
  identifier: Identifiers.UPDATE_DOMICILE_TYPE,

  Component: ({ storeFields: { type }, moveToNextStep, updateStoreFields }: StepComponentProps<UpdateDomicileFormFields>) => {
    const { handleSubmit, setValue, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: {
        type,
      },
    });
    const { mutateAsync: updateProfile, isLoading } = useUpdateProfile(getApiClient);
    const { refetch, isRefetching } = useGetUserProfile(getApiClient);
    const { openDialog } = useDialog();
    const { navigate, goBack } = useLogInNavigation();

    const watchedResidency = watch('type');

    const shouldButtonBeDisabled = !watchedResidency || isLoading || isRefetching;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      if (fields.type === DomicileType.Citizen) {
        await updateProfile({
          input: {
            domicile: {
              type: fields.type,
            },
          },
        });
        await refetch();
        openDialog(
          <UpdateSuccess
            info="Updated Residency Status successfully!"
            buttonLabel="Dashboard"
            onProceed={() => navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
          />,
          {
            showLogo: true,
            header: <HeaderWithLogo onClose={goBack} />,
          },
        );

        return;
      }

      await updateStoreFields({ type: fields.type });
      moveToNextStep();
    };

    return (
      <Box
        fw
        flex={1}
        mt="24"
      >
        <PaddedScrollView>
          <FormTitle
            headline="Residency Status"
            description="Please select your US residency status."
            informationMessage="REINVEST does not accept non-US residents at this time."
          />
          <RadioButtonGroup
            dark={false}
            selectedValue={watchedResidency || ''}
            onSelect={val => setValue('type', val as DomicileType)}
            options={RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS}
          />
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
            Update Residency Status
          </Button>
        </Box>
      </Box>
    );
  },
};
