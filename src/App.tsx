import { SENTRY_DNS } from '@env';
import { RootNavigator } from '@navigation/RootNavigator';
import * as Sentry from '@sentry/react-native';
import { AuthProvider } from '@src/providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

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
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Sentry.wrap(App);
