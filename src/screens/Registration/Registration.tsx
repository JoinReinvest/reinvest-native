import React, {useCallback, useState} from 'react';

import {WelcomeScreenProps} from './Registration.types';
import MainWrapper from '@components/MainWrapper/MainWrapper';
import StyledText from '@components/typography/StyledText/StyledText';
import {useAuth} from '@src/providers/AuthProvider';
import {TouchableOpacity} from 'react-native';
import {Auth} from '@aws-amplify/auth';
import styles from '@screens/SignIn/SignIn.styles';
import {Input} from "@components/Input/Input";

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
    <MainWrapper isLoading={loading} dark >
      <Input
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder={'email'}
        dark
      />
      <Input
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder={'password'}
        dark
      />
      {isCodeStep && (
        <Input
          style={styles.input}
          value={code}
          onChangeText={setCode}
          placeholder={'code'}
          dark
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
