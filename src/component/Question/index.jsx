import React from 'react';
import {View, Text, Button} from 'react-native';

const Question = ({question, onAnswer}) => {
  return (
    <View>
      <Text>{question.text}</Text>
      {question.options.map((option, index) => (
        <Button
          key={index}
          title={option.text}
          onPress={() => onAnswer(option.score)}
        />
      ))}
    </View>
  );
};

export default Question;
