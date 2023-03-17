import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LogInStackParamList} from '@navigation/LogInNavigator/LogInNavigator.types';
import Screens from '@navigation/screens';

export interface WelcomeScreenProps {
  navigation: NativeStackNavigationProp<LogInStackParamList, Screens.Home>;
}
