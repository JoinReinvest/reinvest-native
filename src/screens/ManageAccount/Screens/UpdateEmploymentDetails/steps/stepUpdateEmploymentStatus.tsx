import React, { useState } from 'react';
import { EMPLOYMENT_STATUSES } from 'reinvest-app-common/src/constants/employment_statuses';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetIndividualAccount } from 'reinvest-app-common/src/services/queries/getIndividualAccount';
import { useUpdateIndividualAccount } from 'reinvest-app-common/src/services/queries/updateIndividualAccount';
import { EmploymentStatus } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Card } from '../../../../../components/Card';
import { Box } from '../../../../../components/Containers/Box/Box';
import { FormTitle } from '../../../../../components/Forms/FormTitle';
import { UpdateSuccess } from '../../../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { useCurrentAccount } from '../../../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import Screens from '../../../../../navigation/screens';
import { useDialog } from '../../../../../providers/DialogProvider';
import { UpdateEmploymentDetailsFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepUpdateEmploymentStatus: StepParams<UpdateEmploymentDetailsFormFields> = {
  identifier: Identifiers.UPDATE_EMPLOYMENT_STATUS,

  Component: ({ storeFields: { employmentStatus }, moveToNextStep, updateStoreFields }: StepComponentProps<UpdateEmploymentDetailsFormFields>) => {
    const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState<EmploymentStatus | null>(employmentStatus ?? null);
    const { activeAccount } = useCurrentAccount();
    const { mutateAsync: updateAccount, isLoading: isUpdating } = useUpdateIndividualAccount(getApiClient);
    const { refetch, isRefetching } = useGetIndividualAccount(getApiClient);
    const { openDialog } = useDialog();
    const { navigate, goBack } = useLogInNavigation();

    const isLoading = isRefetching || isUpdating;

    const handleSubmit = async () => {
      if (!selectedEmploymentStatus) {
        return;
      }

      if (selectedEmploymentStatus === EmploymentStatus.Employed) {
        await updateStoreFields({ employmentStatus: selectedEmploymentStatus });
        moveToNextStep();

        return;
      }

      await updateAccount({
        accountId: activeAccount.id ?? '',
        input: {
          employmentStatus: { status: selectedEmploymentStatus },
        },
      });
      await refetch();

      openDialog(
        <UpdateSuccess
          info="Employment Details updated successfully"
          buttonLabel="Dashboard"
          onProceed={() => navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
        />,
        { header: <HeaderWithLogo onClose={goBack} />, showLogo: true },
      );
    };

    return (
      <>
        <PaddedScrollView dark>
          <FormTitle headline="Where are you employed?" />
          <Box style={{ rowGap: 16 }}>
            {EMPLOYMENT_STATUSES.map(({ title, value }) => (
              <Card
                dark={false}
                selected={value === selectedEmploymentStatus}
                key={value}
                id={value}
                value={value as EmploymentStatus}
                title={title}
                onCardPress={setSelectedEmploymentStatus}
              />
            ))}
          </Box>
        </PaddedScrollView>
        <Box
          fw
          px="default"
        >
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            onPress={handleSubmit}
          >
            {selectedEmploymentStatus === EmploymentStatus.Employed ? 'Continue' : 'Confirm'}
          </Button>
        </Box>
      </>
    );
  },
};
