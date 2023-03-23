import {formValidationRules} from '@utils/formValidationRules';
import React, {useCallback} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import zod, {Schema} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {View} from 'react-native';
import {Controller} from '@components/typography/Controller';
import {Button} from '@components/Button';
import {styles} from './styles';
import {StyledText} from '@components/typography/StyledText';
import {palette} from '@constants/theme';
import {useLogOutNavigation} from '@navigation/hooks';
import Screens from '@navigation/screens';
import {RegisterFormFields} from '@screens/SignUp/SignUp.types';
import {useFocusEffect} from '@react-navigation/native';
import {useRegisterFormFlow} from '@screens/SignUp/flow-steps';

type Fields = Pick<RegisterFormFields, 'email'>;

interface Props {
  initialSteps: Record<string, string>;
}

export const StepOutsideFlow = ({initialSteps}: Props) => {
  const {updateStoreFields} = useRegisterFormFlow();

  useFocusEffect(
    useCallback(() => {
      updateStoreFields(initialSteps);
    }, [updateStoreFields, initialSteps]),
  );

  const schema: Schema<Fields> = zod.object({
    email: formValidationRules.email,
  });

  const {handleSubmit, control, formState} = useForm<RegisterFormFields>({
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
    <View style={[styles.wrapper]}>
      <Controller
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        fieldName={'email'}
        inputProps={{placeholder: 'Email Address'}}
      />
      <StyledText
        onPress={() => navigation.navigate(Screens.SignIn)}
        variant={'link'}
        color={palette.pureWhite}
        style={styles.firstStepLink}>
        Already have an account ?
      </StyledText>
      <Button
        disabled={!formState.dirtyFields}
        onPress={handleSubmit(onSubmit)}>
        Sign Up
      </Button>
    </View>
  );
};
