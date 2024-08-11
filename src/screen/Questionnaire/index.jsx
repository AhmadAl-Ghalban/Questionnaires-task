import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {
  addAnswer,
  calculateScore,
} from '../../redux/action/questionnaireActions';
import {fontSizing, hp, wp} from '../../utils/platform';
import {HeaderBackButton} from '@react-navigation/elements';
import Questions from '../../constants/Questions';
import Colors from '../../constants/Colors';

const QuestionnaireScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswer = (questionId, score) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: score,
    }));
    dispatch(addAnswer({score}));
  };

  const handleSubmit = () => {
    const unansweredQuestions = Questions.filter(q => !selectedAnswers[q.id]);

    if (unansweredQuestions.length > 0) {
      Alert.alert(
        'Incomplete',
        'Please answer all questions before submitting.',
        [{text: 'OK'}],
      );
      return;
    }

    dispatch(calculateScore());
    navigation.navigate('Result');
  };

  const handleNext = index => {
    const currentQuestion = Questions[index];
    if (!selectedAnswers[currentQuestion.id]) {
      Alert.alert('Incomplete', 'Please select an answer before proceeding.', [
        {text: 'OK'},
      ]);
      return false;
    }
    return true;
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            Alert.alert(
              'Confirmation',
              'Are you sure you want to leave the survey?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    dispatch(calculateScore());
                    navigation.navigate('Result');
                  },
                },
              ],
            );
          }}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ProgressSteps
        activeStepIconBorderColor={Colors.primaryColor}
        completedProgressBarColor={Colors.primaryColor}
        activeLabelColor={Colors.primaryColor}
        completedStepIconColor={Colors.primaryColor}>
        {Questions.map((question, index) => (
          <ProgressStep
            key={index}
            label={`Question ${index + 1}`}
            onSubmit={handleSubmit}
            onNext={() => handleNext(index)}
            nextBtnText="Next"
            nextBtnDisabled={selectedAnswers[question.id] === undefined}
            nextBtnTextStyle={styles.buttonTextStyle}
            previousBtnTextStyle={{
              borderWidth: 1,
              borderColor: index === 0 ? '#fff' : '#007aff',
              borderRadius: 10,
              paddingVertical: hp(10),
              paddingHorizontal: wp(20),
              color: index === 0 ? '#fff' : '#007aff',
            }}>
            <View style={styles.questionContainer}>
              <View style={styles.questionCard}>
                <Text style={styles.questionText}>{question.text}</Text>
                {question.options.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    style={[
                      styles.optionButton,
                      selectedAnswers[question.id] === option.score &&
                        styles.selectedOptionButton,
                    ]}
                    onPress={() => handleAnswer(question.id, option.score)}>
                    <Text
                      style={[
                        styles.optionButtonText,
                        selectedAnswers[question.id] === option.score &&
                          styles.selectedOptionButtonText,
                      ]}>
                      {option.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ProgressStep>
        ))}
      </ProgressSteps>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(22),
    backgroundColor: Colors.whiteColor,
  },
  questionContainer: {
    marginTop: hp(20),
    marginHorizontal: wp(2),
    alignItems: 'center',
  },
  questionCard: {
    backgroundColor: Colors.whiteColor,
    marginVertical: hp(10),
    padding: wp(10),
    width: wp(300),
    borderRadius: wp(10),
    shadowColor: Colors.blackColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  questionText: {
    ...fontSizing(20),
    marginBottom: hp(20),
  },
  optionButton: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 10,
    paddingVertical: hp(10),
    paddingHorizontal: wp(20),
    marginVertical: hp(10),
    alignItems: 'center',
  },
  selectedOptionButton: {
    backgroundColor: Colors.primaryColor,
  },
  optionButtonText: {
    color: Colors.blackColor,
  },
  selectedOptionButtonText: {
    color: Colors.whiteColor,
  },
  buttonTextStyle: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 10,
    paddingVertical: hp(10),
    paddingHorizontal: wp(20),
    color: Colors.primaryColor,
  },
  buttonTextStylePrevious: {
    borderWidth: 1,
    borderColor: Colors.previsionColor,
    borderRadius: 10,
    paddingVertical: hp(10),
    paddingHorizontal: wp(20),
    color: Colors.previsionColor,
  },
});

export default QuestionnaireScreen;
