const Questions = [
  {
    id: 1,
    text: 'How would you describe your investment knowledge?',
    options: [
      {text: 'Novice', score: 1},
      {text: 'Intermediate', score: 2},
      {text: 'Advanced', score: 3},
    ],
  },
  {
    id: 2,
    text: 'Investment Duration',
    options: [
      {text: 'Short-term (less than 1 year)', score: 1},
      {text: 'Medium-term (1-5 years)', score: 2},
      {text: 'Long-term (more than 5 years)', score: 3},
    ],
  },
  {
    id: 3,
    text: 'How comfortable are you with taking risks?',
    options: [
      {text: 'Very risk-averse', score: 1},
      {text: 'Somewhat risk-averse', score: 2},
      {text: 'Neutral', score: 3},
      {text: 'Somewhat risk-tolerant', score: 4},
      {text: 'Very risk-tolerant', score: 5},
    ],
  },
  {
    id: 4,
    text: 'What percentage of your income are you willing to invest?',
    options: [
      {text: 'Less than 10%', score: 1},
      {text: '10-25%', score: 2},
      {text: '25-50%', score: 3},
      {text: '50-75%', score: 4},
      {text: 'More than 75%', score: 5},
    ],
  },
  {
    id: 5,
    text: 'How would you react to a sudden drop in the value of your investments?',
    options: [
      {text: 'Panic and sell immediately', score: 1},
      {text: 'Monitor closely and consider selling', score: 2},
      {text: 'Hold and wait for recovery', score: 3},
      {text: 'See it as a buying opportunity and invest more', score: 4},
      {
        text: 'Consult with a financial advisor before making any decision',
        score: 5,
      },
    ],
  },
];
export default Questions;
