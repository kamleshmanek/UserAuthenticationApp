import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Based on iPhone 14 Pro scale (design reference)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

// Scale based on width
const scale = (size: number): number => (SCREEN_WIDTH / BASE_WIDTH) * size;

// Scale based on height
const verticalScale = (size: number): number => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

// Moderate scale - combines width and height scaling
const moderateScale = (size: number, factor = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

// Font scale - prevents font scaling on device
const fontScale = (size: number): number => {
  const newSize = scale(size);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export { scale, verticalScale, moderateScale, fontScale, SCREEN_WIDTH, SCREEN_HEIGHT };
