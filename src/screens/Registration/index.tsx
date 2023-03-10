import React, {useCallback, useRef, useState} from 'react';

import {WelcomeScreenProps} from './Registration.types';
import {MainWrapper} from '@components/MainWrapper';
import {StyledText} from '@components/typography/StyledText/StyledText';
import {useAuth} from '@src/providers/AuthProvider';
import {TextInput, TouchableOpacity} from 'react-native';
import {Auth} from '@aws-amplify/auth';
import {Input} from '@components/Input';

export const Registration = ({}: WelcomeScreenProps) => {
  const [email, setEmail] = useState('');
  const emailRef = useRef<TextInput>(null);
  const [password, setPassword] = useState('');
  const passRef = useRef<TextInput>(null);
  const [code, setCode] = useState('');
  const codeRef = useRef<TextInput>(null);

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
    <MainWrapper isLoading={loading} dark>
      <Input
        inputRef={emailRef}
        value={email}
        onChangeText={setEmail}
        placeholder={'Email'}
        dark
      />
      <Input
        inputRef={passRef}
        value={password}
        onChangeText={setPassword}
        placeholder={'Password'}
        dark
        secureTextEntry
      />
      {isCodeStep && (
        <Input
          inputRef={codeRef}
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
