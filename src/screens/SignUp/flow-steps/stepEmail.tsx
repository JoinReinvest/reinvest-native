import { zodResolver } from '@hookform/resolvers/zod';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import zod, { Schema } from 'zod';

import { Button } from '../../../components/Button';
import { Controller } from '../../../components/typography/Controller';
import { StyledText } from '../../../components/typography/StyledText';
import { useLogOutNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { formValidationRules } from '../../../utils/formValidationRules';
import { useRegisterFormFlow } from '../flow-steps';
import { RegisterFormFields } from '../types';
import { styles } from './styles';

type Fields = Pick<RegisterFormFields, 'email'>;

interface Props {
  initialSteps: Record<string, string>;
}

export const StepOutsideFlow = ({ initialSteps }: Props) => {
  const { updateStoreFields } = useRegisterFormFlow();

  useFocusEffect(
    useCallback(() => {
      updateStoreFields(initialSteps);
    }, [updateStoreFields, initialSteps]),
  );

  const schema: Schema<Fields> = zod.object({
    email: formValidationRules.email,
  });

  const { handleSubmit, control, formState } = useForm<RegisterFormFields>({
    mode: 'onSubmit',
    defaultValues: initialSteps,
    resolver: zodResolver(schema),
  });

  const navigation = useLogOutNavigation();

  const onSubmit: SubmitHandler<Fields> = async fields => {
    updateStoreFields(fields);
    navigation.navigate(Screens.BlackForm);
  };

  return (
    <View style={[styles.fw, styles.wrapper]}>
      <Controller
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        fieldName="email"
        inputProps={{ placeholder: 'Email Address', keyboardType: 'email-address' }}
      />
      <StyledText
        onPress={() => navigation.navigate(Screens.SignIn)}
        variant="link"
        color="pureWhite"
        style={styles.firstStepLink}
      >
        Already have an account?
      </StyledText>
      <Button
        disabled={!formState.dirtyFields}
        onPress={handleSubmit(onSubmit)}
      >
        Sign Up
      </Button>
    </View>
  );
};
