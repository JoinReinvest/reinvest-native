import {
  AWS_COGNITO_CLIENT_ID,
  AWS_COGNITO_USER_POOL_ID,
  AWS_REGION,
} from '@env';
import Amplify from '@aws-amplify/core';
import {Auth, CognitoUser} from '@aws-amplify/auth';
import {AuthStorage} from '@src/services/storage.service';

const awsConfig = {
  aws_cognito_region: AWS_REGION,
  aws_user_pools_id: AWS_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: AWS_COGNITO_CLIENT_ID,
  federationTarget: 'COGNITO_USER_POOLS',
};

const awsInit = () => {
  Amplify.configure({
    ...awsConfig,
    storage: AuthStorage,
  });
};

async function getToken() {
  try {
    const currentUser: CognitoUser = await Auth.currentAuthenticatedUser();
    return currentUser.getSignInUserSession()?.getAccessToken().getJwtToken();
  } catch (error) {}
}

export default {awsInit, getToken};
