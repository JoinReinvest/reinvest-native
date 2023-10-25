import { Auth, CognitoUser } from '@aws-amplify/auth';
import { GraphQLClient } from 'graphql-request';
import Config from 'react-native-config';

export const getApiClient = async (): Promise<GraphQLClient | undefined> => {
  try {
    const currentUser: CognitoUser = await Auth.currentAuthenticatedUser();

    return new GraphQLClient(`${Config.API_URL}/api`, {
      requestMiddleware: async request => {
        const token = currentUser.getSignInUserSession()?.getAccessToken().getJwtToken();

        return {
          ...request,
          headers: { ...request.headers, Authorization: `Bearer ${token}` },
        };
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }

    return undefined;
  }
};
