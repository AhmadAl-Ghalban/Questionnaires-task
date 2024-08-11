import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import QuestionnaireScreen from '../src/screen/Questionnaire';
import Questions from '../src/constants/Questions';
import {addAnswer} from '../src/redux/action/questionnaireActions';
jest.mock('react-native-progress-steps', () => {
  return {
    ProgressSteps: jest.fn(props => <>{props.children}</>),
    ProgressStep: jest.fn(props => <>{props.children}</>),
  };
});
jest.mock('@react-navigation/elements', () => {
  return {
    HeaderBackButton: jest.fn(props => <div {...props} />),
  };
});
jest.mock('react-native-responsive-screen', () => {
  return {
    widthPercentageToDP: jest.fn(percent => percent),
    heightPercentageToDP: jest.fn(percent => percent),
  };
});
const mockStore = configureStore([]);
jest.useFakeTimers();

describe('QuestionnaireScreen', () => {
  let store;
  let navigation;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
    navigation = {navigate: jest.fn(), setOptions: jest.fn()};
  });

  it('renders the questionnaire screen', () => {
    const {getByText} = render(
      <Provider store={store}>
        <QuestionnaireScreen navigation={navigation} />
      </Provider>,
    );

    Questions.forEach(question => {
      expect(getByText(question.text)).toBeTruthy();
    });
  });

  it('handles answer selection', () => {
    const {getByText} = render(
      <Provider store={store}>
        <QuestionnaireScreen navigation={navigation} />
      </Provider>,
    );

    const firstQuestion = Questions[0];
    const firstOption = firstQuestion.options[0];

    fireEvent.press(getByText(firstOption.text));

    expect(store.dispatch).toHaveBeenCalledWith(
      addAnswer({score: firstOption.score}),
    );
  });
});
