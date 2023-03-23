import {formValidationRules} from '@utils/formValidationRules';
import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import zod, {Schema} from 'zod';
import {ChallengeName, useAuth} from '@providers/AuthProvider';
import {zodResolver} from '@hookform/resolvers/zod';
import {View} from 'react-native';
import {Controller} from '@components/typography/Controller';
import {Button} from '@components/Button';
import {styles} from './styles';
import {StyledText} from '@components/typography/StyledText';
import {palette} from '@constants/theme';
import {useLogOutNavigation} from '@navigation/hooks';
import Screens from '@navigation/screens';
import {LoginFormFields} from '@screens/SignIn/SignIn.types';
import {CognitoUser} from '@aws-amplify/auth';
import {FormMessage} from '@components/Forms/FormMessage';
import {useLoginFormFlow} from '@screens/SignIn/flow-steps/index';

type Fields = Omit<LoginFormFields, 'authenticationCode'>;

interface Props {
  initialSteps: Record<string, string>;
}

export const StepOutsideFlow = ({initialSteps}: Props) => {
  const {updateStoreFields} = useLoginFormFlow();
  const schema: Schema<Fields> = zod.object({
    email: formValidationRules.email,
    password: formValidationRules.password,
  });

  const [error, setError] = useState<string | undefined>();
  const {actions, loading} = useAuth();
  const {handleSubmit, control, formState} = useForm<LoginFormFields>({
    mode: 'onSubmit',
    defaultValues: initialSteps,
    resolver: zodResolver(schema),
  });

  const navigation = useLogOutNavigation();

  const onSubmit: SubmitHandler<Fields> = async fields => {
    setError('');
    updateStoreFields(fields);
    const {email, password} = fields;

    const result = await actions.signIn(email, password);

    if (result instanceof Error) {
      return setError(result.message);
    }
    const cognitoUser = result as CognitoUser;
    if (cognitoUser.challengeName === ChallengeName.SMS_MFA) {
      setError(undefined);
      navigation.navigate(Screens.BlackForm);
    }
  };

  const startForgotPasswordFlow = () =>
    navigation.navigate(Screens.ResetPassword);

  return (
    <View style={styles.wrapper}>
      {error && <FormMessage message={error} variant={'error'} />}
      <Controller
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        fieldName={'email'}
        inputProps={{placeholder: 'Email Address'}}
      />
      <Controller
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        fieldName={'password'}
        inputProps={{placeholder: 'Password'}}
      />
      <StyledText
        onPress={startForgotPasswordFlow}
        variant={'link'}
        color={palette.pureWhite}
        style={styles.firstStepLink}>
        Forgot Password ?
      </StyledText>
      <Button
        disabled={!formState.dirtyFields}
        isLoading={loading}
        onPress={handleSubmit(onSubmit)}>
        SignIn
      </Button>
    </View>
  );
};
