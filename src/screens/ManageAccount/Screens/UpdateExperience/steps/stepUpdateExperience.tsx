import React, { useState } from 'react';
import { EXPERIENCES_AS_OPTIONS } from 'reinvest-app-common/src/constants/experiences';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { useUpdateProfile } from 'reinvest-app-common/src/services/queries/updateProfile';
import { Experience } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Card } from '../../../../../components/Card';
import { Box } from '../../../../../components/Containers/Box/Box';
import { FormTitle } from '../../../../../components/Forms/FormTitle';
import { UpdateSuccess } from '../../../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import Screens from '../../../../../navigation/screens';
import { useDialog } from '../../../../../providers/DialogProvider';
import { UpdateExperienceFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepUpdateExperience: StepParams<UpdateExperienceFormFields> = {
  identifier: Identifiers.ORIGINAL_EXPERIENCE,

  Component: ({ storeFields: { originalExperience } }: StepComponentProps<UpdateExperienceFormFields>) => {
    const [selectedExperience, setSelectedExperience] = useState<Experience | null>(originalExperience);
    const [isUpdating, setIsUpdating] = useState(false);
    const { refetch } = useGetUserProfile(getApiClient);
    const { mutateAsync: updateProfile } = useUpdateProfile(getApiClient);
    const { openDialog } = useDialog();
    const { navigate, goBack } = useLogInNavigation();

    const handleUpdate = async () => {
      if (!selectedExperience) {
        return;
      }

      setIsUpdating(true);
      await updateProfile({ input: { investingExperience: { experience: selectedExperience } } });
      await refetch();

      openDialog(
        <UpdateSuccess
          buttonLabel="Dashboard"
          onProceed={() => navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
          info="Experience Updated Successfully!"
        />,
        {
          showLogo: true,
          header: <HeaderWithLogo onClose={goBack} />,
        },
      );
      setIsUpdating(false);
    };

    return (
      <Box
        fw
        flex={1}
        mt="24"
        px="default"
      >
        <FormTitle headline="Update your Experience" />
        <Box
          flex={1}
          style={{ rowGap: 16 }}
        >
          {EXPERIENCES_AS_OPTIONS.map(({ title, value }) => (
            <Card
              dark={false}
              selected={value === selectedExperience}
              key={value}
              id={title}
              title={title}
              value={value as Experience}
              onCardPress={setSelectedExperience}
            />
          ))}
        </Box>
        <Box fw>
          <Button
            isLoading={isUpdating}
            disabled={isUpdating}
            onPress={handleUpdate}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    );
  },
};
