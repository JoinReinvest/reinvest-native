import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { INDUESTRIES_AS_OPTIONS } from 'reinvest-app-common/src/constants/industries';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetIndividualAccount } from 'reinvest-app-common/src/services/queries/getIndividualAccount';
import { useUpdateIndividualAccount } from 'reinvest-app-common/src/services/queries/updateIndividualAccount';
import { EmployerInput, EmploymentStatus } from 'reinvest-app-common/src/types/graphql';
import z from 'zod';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { FormTitle } from '../../../../../components/Forms/FormTitle';
import { UpdateSuccess } from '../../../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { Controller } from '../../../../../components/typography/Controller';
import { INDUSTRIES_LABELS } from '../../../../../constants/industries';
import { useCurrentAccount } from '../../../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import Screens from '../../../../../navigation/screens';
import { useDialog } from '../../../../../providers/DialogProvider';
import { formValidationRules } from '../../../../../utils/formValidationRules';
import { UpdateEmploymentDetailsFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<UpdateEmploymentDetailsFormFields, 'employer'>;

const schema = z.object({
  employer: z.object({
    nameOfEmployer: formValidationRules.employerName,
    title: formValidationRules.occupation,
    industry: z.enum(INDUSTRIES_LABELS),
  }),
});

export const StepUpdateEmploymentDetails: StepParams<UpdateEmploymentDetailsFormFields> = {
  identifier: Identifiers.UPDATE_EMPLOYMENT_DETAILS,

  doesMeetConditionFields({ employmentStatus }) {
    return !!(employmentStatus && employmentStatus === EmploymentStatus.Employed);
  },

  Component: ({ storeFields: { employmentStatus } }: StepComponentProps<UpdateEmploymentDetailsFormFields>) => {
    const { activeAccount } = useCurrentAccount();
    const { mutateAsync: updateAccount, isLoading: isUpdating } = useUpdateIndividualAccount(getApiClient);
    const { refetch, isRefetching } = useGetIndividualAccount(getApiClient);
    const { openDialog } = useDialog();
    const { navigate, goBack } = useLogInNavigation();
    const isLoading = isRefetching || isUpdating;

    const { handleSubmit, control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: {
        employer: {
          industry: '',
          nameOfEmployer: '',
          title: '',
        },
      },
    });

    const onSubmit: SubmitHandler<Fields> = async ({ employer }) => {
      if (!employer || !employmentStatus) {
        return;
      }

      const employerInput: EmployerInput = {
        nameOfEmployer: employer.nameOfEmployer ?? '',
        title: employer.title ?? '',
        industry: employer.industry ?? '',
      };

      await updateAccount({ accountId: activeAccount.id ?? '', input: { employmentStatus: { status: employmentStatus }, employer: employerInput } });
      await refetch();

      openDialog(
        <UpdateSuccess
          info="Employment Details Updated Successfully!"
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
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="employer.nameOfEmployer"
            inputProps={{ placeholder: 'Name of Employer' }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="employer.title"
            inputProps={{ placeholder: 'Title' }}
          />
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="employer.industry"
            dropdownProps={{
              data: INDUESTRIES_AS_OPTIONS,
              placeholder: 'Industry',
            }}
          />
        </PaddedScrollView>
        <Box
          fw
          px="default"
        >
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Update Employment Details
          </Button>
        </Box>
      </>
    );
  },
};
