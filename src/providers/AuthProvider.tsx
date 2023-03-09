import {Auth, CognitoUser, SignUpParams} from '@aws-amplify/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AuthService from '@src/services/amplify.service';
import {ISignUpResult} from 'amazon-cognito-identity-js';

export enum ChallengeName {
  SMS_MFA = 'SMS_MFA',
}

AuthService.awsInit();

interface AuthContextInterface {
  actions: {
    confirmSignIn: (
      authenticationCode: string,
    ) => Promise<CognitoUser | Error | null>;
    signOut: () => Promise<Error | void> | null;
    signIn: (
      email: string,
      password: string,
    ) => Promise<Error | CognitoUser | null>;
    signUp: (
      params: SignUpParams,
    ) => Promise<ISignUpResult | Error | undefined> | null;
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
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [error, setError] = useState<Error | string | undefined>();

  const signIn = async (
    email: string,
    password: string,
  ): Promise<CognitoUser | Error> => {
    setLoading(true);
    try {
      const currentUser: CognitoUser = await Auth.signIn(email, password);
      setUser(currentUser);
      return currentUser;
    } catch (e) {
      return error as Error;
    } finally {
      setLoading(false);
    }
  };

  const confirmSignIn = async (authenticationCode: string) => {
    const confirmedUser: CognitoUser = await Auth.confirmSignIn(
      user,
      authenticationCode,
      ChallengeName.SMS_MFA,
    );
    setUser(confirmedUser);
    return confirmedUser;
  };

  const signUp = async (signUpParams: SignUpParams) => {
    setLoading(true);
    try {
      const userResult: ISignUpResult = await Auth.signUp(signUpParams);
      //TODO flow for confirmation
      return userResult;
    } catch (err) {
      //TODO add serialisation
      console.log('SIGNUP error ', err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (e: unknown) {
      //TODO  add serialisation
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
    try {
      const currentUser: CognitoUser = await Auth.currentAuthenticatedUser();
      return currentUser.getSignInUserSession()?.getAccessToken().getJwtToken();
    } catch (e) {
      //TODO  add serialisation
      setError('Problem with token');
    }
  }

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
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user]);

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
