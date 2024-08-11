import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ResultScreen from '../src/screen/Result';

const mockStore = configureStore([]);
jest.mock('react-native-vector-icons/Feather', () => 'FeatherIcon');
jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('react-native-responsive-screen', () => {
  return {
    widthPercentageToDP: jest.fn(percent => percent),
    heightPercentageToDP: jest.fn(percent => percent),
  };
});
describe('ResultScreen', () => {
  const mockNavigate = jest.fn();

  const mockedProps = {
    navigation: {
      navigate: mockNavigate,
    },
  };
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      questionnaire: {
        score: 15,
        profile: 'Medium',
      },
    });

    component = (
      <Provider store={store}>
        <ResultScreen {...mockedProps} />
      </Provider>
    );
  });

  it('renders correctly', () => {
    const {getByText, getByTestId} = render(component);

    // Assert that the title is rendered correctly
    expect(getByText('Result')).toBeTruthy();

    expect(getByText('Your Risk Profile Score is')).toBeTruthy();
    expect(getByText('15 / 21')).toBeTruthy();

    expect(getByText('Your Risk Profile Result Is')).toBeTruthy();
    expect(getByText('Medium !')).toBeTruthy();

    expect(getByTestId('progress-view')).toBeTruthy();

    expect(getByText('Start New Questionnaire')).toBeTruthy();
  });

  it('dispatches reset action and navigates to Home screen when button is pressed', () => {
    const {getByText} = render(component);

    fireEvent.press(getByText('Start New Questionnaire'));

    expect(store.getActions()).toContainEqual({type: 'RESET'});

    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });
});
