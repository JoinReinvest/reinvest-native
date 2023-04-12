import React from 'react';
import { View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';

import { Button } from '../../../components/Button';
import { StatusCircle } from '../../../components/StatusCircle';
import { Identifiers } from '../identifiers';
import { RegisterFormFields } from '../types';
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
      <View style={[styles.wrapper, styles.fw, styles.flex]}>
        <StatusCircle title="Referral code applied" />
        <Button onPress={moveToNextStep}>Continue</Button>
      </View>
    );
  },
};
