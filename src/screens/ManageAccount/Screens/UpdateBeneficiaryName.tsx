import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { useGetBeneficiaryAccount } from 'reinvest-app-common/src/services/queries/getBeneficiaryAccount';
import z from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { MainWrapper } from '../../../components/MainWrapper';
import { UpdateSuccess } from '../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { Controller } from '../../../components/typography/Controller';
import { StyledText } from '../../../components/typography/StyledText';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { useDialog } from '../../../providers/DialogProvider';

interface Fields {
  firstName: string;
  lastName: string;
}

const schema = z.object({
  firstName: formValidationRules.firstName,
  lastName: formValidationRules.lastName,
});

const UpdateBeneficiaryName = () => {
  const { activeAccount } = useCurrentAccount();
  const { data: beneficiaryAccount, isLoading, status } = useGetBeneficiaryAccount(getApiClient, { accountId: activeAccount.id ?? '' });
  const { openDialog } = useDialog();
  const { goBack, navigate } = useLogInNavigation();
  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
    control,
    reset,
  } = useForm<Fields>({
    mode: 'onBlur',
    defaultValues: {
      firstName: beneficiaryAccount?.details?.name?.firstName ?? '',
      lastName: beneficiaryAccount?.details?.name?.lastName ?? '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Fields> = () => {
    openDialog(
      <UpdateSuccess
        info="Beneficiary name is updated"
        buttonLabel="Dashboard"
        onProceed={() => navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
      />,

      { showLogo: true, header: <HeaderWithLogo onClose={goBack} /> },
    );
  };

  useEffect(() => {
    if (status === 'success') {
      reset({
        firstName: beneficiaryAccount?.details?.name?.firstName ?? '',
        lastName: beneficiaryAccount?.details?.name?.lastName ?? '',
      });
    }
  }, [beneficiaryAccount?.details?.name?.firstName, beneficiaryAccount?.details?.name?.lastName, reset, status]);

  const shouldButtonBeDisabled = !isValid || isSubmitting;

  return (
    <MainWrapper
      isLoading={isLoading}
      noPadding
    >
      <PaddedScrollView>
        <Row mb="16">
          <StyledText variant="paragraphLarge">Edit beneficiary’s name</StyledText>
        </Row>
        <Controller
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          fieldName="firstName"
          inputProps={{ placeholder: 'First Name' }}
        />
        <Controller
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          fieldName="lastName"
          inputProps={{ placeholder: 'First Name' }}
        />
      </PaddedScrollView>
      <Box
        fw
        px="default"
      >
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={shouldButtonBeDisabled}
        >
          Confirm
        </Button>
      </Box>
    </MainWrapper>
  );
};

export default UpdateBeneficiaryName;
