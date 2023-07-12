import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { CALLING_CODES } from 'reinvest-app-common/src/constants/country-codes';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useSetPhoneNumber } from 'reinvest-app-common/src/services/queries/setPhoneNumber';
import z from 'zod';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { Controller } from '../../../../../components/typography/Controller';
import { StyledText } from '../../../../../components/typography/StyledText';
import { PHONE_MASK } from '../../../../../constants/masks';
import { formValidationRules } from '../../../../../utils/formValidationRules';
import { CALLING_CODE_OPTIONS } from '../../../../Onboarding/flow-steps/stepPhoneNumber';
import { UpdatePhoneNumberFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { styles } from '../styles';

type Fields = Pick<UpdatePhoneNumberFormFields, 'phoneNumber' | 'countryCode'>;

const schema = z.object({
  phoneNumber: formValidationRules.phone,
  countryCode: z.enum(CALLING_CODES),
});

export const StepUpdatePhoneNumber: StepParams<UpdatePhoneNumberFormFields> = {
  identifier: Identifiers.UPDATE_PHONE_NUMBER,

  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<UpdatePhoneNumberFormFields>) => {
    const { formState, handleSubmit, control } = useForm<Fields>({
      mode: 'onBlur',
      resolver: zodResolver(schema),
      defaultValues: {
        phoneNumber: storeFields.phoneNumber,
        countryCode: storeFields.countryCode || CALLING_CODES[0],
      },
    });
    const { mutateAsync: setPhoneNumberMutate, isLoading } = useSetPhoneNumber(getApiClient);

    const shouldButtonBeDisabled = !formState.isValid || isLoading;

    const onSubmit = async (fields: Fields) => {
      if (!fields.countryCode || !fields.phoneNumber) {
        return;
      }

      await setPhoneNumberMutate({
        phoneNumber: fields.phoneNumber.split('-').join(''),
        countryCode: fields.countryCode,
      });
      await updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <Box
        fw
        flex={1}
      >
        <PaddedScrollView>
          <Box mb="16">
            <StyledText>Add a new phone number</StyledText>
          </Box>
          <Row>
            <View style={styles.callingCodeDropdown}>
              <Controller
                type="dropdown"
                onSubmit={handleSubmit(onSubmit)}
                control={control}
                fieldName="countryCode"
                dropdownProps={{
                  dark: false,
                  prefix: '+',
                  data: CALLING_CODE_OPTIONS,
                  predefined: true,
                }}
              />
            </View>
            <View style={styles.phoneInputWrapper}>
              <Controller
                onSubmit={handleSubmit(onSubmit)}
                control={control}
                fieldName="phoneNumber"
                inputProps={{
                  dark: false,
                  mask: PHONE_MASK,
                  maskedPlaceholder: '000-000-0000',
                  predefined: true,
                  style: { textAlign: 'left' },
                  keyboardType: 'numeric',
                  maxLength: 12,
                }}
              />
            </View>
          </Row>
        </PaddedScrollView>
        <Box px="default">
          <Button
            disabled={shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    );
  },
};
