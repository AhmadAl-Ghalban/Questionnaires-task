import {Dimensions, Platform} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const IS_IOS = Platform.OS === 'ios';

export const IS_ANDROID = Platform.OS === 'android';

export const IS_DEV_ENV = __DEV__ === true;

export const DEVICE_VERSION = Platform.Version;

export const getWindowHeight = () => Dimensions.get('window').height;

export const getWindowWidth = () => Dimensions.get('window').width;

const X_HEIGHT = 812;
const XS_MAX_HEIGHT = 896;
// The dimensions of the provided designs screen
const DESIGN_SCREEN_WIDTH = 375;
const DESIGN_SCREEN_HEIGHT = X_HEIGHT;
// const DESIGN_SCREEN_HEIGHT = 869

// Calculate the adaptive width given the design screen width dimension.
// To be used for style props like: width, marginHorizontal, fontSize, ...
export const wp = designWidth => {
  return widthPercentageToDP((designWidth * 100) / DESIGN_SCREEN_WIDTH);
};

// Calculate the adaptive height given the design screen height dimension.
// To be used for style props like: height, marginVertical, ...
export const hp = designHeight => {
  return heightPercentageToDP((designHeight * 100) / DESIGN_SCREEN_HEIGHT);
};

export function fontSizing(size, spacing) {
  return {
    fontSize: Platform.OS === 'ios' ? wp(size) : wp(size) - 1,
    letterSpacing: spacing,
    // lineHeight: wp(height),
  };
}

export const isIPhoneX =
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? getWindowWidth() >= X_HEIGHT ||
      getWindowHeight() >= X_HEIGHT ||
      getWindowWidth() >= XS_MAX_HEIGHT ||
      getWindowHeight() >= XS_MAX_HEIGHT
    : false;
