import Screens from '@navigation/screens';
import {EducationStackProps} from '@screens/Education/types';
import {REINVEST_SITE_URL} from '@env';
import {WebView} from 'react-native-webview';
import {Loader} from '@components/Loader';
import {useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const WebViewContentScreen = ({
  route,
}: EducationStackProps<Screens.WebViewContent>) => {
  const [isLoading, setIsLoading] = useState(true);
  const {uri} = route.params;

  return (
    <>
      <WebView
        onLoadEnd={() => setIsLoading(false)}
        source={{uri: `${REINVEST_SITE_URL}${uri}`}}
      />
      {isLoading && (
        <View style={styles.webViewLoader}>
          <Loader />
        </View>
      )}
    </>
  );
};
