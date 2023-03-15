import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LogInStackParamList} from './LogInNavigator/LogInNavigator.types';
import {LogOutStackParamList} from './LogOutNavigator/LogOutNavigator.types';

export const useLogOutNavigation = () =>
  useNavigation<NativeStackNavigationProp<LogOutStackParamList>>();
export const useLogInNavigation = () =>
  useNavigation<NativeStackNavigationProp<LogInStackParamList>>();
