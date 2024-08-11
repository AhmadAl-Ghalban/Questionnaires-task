import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import SplashScreen from '../src/screen/SplachScreen';
import {setSplashScreen} from '../src/redux/action/splashScreenActions';
jest.mock('react-native-responsive-screen', () => {
  return {
    widthPercentageToDP: jest.fn(percent => percent),
    heightPercentageToDP: jest.fn(percent => percent),
  };
});
const mockStore = configureStore([]);
jest.useFakeTimers();

describe('SplashScreen', () => {
  let store;
  let navigation;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
    navigation = {navigate: jest.fn()};
  });

  it('renders splash screen logo', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <SplashScreen navigation={navigation} />
      </Provider>,
    );

    expect(getByTestId('splash-logo')).toBeTruthy();
  });

  it('navigates to Home after 2 seconds', async () => {
    render(
      <Provider store={store}>
        <SplashScreen navigation={navigation} />
      </Provider>,
    );

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(setSplashScreen(false));
      expect(navigation.navigate).toHaveBeenCalledWith('Home');
    });
  });
});
