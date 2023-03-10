import {Platform} from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const defaultHitSlop = {top: 8, bottom: 8, left: 8, right: 8};
