import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import Screens from '@navigation/screens';
import {RouteProp} from '@react-navigation/native';

export type EducationStackParamsList = {
  [Screens.EducationMainScreen]: undefined;
  [Screens.BlogScreen]: undefined;
  [Screens.WebViewContent]: {uri: string; title: string};
};

export type EducationStackNavigationProp<
  T extends keyof EducationStackParamsList,
> = NativeStackNavigationProp<EducationStackParamsList, T>;
export type EducationStackRouteProp<T extends keyof EducationStackParamsList> =
  RouteProp<EducationStackParamsList, T>;

export interface EducationStackProps<T extends keyof EducationStackParamsList> {
  navigation: EducationStackNavigationProp<T>;
  route: EducationStackRouteProp<T>;
}

export interface EducationNavigationProp<
  T extends keyof EducationStackParamsList,
> extends Pick<EducationStackProps<T>, 'navigation'> {}
