import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../src/screen/Home';

// Mock react-native-responsive-screen
jest.mock('react-native-responsive-screen', () => {
  return {
    widthPercentageToDP: jest.fn(percent => percent),
    heightPercentageToDP: jest.fn(percent => percent),
  };
});

describe('HomeScreen', () => {
  const mockNavigate = jest.fn();

  const mockedProps = {
    navigation: {
      navigate: mockNavigate,
    },
  };

  it('renders the HomeScreen correctly', () => {
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <HomeScreen {...mockedProps} />
      </NavigationContainer>,
    );

    expect(getByTestId('home-logo')).toBeTruthy();

    expect(
      getByText(
        "Understanding your risk profile is essential to making informed investment decisions. By answering a few simple questions, you can gain insight into your risk tolerance and make choices that align with your financial goals. Let's get started on discovering your unique risk profile!",
      ),
    ).toBeTruthy();

    // Check if the button is rendered
    expect(getByText('Start Questionnaire')).toBeTruthy();
  });

  it('navigates to Questionnaire on button press', () => {
    const {getByText} = render(
      <NavigationContainer>
        <HomeScreen {...mockedProps} />
      </NavigationContainer>,
    );

    const button = getByText('Start Questionnaire');
    fireEvent.press(button);

    expect(mockNavigate).toHaveBeenCalledWith('Questionnaire');
  });
});
