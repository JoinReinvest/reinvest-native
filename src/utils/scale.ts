import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export const DEVICE_WIDTH = Dimensions.get('screen').width;
export const STATUS_BAR = StatusBar.currentHeight || 24;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

export const realHeight = Platform.OS === 'ios' ? WINDOW_HEIGHT : WINDOW_HEIGHT - STATUS_BAR;

// iPhone mini reference
export const guidelineBaseWidth = 375;
export const guidelineBaseHeight = 812;

const xScale = (size?: number): number => (size ? (width / guidelineBaseWidth) * size : 0);
const yScale = (size?: number): number => (size ? (realHeight / guidelineBaseHeight) * size : 0);

export { height, width, xScale, yScale };
