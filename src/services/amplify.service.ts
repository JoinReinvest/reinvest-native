import { Auth, CognitoUser } from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import Config from 'react-native-config';

import { AuthStorage } from './storage.service';

const awsConfig = {
  aws_cognito_region: Config.AWS_REGION,
  aws_user_pools_id: Config.AWS_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: Config.AWS_COGNITO_CLIENT_ID,
  federationTarget: 'COGNITO_USER_POOLS',
};

const awsInit = () => {
  Amplify.configure({
    ...awsConfig,
    storage: AuthStorage,
  });
};

async function getToken() {
  let currentUser: CognitoUser | null = null;
  try {
    currentUser = await Auth.currentAuthenticatedUser();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
  }

  return currentUser?.getSignInUserSession()?.getAccessToken().getJwtToken();
}

export default { awsInit, getToken };
