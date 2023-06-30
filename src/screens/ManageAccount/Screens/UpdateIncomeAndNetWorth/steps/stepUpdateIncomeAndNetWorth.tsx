import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NET_WORTHS_AS_OPTIONS } from 'reinvest-app-common/src/constants/net-worths';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useGetIndividualAccount } from 'reinvest-app-common/src/services/queries/getIndividualAccount';
import { useUpdateIndividualAccount } from 'reinvest-app-common/src/services/queries/updateIndividualAccount';
import z from 'zod';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { FormTitle } from '../../../../../components/Forms/FormTitle';
import { UpdateSuccess } from '../../../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { Controller } from '../../../../../components/typography/Controller';
import { useCurrentAccount } from '../../../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import Screens from '../../../../../navigation/screens';
import { useDialog } from '../../../../../providers/DialogProvider';
import { formValidationRules } from '../../../../../utils/formValidationRules';
import { UpdateIncomeAndNetWorthFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<UpdateIncomeAndNetWorthFormFields, 'updatedNetIncome' | 'updatedNetWorth'>;

const schema = z.object({
  updatedNetIncome: formValidationRules.netIncome,
  updatedNetWorth: formValidationRules.netWorth,
});

export const StepUpdateNetWorthAndNetIncome: StepParams<UpdateIncomeAndNetWorthFormFields> = {
  identifier: Identifiers.UPDATE_INCOME_AND_NET_WORTH,

  Component: ({ storeFields }: StepComponentProps<UpdateIncomeAndNetWorthFormFields>) => {
    const { activeAccount } = useCurrentAccount();
    const { mutateAsync: updateAccount, isLoading: isUpdating } = useUpdateIndividualAccount(getApiClient);
    const { refetch: refetchIndividualAccount, isRefetching } = useGetIndividualAccount(getApiClient);
    const { openDialog } = useDialog();
    const { navigate, goBack } = useLogInNavigation();
    const {
      handleSubmit,
      control,
      formState: { isSubmitting },
    } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: {
        updatedNetIncome: storeFields.originalNetIncome,
        updatedNetWorth: storeFields.originalNetWorth,
      },
    });

    const isLoading = isSubmitting || isUpdating || isRefetching;

    const onSubmit: SubmitHandler<Fields> = async ({ updatedNetIncome, updatedNetWorth }) => {
      if (!updatedNetIncome || !updatedNetWorth) {
        return;
      }

      await updateAccount({
        accountId: activeAccount.id ?? '',
        input: {
          netIncome: {
            range: updatedNetIncome,
          },
          netWorth: {
            range: updatedNetWorth,
          },
        },
      });
      await refetchIndividualAccount();
      openDialog(
        <UpdateSuccess
          info="Net worth and net income updated successfully"
          buttonLabel="Dashboard"
          onProceed={() => navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
        />,
        { showLogo: true, header: <HeaderWithLogo onClose={goBack} /> },
      );
    };

    return (
      <>
        <PaddedScrollView dark>
          <FormTitle headline="Update your net worth and income" />
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="updatedNetIncome"
            dropdownProps={{
              placeholder: 'Net Income',
              data: NET_WORTHS_AS_OPTIONS,
            }}
          />
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="updatedNetWorth"
            dropdownProps={{
              placeholder: 'Net Worth',
              data: NET_WORTHS_AS_OPTIONS,
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
            Continue
          </Button>
        </Box>
      </>
    );
  },
};
