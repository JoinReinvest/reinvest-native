import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { CALLING_CODES, UNIQUE_COUNTRIES_CALLING_CODES } from 'reinvest-app-common/src/constants/country-codes';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useSetPhoneNumber } from 'reinvest-app-common/src/services/queries/setPhoneNumber';
import { SelectOptions } from 'reinvest-app-common/src/types/select-option';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormMessage } from '../../../components/Forms/FormMessage';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { StyledText } from '../../../components/typography/StyledText';
import { PHONE_MASK } from '../../../constants/masks';
import { onBoardingDisclaimers } from '../../../constants/strings';
import { useDialog } from '../../../providers/DialogProvider';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

interface Fields {
  countryCode: string;
  number: string;
}

const schema = z.object({
  countryCode: z.enum(CALLING_CODES),
  number: formValidationRules.phone,
});

const OPTIONS: SelectOptions = UNIQUE_COUNTRIES_CALLING_CODES.map(({ callingCode }: { callingCode: string }) => ({
  label: callingCode,
  value: callingCode,
}));

export const StepPhoneNumber: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PHONE_NUMBER,

  willBePartOfTheFlow(fields) {
    return !fields.accountType && !fields.isCompletedProfile;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName];

    return allRequiredFieldsExists(requiredFields) && !fields.isCompletedProfile && !fields._isPhoneCompleted;
  },

  Component: ({ storeFields: { phone }, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const { control, handleSubmit } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: {
        number: phone?.number || '',
        countryCode: phone?.countryCode || CALLING_CODES[0],
      },
    });
    const { error: phoneNumberError, isLoading, mutate: setPhoneNumberMutate, isSuccess } = useSetPhoneNumber(getApiClient);

    const { openDialog } = useDialog();

    const shouldButtonBeDisabled = isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      fields.number = fields.number.replaceAll('-', '');
      fields.countryCode = OPTIONS.find(callingCode => callingCode.label === fields.countryCode)?.value ?? '';
      await setPhoneNumberMutate({ countryCode: fields.countryCode, phoneNumber: fields.number });
      await updateStoreFields({ phone: fields });
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    const showDisclaimer = () => {
      openDialog(
        <FormModalDisclaimer
          dark
          headline="We need your phone number"
          content={onBoardingDisclaimers.requiredWhy}
        />,
      );
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Enter your phone number"
            description="You are consenting to be contacted at this phone number for the purpose of receiving a verification code from Reinvest. Wireless and text message fees from your carrier may apply. See Privacy Policy below."
          />
          {phoneNumberError && (
            <FormMessage
              variant="error"
              message={phoneNumberError?.response?.errors[0]?.message || ''}
            />
          )}
          <View style={styles.phoneRow}>
            <View style={styles.callingCodeDropdown}>
              <Controller
                type="dropdown"
                onSubmit={handleSubmit(onSubmit)}
                control={control}
                fieldName="countryCode"
                dropdownProps={{
                  prefix: '+',
                  dark: true,
                  data: OPTIONS,
                  predefined: true,
                }}
              />
            </View>
            <View style={styles.phoneInputWrapper}>
              <Controller
                onSubmit={handleSubmit(onSubmit)}
                control={control}
                fieldName="number"
                inputProps={{
                  dark: true,
                  mask: PHONE_MASK,
                  maskedPlaceholder: '000-000-0000',
                  keyboardType: 'numeric',
                  maxLength: 12,
                }}
              />
            </View>
          </View>
          <Box
            style={styles.row}
            mt="4"
          >
            <StyledText
              color="frostGreen"
              variant="link"
              onPress={showDisclaimer}
            >
              Required. Why?
            </StyledText>
          </Box>
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
