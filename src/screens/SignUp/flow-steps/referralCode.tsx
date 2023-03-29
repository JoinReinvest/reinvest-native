import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import zod, { Schema } from 'zod';

import { Button } from '../../../components/Button';
import { ReferralCodeCheckList } from '../../../components/CheckList/ReferralCodeCheckList';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Controller } from '../../../components/typography/Controller';
import { CODE_MASK } from '../../../constants/masks';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { RegisterFormFields } from '../types';
import { styles } from './styles';

type Fields = Pick<RegisterFormFields, 'referralCode'>;

export const StepReferralCode: StepParams<RegisterFormFields> = {
  identifier: Identifiers.REFERRAL_CODE,
  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<RegisterFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      referralCode: formValidationRules.referralCode,
    });

    const { handleSubmit, control, getValues, watch } = useForm<Fields>({
      defaultValues: storeFields,
      resolver: zodResolver(schema),
      mode: 'all',
    });

    const fields = {
      password: watch('referralCode'),
    };

    const onSubmit: SubmitHandler<Fields> = async values => {
      values.referralCode = values.referralCode?.replace('-', '');
      await updateStoreFields(values);
      moveToNextStep();
    };

    const onSkip = () => {
      moveToNextStep();
    };

    return (
      <>
        <ScrollView style={styles.fw}>
          <FormTitle
            dark
            headline={'Do you have a referral code? (optional)'}
            description={'You and your referrer will receive $20 in dividend following your first investment!'}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName={'referralCode'}
            inputProps={{
              placeholder: 'Referral code',
              dark: true,
              keyboardType: 'numeric',
              maxLength: 7,
              mask: CODE_MASK, // xxx-xxx
              returnKeyType: 'done',
            }}
          />
          <ReferralCodeCheckList referralCode={fields.password || ''} />
        </ScrollView>
        <View
          key={'buttons_section'}
          style={styles.buttonsSection}
        >
          <Button
            variant={'outlined'}
            onPress={onSkip}
          >
            Skip
          </Button>
          <Button
            disabled={!getValues?.().referralCode?.length}
            isLoading={false}
            onPress={handleSubmit(onSubmit)}
          >
            Enter code
          </Button>
        </View>
      </>
    );
  },
};
