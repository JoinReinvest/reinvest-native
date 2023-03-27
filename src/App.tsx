import { RootNavigator } from '@navigation/RootNavigator';
import { AuthProvider } from '@src/providers/AuthProvider';
import React from 'react';

const App = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default App;
