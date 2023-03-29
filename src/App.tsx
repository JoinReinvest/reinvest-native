import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { RootNavigator } from './navigation/RootNavigator';
import { AuthProvider } from './providers/AuthProvider';

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
