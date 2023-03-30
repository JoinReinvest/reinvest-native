import { Button } from '@components/Button';
import { StatusCircle } from '@components/StatusCircle';
import { RegisterFormFields } from '@screens/SignUp/types';
import { allRequiredFieldsExists } from '@utils/formValidator';
import React from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';

import { Identifiers } from '../identifiers';
import { styles } from './styles';

export const StepReferralCodeApplied: StepParams<RegisterFormFields> = {
  identifier: Identifiers.REFERRAL_CODE_VERIFICATION,
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.referralCode];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ moveToNextStep }: StepComponentProps<RegisterFormFields>) => {
    return (
      <View style={[styles.wrapper, styles.fw]}>
        <StatusCircle title="Referral code applied" />
        <Button onPress={moveToNextStep}>Continue</Button>
      </View>
    );
  },
};
