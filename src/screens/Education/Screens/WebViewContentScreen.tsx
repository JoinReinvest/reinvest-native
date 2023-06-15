import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import { WebView } from 'react-native-webview';

import { Loader } from '../../../components/Loader';
import { isIOS } from '../../../constants/common';
import Screens from '../../../navigation/screens';
import { EducationStackProps } from '../types';
import { styles } from './styles';

/*
 * Iframe is scaling on input focus
 */
const jsInjection = ` try {
    function loadPageEnd() {
      const meta =  document.querySelectorAll('meta')[1];
      meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    }
    window.onLoad = loadPageEnd();
  } catch (e) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ error: JSON.stringify(e) }));
    true;
  }
  true;`;
export const WebViewContentScreen = ({ route: { params } }: EducationStackProps<Screens.WebViewContent>) => {
  const [isLoading, setIsLoading] = useState(true);

  const ref = useRef<WebView>(null);

  useEffect(() => {
    /*
     * We need to postpone injection until all scripts are ready
     */
    setTimeout(() => ref.current?.injectJavaScript(jsInjection), 1000);
  }, []);

  return (
    <>
      {params?.uri && (
        <WebView
          ref={ref}
          scalesPageToFit={isIOS}
          javaScriptEnabled
          onLoadEnd={() => setIsLoading(false)}
          source={{ uri: `${Config.REINVEST_SITE_URL}${params.uri}` }}
        />
      )}
      {isLoading && (
        <View style={styles.webViewLoader}>
          <Loader />
        </View>
      )}
    </>
  );
};
