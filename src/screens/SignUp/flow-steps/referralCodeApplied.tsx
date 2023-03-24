import React from 'react';
import {
  StepComponentProps,
  StepParams,
} from 'reinvest-app-common/src/services/form-flow/interfaces';

import {Identifiers} from '../identifiers';
import {RegisterFormFields} from '@screens/SignUp/types';
import {Button} from '@components/Button';
import {View} from 'react-native';
import {StatusCircle} from '@components/StatusCircle';
import {styles} from './styles';
import {allRequiredFieldsExists} from '@utils/formValidator';

export const StepReferralCodeApplied: StepParams<RegisterFormFields> = {
  identifier: Identifiers.REFERRAL_CODE_VERIFICATION,
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.referralCode];
    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({moveToNextStep}: StepComponentProps<RegisterFormFields>) => {
    return (
      <View style={styles.wrapper}>
        <StatusCircle title="Referral code applied" />
        <Button onPress={moveToNextStep}>Continue</Button>
      </View>
    );
  },
};
