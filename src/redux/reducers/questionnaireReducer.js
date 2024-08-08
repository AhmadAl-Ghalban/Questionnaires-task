import {
  ADD_ANSWER,
  CALCULATE_SCORE,
  RESET,
} from '../action/questionnaireActions';

const initialState = {
  answers: [],
  score: 0,
  profile: '',
};

const questionnaireReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANSWER:
      return {
        ...state,
        answers: [...state.answers, action.payload],
      };
    case CALCULATE_SCORE:
      const score = state.answers.reduce(
        (total, answer) => total + answer.score,
        0,
      );
      let profile = '';
      if (score <= 8) profile = 'Low';
      else if (score <= 16) profile = 'Medium';
      else profile = 'High';
      return {
        ...state,
        score,
        profile,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default questionnaireReducer;
