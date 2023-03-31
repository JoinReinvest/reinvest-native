import { REINVEST_SITE_URL } from '@env';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import { Loader } from '../../../components/Loader';
import { isIOS } from '../../../constants/common';
import Screens from '../../../navigation/screens';
import { EducationStackProps } from '../../Education/types';
import { styles } from './styles';

/*
 * Iframe is scaling on input focus
 */
const jsInjection =
  "const meta =  document.querySelectorAll('meta')[1]; meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');";
export const WebViewContentScreen = ({ route }: EducationStackProps<Screens.WebViewContent>) => {
  const [isLoading, setIsLoading] = useState(true);
  const { uri } = route.params;
  const ref = useRef<WebView>(null);

  useEffect(() => {
    /*
     * We need to postpone injection until all scripts are ready
     */
    setTimeout(() => ref.current?.injectJavaScript(jsInjection), 1000);
  }, []);

  return (
    <>
      <WebView
        ref={ref}
        scalesPageToFit={isIOS}
        javaScriptEnabled
        onLoadEnd={() => setIsLoading(false)}
        source={{ uri: `${REINVEST_SITE_URL}${uri}` }}
      />
      {isLoading && (
        <View style={styles.webViewLoader}>
          <Loader />
        </View>
      )}
    </>
  );
};
