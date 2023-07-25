import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import Config from 'react-native-config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import { RootNavigator } from './navigation/RootNavigator';
import { AuthProvider } from './providers/AuthProvider';

/*
 * Sending custom transaction for monitoring :
 * const transaction = Sentry.startTransaction({ name: 'transaction type', tags: { startApp: 'Starting transaction' } });
 * transaction.finish(Date.now());
 */
!__DEV__ &&
  Sentry.init({
    dsn: Config.SENTRY_DNS,
    tracesSampleRate: 1.0,
  });

export const apiEnvs = {
  'https://api.dev.reinvestcommunity.com': 'Development',
  'https://api.integrations.reinvestcommunity.com': 'Integration',
  'https://api.staging.reinvestcommunity.com': 'Staging',
  'https://api.reinvestcommunity.com': 'Production',
} as const;

// eslint-disable-next-line no-console
__DEV__ && console.info('Current environment: ', apiEnvs[Config.API_URL as keyof typeof apiEnvs]);

export const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const App = () => {
  useEffect(() => {
    (() => {
      setTimeout(() => SplashScreen.hide(), 1500);
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AuthProvider>
            <RootNavigator />
          </AuthProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default Sentry.wrap(App);
