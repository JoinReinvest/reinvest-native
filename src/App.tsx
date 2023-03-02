import React, {useEffect} from 'react';
import {API_URL} from '@env';

import RootNavigator from '@navigation/RootNavigator';

const App = () => {
  useEffect(() => {
    console.log(API_URL);
  }, []);
  return <RootNavigator />;
};

export default App;
