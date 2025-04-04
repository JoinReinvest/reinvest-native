import { Dimensions, Platform, StatusBar } from 'react-native';

import { isIOS } from '../constants/common';

const { width, height } = Dimensions.get('window');

export const DEVICE_HEIGHT = Dimensions.get('screen').height;
export const DEVICE_WIDTH = Dimensions.get('screen').width;
export const STATUS_BAR = StatusBar.currentHeight || 24;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const NAVBAR_HEIGHT = DEVICE_HEIGHT - WINDOW_HEIGHT;

export const realHeight = Platform.OS === 'ios' ? WINDOW_HEIGHT : WINDOW_HEIGHT - STATUS_BAR;
export const AVAILABLE_HEIGHT = isIOS ? realHeight : realHeight - NAVBAR_HEIGHT;
export const IS_SMALL_DEVICE = realHeight < 680; // iPhone SE (2nd gen) -> 667
export const IS_REAL_SMALL_DEVICE = realHeight < 600;

// iPhone mini reference
export const guidelineBaseWidth = 375;
export const guidelineBaseHeight = 812;

const xScale = (size?: number): number => (size ? (width / guidelineBaseWidth) * size : 0);
const yScale = (size?: number): number => (size ? (realHeight / guidelineBaseHeight) * size : 0);

export { height, width, xScale, yScale };
