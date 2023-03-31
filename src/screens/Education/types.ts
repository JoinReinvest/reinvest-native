import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import Screens from '../../navigation/screens';

export type EducationStackParamsList = {
  [Screens.EducationMainScreen]: undefined;
  [Screens.BlogScreen]: undefined;
  [Screens.WebViewContent]: { title: string; uri: string };
};

export type EducationStackNavigationProp<T extends keyof EducationStackParamsList> = NativeStackNavigationProp<EducationStackParamsList, T>;
export type EducationStackRouteProp<T extends keyof EducationStackParamsList> = RouteProp<EducationStackParamsList, T>;

export interface EducationStackProps<T extends keyof EducationStackParamsList> {
  navigation: EducationStackNavigationProp<T>;
  route: EducationStackRouteProp<T>;
}

export type EducationNavigationProp<T extends keyof EducationStackParamsList> = Pick<EducationStackProps<T>, 'navigation'>;
