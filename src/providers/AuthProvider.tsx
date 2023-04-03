import { Auth, CognitoUser, SignUpParams } from '@aws-amplify/auth';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import AuthService from '../services/amplify.service';

export enum ChallengeName {
  SMS_MFA = 'SMS_MFA',
}

AuthService.awsInit();

interface AuthContextInterface {
  actions: {
    confirmSignIn: (authenticationCode: string) => Promise<CognitoUser | Error | null>;
    confirmSignUp: (email: string, authenticationCode: string) => Promise<void> | null;
    forgotPassword: (email: string) => Promise<Error | void> | null;
    forgotPasswordSubmit: (email: string, code: string, newPassword: string) => Promise<Error | void> | null;
    signIn: (email: string, password: string) => Promise<Error | CognitoUser | null>;
    signOut: () => Promise<Error | void> | null;
    signUp: (params: SignUpParams) => Promise<ISignUpResult | Error | null> | null;
  };
  loading: boolean;
  user: CognitoUser | null;
}

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  loading: true,
  actions: {
    signIn: async () => null,
    confirmSignIn: async () => null,
    signOut: () => null,
    signUp: () => null,
    confirmSignUp: () => null,
    forgotPassword: () => null,
    forgotPasswordSubmit: () => null,
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

//TODO add serialisation and mapping for handling errors - instead invoking main cognito instance we should use dep inv class

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [error, setError] = useState<Error | string | undefined>();

  const signIn = async (email: string, password: string): Promise<CognitoUser | Error> => {
    setLoading(true);
    try {
      const currentUser: CognitoUser = await Auth.signIn(email, password);
      setUser(currentUser);

      return currentUser;
    } catch (e) {
      const err = e as Error;

      return new Error(err?.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const confirmSignIn = async (authenticationCode: string) => {
    const confirmedUser: CognitoUser = await Auth.confirmSignIn(user, authenticationCode, ChallengeName.SMS_MFA);
    setUser(confirmedUser);

    return confirmedUser;
  };

  const signUp = async (signUpParams: SignUpParams) => {
    setLoading(true);
    let userResult: ISignUpResult | null = null;
    try {
      userResult = await Auth.signUp(signUpParams);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
    } finally {
      setLoading(false);
    }

    return userResult;
  };

  const confirmSignUp = async (email: string, authenticationCode: string) => Auth.confirmSignUp(email, authenticationCode);

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (e: unknown) {
      setError('SignOut error');
    }
  };

  const getCurrentUser = async () => {
    setLoading(true);
    try {
      const cognitoUser: CognitoUser = await Auth.currentAuthenticatedUser();
      setUser(cognitoUser);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  async function getToken() {
    let currentUser: CognitoUser | null = null;
    try {
      currentUser = await Auth.currentAuthenticatedUser();
    } catch (e) {
      setError('Problem with token');
    }

    return currentUser?.getSignInUserSession()?.getAccessToken().getJwtToken();
  }

  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      await Auth.forgotPassword(email);
    } catch (e) {
      const err = e as Error;
      throw new Error(err?.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const forgotPasswordSubmit = async (email: string, code: string, newPassword: string) => {
    setLoading(true);
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
    } catch (e) {
      const err = e as Error;
      throw new Error(err?.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const ctx = useMemo(() => {
    return {
      loading,
      user,
      error,
      actions: {
        signIn,
        confirmSignIn,
        signOut,
        getCurrentUser,
        getToken,
        signUp,
        confirmSignUp,
        forgotPassword,
        forgotPasswordSubmit,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user]);

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
