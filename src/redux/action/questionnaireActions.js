export const ADD_ANSWER = 'ADD_ANSWER';
export const CALCULATE_SCORE = 'CALCULATE_SCORE';
export const RESET = 'RESET';

export const addAnswer = answer => ({
  type: ADD_ANSWER,
  payload: answer,
});

export const calculateScore = () => ({
  type: CALCULATE_SCORE,
});

export const reset = () => ({
  type: RESET,
});
