import React from 'react';
import {RootNavigator} from '@navigation/RootNavigator';
import {AuthProvider} from '@src/providers/AuthProvider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

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

export default App;
