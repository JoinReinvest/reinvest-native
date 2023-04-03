import { Auth, CognitoUser } from '@aws-amplify/auth';
import { API_URL } from '@env';
import { GraphQLClient } from 'graphql-request';

export const apiClient = async (): Promise<GraphQLClient | undefined> => {
  try {
    const currentUser: CognitoUser = await Auth.currentAuthenticatedUser();

    return new GraphQLClient(`${API_URL}`, {
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
