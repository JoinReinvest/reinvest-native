import React, {useCallback, useRef, useState} from 'react';

import {WelcomeScreenProps} from './SignIn.types';
import {MainWrapper} from '@components/MainWrapper/MainWrapper';
import {StyledText} from '@components/typography/StyledText/StyledText';
import {TextInput, TouchableOpacity} from 'react-native';
import {Input} from '@components/Input/Input';
import {useAuth} from '@src/providers/AuthProvider';

export const SignIn = ({}: WelcomeScreenProps) => {
  const [email, setEmail] = useState('');
  const emailRef = useRef<TextInput>(null);
  const [password, setPassword] = useState('');
  const passRef = useRef<TextInput>(null);

  const {actions, loading} = useAuth();

  const signIn = useCallback(async () => {
    await actions.signIn(email, password);
  }, [actions, email, password]);

  return (
    <MainWrapper isLoading={loading}>
      <Input
        inputRef={emailRef}
        value={email}
        onChange={setEmail}
        placeholder={'Email'}
      />
      <Input
        inputRef={passRef}
        value={password}
        onChange={setPassword}
        placeholder={'Password'}
      />
      <TouchableOpacity onPress={signIn}>
        <StyledText variant={'h3'}>SignIn</StyledText>
      </TouchableOpacity>
    </MainWrapper>
  );
};
