import { Button } from '@components/Button';
import { FormTitle } from '@components/Forms/FormTitle';
import { FormModalDisclaimer } from '@components/Modals/ModalContent/FormModalDisclaimer';
import { onBoardingDisclaimers } from '@constants/strings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDialog } from '@providers/DialogProvider';
import { Box } from '@src/components/Containers/Box/Box';
import { ProgressBar } from '@src/components/ProgressBar';
import { Controller } from '@src/components/typography/Controller';
import { StyledText } from '@src/components/typography/StyledText';
import { CALLING_CODES, UNIQUE_COUNTRIES_CALLING_CODES } from '@src/constants/country-codes';
import { PHONE_MASK } from '@src/constants/masks';
import { palette } from '@src/constants/theme';
import { formValidationRules } from '@src/utils/formValidationRules';
import React, { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { SelectOptions } from 'reinvest-app-common/src/types/select-option';
import { z } from 'zod';

import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

interface Fields {
  countryCode: string;
  phone: string;
}

const schema = z.object({
  countryCode: z.enum(CALLING_CODES),
  phone: formValidationRules.phone,
});

const OPTIONS: SelectOptions = UNIQUE_COUNTRIES_CALLING_CODES.map(({ callingCode }: { callingCode: string }) => ({
  label: callingCode,
  value: callingCode.replace('+', ''),
}));

export const StepPhoneNumber: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PHONE_NUMBER,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const phoneNumber = storeFields.phoneNumber;
    const { countryCode, phone } = useMemo(() => getPhoneNumberAndCountryCode(phoneNumber), [phoneNumber]);
    const { progressPercentage } = useOnboardingFormFlow();
    const { formState, control, handleSubmit } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: {
        countryCode,
        phone,
      },
    });

    const { openDialog } = useDialog();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      fields.phone = fields.phone.replaceAll('-', '');
      fields.countryCode = OPTIONS.find(callingCode => callingCode.label === fields.countryCode)?.value ?? '';
      const phoneNumberFromFields = `${fields.countryCode}${fields.phone}`;
      await updateStoreFields({ phoneNumber: phoneNumberFromFields });
      moveToNextStep();
      //TODO: send authentication code via SMS
    };

    const showDisclaimer = () => {
      openDialog(
        <FormModalDisclaimer
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
        <ScrollView>
          <FormTitle
            dark
            headline="Enter your phone number"
            description="We’ll text you a confirmation code within 10 minutes."
          />
          <View style={styles.phoneRow}>
            <View style={styles.callingCodeDropdown}>
              <Controller
                select
                onSubmit={handleSubmit(onSubmit)}
                control={control}
                fieldName="countryCode"
                dropdownProps={{
                  dark: true,
                  data: OPTIONS,
                }}
              />
            </View>
            <View style={styles.phoneInputWrapper}>
              <Controller
                onSubmit={handleSubmit(onSubmit)}
                control={control}
                fieldName="phone"
                inputProps={{
                  dark: true,
                  mask: PHONE_MASK,
                  placeholder: '000-000-000',
                  keyboardType: 'numeric',
                  maxLength: 11,
                }}
              />
            </View>
          </View>
          <Box
            style={styles.row}
            mt="4"
          >
            <StyledText
              color={palette.frostGreen}
              variant="link"
              onPress={showDisclaimer}
            >
              Required. Why?
            </StyledText>
          </Box>
        </ScrollView>
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

const getPhoneNumberAndCountryCode = (phoneNumber: string | undefined) => {
  if (phoneNumber) {
    const phoneNumberDigits = /\d{10}$/.exec(phoneNumber);

    if (phoneNumberDigits) {
      const phone = phoneNumber.slice(-9);
      const countryCode = `+${phoneNumber.replace(phone, '')}`;

      return {
        countryCode,
        phone: phone.match(/.{1,3}/g)?.join('-'), // add mask xxx-xxx-xxx
      };
    }
  }

  return { countryCode: OPTIONS[0]?.label ?? '', phone: '' };
};
