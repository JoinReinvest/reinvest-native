import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  StepComponentProps,
  StepParams,
} from 'reinvest-app-common/src/services/form-flow/interfaces';
import {styles} from './styles';
import {Button} from '@components/Button';
import {FormTitle} from '@components/Forms/FormTitle';
import {OnboardingFormFields} from '../types';
import {Identifiers} from '../identifiers';
import {z} from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useOnboardingFormFlow} from '.';
import {ProgressBar} from '@src/components/ProgressBar';
import {StyledText} from '@src/components/typography/StyledText';
import {palette} from '@src/constants/theme';
import {Box} from '@src/components/Containers/Box/Box';
import {
  CALLING_CODES,
  UNIQUE_COUNTRIES_CALLING_CODES,
} from '@src/constants/country-codes';
import {SelectOptions} from 'reinvest-app-common/src/types/select-option';
import {Controller} from '@src/components/typography/Controller';
import {PHONE_MASK} from '@src/constants/masks';
import {formValidationRules} from '@src/utils/formValidationRules';
import {useDialog} from '@providers/DialogProvider';
import {FormModalDisclaimer} from '@components/Modals/ModalContent/FormModalDisclaimer';
import {onBoardingDisclaimers} from '@constants/strings';

interface Fields {
  countryCode: string;
  phone: string;
}

const schema = z.object({
  countryCode: z.enum(CALLING_CODES),
  phone: formValidationRules.phone,
});

const OPTIONS: SelectOptions = UNIQUE_COUNTRIES_CALLING_CODES.map(
  ({callingCode}: {callingCode: string}) => ({
    label: `+${callingCode}`,
    value: callingCode,
  }),
);

export const StepPhoneNumber: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PHONE_NUMBER,

  Component: ({
    storeFields,
    updateStoreFields,
    moveToNextStep,
  }: StepComponentProps<OnboardingFormFields>) => {
    const phoneNumber = storeFields.phoneNumber;
    const {countryCode, phone} = useMemo(
      () => getPhoneNumberAndCountryCode(phoneNumber),
      [phoneNumber],
    );
    const {progressPercentage} = useOnboardingFormFlow();
    const {formState, control, handleSubmit, setValue} = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: {
        countryCode,
        phone,
      },
    });

    const [selectedCountryCallingCode, setSelectedCountryCallingCode] =
      useState(countryCode ? countryCode : OPTIONS[0].value);

    const {openDialog} = useDialog();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      fields.phone = fields.phone.replaceAll('-', '');
      const phoneNumberFromFields = `${fields.countryCode}${fields.phone}`;
      await updateStoreFields({phoneNumber: phoneNumberFromFields});
      moveToNextStep();
      //TODO: send authentication code via SMS
    };

    useEffect(() => {
      setValue('countryCode', selectedCountryCallingCode);
    }, [selectedCountryCallingCode, setValue]);

    const showDisclaimer = () => {
      openDialog(
        <FormModalDisclaimer
          headline={'We need your phone number'}
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
                fieldName={'countryCode'}
                dropdownProps={{
                  prefix: '+',
                  dark: true,
                  data: OPTIONS,
                  onSelect: selected => {
                    setSelectedCountryCallingCode(selected.value);
                  },
                }}
              />
            </View>
            <View style={styles.phoneInputWrapper}>
              <Controller
                onSubmit={handleSubmit(onSubmit)}
                control={control}
                fieldName={'phone'}
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
          <Box style={styles.row} mt="4">
            <StyledText
              color={palette.frostGreen}
              variant="link"
              onPress={showDisclaimer}>
              Required. Why?
            </StyledText>
          </Box>
        </ScrollView>
        <View key={'buttons_section'} style={styles.buttonsSection}>
          <Button
            disabled={shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}>
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
      const countryCode = phoneNumber.replace(phone, '');

      return {
        countryCode,
        phone: phone.match(/.{1,3}/g)?.join('-'), // add mask xxx-xxx-xxx
      };
    }
  }

  return {countryCode: '', phone: ''};
};
