// redux/store.js
import {createStore, combineReducers} from 'redux';
import questionnaireReducer from './reducers/questionnaireReducer';
import splashScreenReducer from './reducers/splashScreenReducer';

const rootReducer = combineReducers({
  splashScreen: splashScreenReducer,

  questionnaire: questionnaireReducer,
});

const store = createStore(rootReducer);

export default store;
