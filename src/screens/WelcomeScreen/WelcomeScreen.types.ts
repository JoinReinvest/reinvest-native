import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LogOutStackParamList} from '@navigation/LogOutNavigator/LogOutNavigator.types';
import Screens from '@navigation/screens';

export interface WelcomeScreenProps {
  navigation: NativeStackNavigationProp<LogOutStackParamList, Screens.Welcome>;
}
