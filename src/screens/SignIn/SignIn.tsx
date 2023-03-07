import React, {useCallback, useState} from 'react';

import {WelcomeScreenProps} from './SignIn.types';
import MainWrapper from '@components/MainWrapper/MainWrapper';
import StyledText from '@components/typography/StyledText/StyledText';
import {TextInput, TouchableOpacity} from 'react-native';
import {useAuth} from '@src/providers/AuthProvider';
import styles from '@screens/SignIn/SignIn.styles';

const SignIn = ({}: WelcomeScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {actions, loading} = useAuth();

  const signIn = useCallback(async () => {
    await actions.signIn(email, password);
  }, [actions, email, password]);

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
      <TouchableOpacity onPress={signIn}>
        <StyledText variant={'h3'}>SignIn</StyledText>
      </TouchableOpacity>
    </MainWrapper>
  );
};

export default SignIn;
