import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { RootNavigator } from './navigation/RootNavigator';
import { AuthProvider } from './providers/AuthProvider';
import { SENTRY_DNS } from '@env';

/*
 * Sending custom transaction for monitoring :
 * const transaction = Sentry.startTransaction({ name: 'transaction type', tags: { startApp: 'Starting transaction' } });
 * transaction.finish(Date.now());
 */
!__DEV__ &&
  Sentry.init({
    dsn: SENTRY_DNS,
    tracesSampleRate: 1.0,
  });

const queryClient = new QueryClient();
const App = () => {
  useEffect(() => {
    (() => {
      setTimeout(() => SplashScreen.hide(), 1500);
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Sentry.wrap(App);
