import { RootNavigator } from '@navigation/RootNavigator';
import { AuthProvider } from '@src/providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

const queryClient = new QueryClient();
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
