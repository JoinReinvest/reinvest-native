import React, {useCallback, useState} from 'react';

import {WelcomeScreenProps} from './Registration.types';
import MainWrapper from '@components/MainWrapper/MainWrapper';
import StyledText from '@components/typography/StyledText/StyledText';
import {useAuth} from '@src/providers/AuthProvider';
import {TextInput, TouchableOpacity} from 'react-native';
import {Auth} from '@aws-amplify/auth';
import styles from '@screens/SignIn/SignIn.styles';

const Registration = ({}: WelcomeScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const {actions, loading} = useAuth();
  const [isCodeStep, setCodeStep] = useState(false);

  const signUp = useCallback(async () => {
    try {
      await actions.signUp({username: email, password});
      setCodeStep(true);
    } catch (e) {}
  }, [actions, email, password]);

  const verify = async () => {
    try {
      await Auth.confirmSignUp(email, code);
      await actions.signIn(email, password);
    } catch (err) {}
  };

  return (
    <MainWrapper isLoading={loading}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={e => setEmail(e)}
        placeholder={'email'}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={e => setPassword(e)}
        placeholder={'password'}
      />
      {isCodeStep && (
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={e => setCode(e)}
          placeholder={'code'}
        />
      )}
      <TouchableOpacity onPress={isCodeStep ? verify : signUp}>
        <StyledText variant={'h3'}>
          {!isCodeStep ? 'SignUp' : 'verify account '}
        </StyledText>
      </TouchableOpacity>
    </MainWrapper>
  );
};

export default Registration;
