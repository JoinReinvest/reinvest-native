import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import zod, { Schema } from 'zod';

import { validateReferralCode } from '../../../api/validateReferralCode';
import { Button } from '../../../components/Button';
import { ReferralCodeCheckList } from '../../../components/CheckList/ReferralCodeCheckList';
import { FormMessage } from '../../../components/Forms/FormMessage';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { Controller } from '../../../components/typography/Controller';
import { REFERRAL_CODE_MASK } from '../../../constants/masks';
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
    const [validationError, setValidationError] = useState<string | undefined>();
    const [isValidating, setIsValidating] = useState(false);
    const { handleSubmit, control, watch } = useForm<Fields>({
      defaultValues: storeFields,
      resolver: zodResolver(schema),
      mode: 'all',
    });

    const onSubmit: SubmitHandler<Fields> = async values => {
      values.referralCode = values.referralCode?.replace('-', '');
      setIsValidating(true);
      try {
        await validateReferralCode(values?.referralCode || '');
        await updateStoreFields(values);
        moveToNextStep();
      } catch (err) {
        if (err instanceof Error) {
          setValidationError(err.message);
        }
      } finally {
        setIsValidating(false);
      }
    };

    const onSkip = () => {
      moveToNextStep();
    };

    const referralValue = watch('referralCode');

    return (
      <>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Do you have a referral code? (optional)"
            description="You and your referrer will receive $20 in dividend following your first investment!"
          />
          {validationError && (
            <FormMessage
              variant={'error'}
              message={validationError}
            />
          )}
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="referralCode"
            inputProps={{
              placeholder: 'Referral code',
              dark: true,
              autoCapitalize: 'none',
              maxLength: 7,
              mask: REFERRAL_CODE_MASK, // xxx-xxx
              returnKeyType: 'done',
              autoComplete: 'off',
            }}
          />
          <ReferralCodeCheckList code={referralValue ?? ''} />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            variant="outlined"
            onPress={onSkip}
          >
            Skip
          </Button>
          <Button
            disabled={referralValue?.replace('-', '').length !== 6 || isValidating}
            isLoading={isValidating}
            onPress={handleSubmit(onSubmit)}
          >
            Enter code
          </Button>
        </View>
      </>
    );
  },
};
