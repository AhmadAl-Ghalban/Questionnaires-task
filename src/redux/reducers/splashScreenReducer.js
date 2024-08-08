import {SET_SPLASH_SCREEN} from '../action/splashScreenActions';

const initialState = {
  visible: true,
};

const splashScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPLASH_SCREEN:
      return {
        ...state,
        visible: action.payload,
      };
    default:
      return state;
  }
};

export default splashScreenReducer;
