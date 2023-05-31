import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import z from 'zod';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { Icon } from '../../../../../components/Icon';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { Controller } from '../../../../../components/typography/Controller';
import { StyledText } from '../../../../../components/typography/StyledText';
import { palette } from '../../../../../constants/theme';
import { UpdateNameFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<UpdateNameFormFields, 'firstName' | 'middleName' | 'lastName'>;

const schema = z.object({
  firstName: formValidationRules.firstName,
  middleName: formValidationRules.middleName,
  lastName: formValidationRules.lastName,
});

export const StepUpdateName: StepParams<UpdateNameFormFields> = {
  identifier: Identifiers.UPDATE_NAME,

  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<UpdateNameFormFields>) => {
    const { handleSubmit, control, formState } = useForm({
      mode: 'onBlur',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <Box
        fw
        mt="24"
        flex={1}
      >
        <PaddedScrollView>
          <Box mb="16">
            <StyledText>Update your name</StyledText>
            <Row
              mt="16"
              style={{ columnGap: 4 }}
              alignItems="center"
            >
              <Icon
                size="s"
                icon="info"
                color={palette.dark2}
              />
              <StyledText
                color="dark2"
                variant="paragraphSmall"
              >
                Updating your name will prompt you to upload a new ID card
              </StyledText>
            </Row>
          </Box>
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="firstName"
            inputProps={{ placeholder: 'First Name' }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="middleName"
            inputProps={{ placeholder: 'Middle Name (Optional)' }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="lastName"
            inputProps={{ placeholder: 'Last Name' }}
          />
        </PaddedScrollView>
        <Box
          fw
          px="default"
        >
          <Button
            onPress={moveToNextStep}
            disabled={shouldButtonBeDisabled}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    );
  },
};
