import React from 'react';

import RootNavigator from '@navigation/RootNavigator';
import {AuthProvider} from '@src/providers/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default App;
