import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {calculateScore, reset} from '../../redux/action/questionnaireActions';
import HeaderComponent from '../../component/Header';
import {fontSizing, hp, wp} from '../../utils/platform';
import CustomButton from '../../component/Button';
import {ProgressView} from '@react-native-community/progress-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../constants/Colors';

const ResultScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const score = useSelector(state => state.questionnaire.score);
  const profile = useSelector(state => state.questionnaire.profile);

  useEffect(() => {
    dispatch(calculateScore());
  }, [dispatch]);

  const getProgress = () => {
    switch (profile) {
      case 'Low':
        return 0.33;
      case 'Medium':
        return 0.66;
      case 'High':
        return 1;
      default:
        return 0;
    }
  };

  const getProgressTintColor = () => {
    switch (profile) {
      case 'Low':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'High':
        return 'green';
      default:
        return 'grey';
    }
  };

  return (
    <View style={styles.screen}>
      <HeaderComponent leftButton={false} title="Result" />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.centered}>
          <Text style={styles.titleText}>Your Risk Profile Score is</Text>
          <Text style={styles.scoreText}>{score} / 21</Text>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Your Risk Profile Result Is</Text>
          <Text style={styles.profileText}>{profile} !</Text>

          <View style={styles.progressContainer}>
            <View style={styles.labelLeft}>
              <Text style={styles.lowText}>Low</Text>
              <AntDesign
                name="caretdown"
                color={Colors.primaryColor}
                size={20}
              />
            </View>
            <View style={styles.labelMiddle}>
              <Text style={styles.mediumText}>Medium</Text>
              <AntDesign
                name="caretdown"
                color={Colors.primaryColor}
                size={20}
              />
            </View>
            <View style={styles.labelRight}>
              <Text style={styles.highText}>High</Text>
              <AntDesign
                name="caretdown"
                color={Colors.primaryColor}
                size={20}
              />
            </View>
            <ProgressView
              progress={getProgress()}
              progressTintColor={getProgressTintColor()}
              trackTintColor={Colors.progressColor}
              style={styles.progressView}
            />
          </View>

          <CustomButton
            buttonStyle={styles.buttonStyle}
            title="Start New Questionnaire"
            textStyle={styles.buttonTextStyle}
            onPress={() => {
              dispatch(reset());
              navigation.navigate('Home');
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: hp(24),
  },
  logo: {
    width: wp(150),
    height: hp(150),
  },
  centered: {
    alignItems: 'center',
  },
  titleText: {
    ...fontSizing(26, 1),
    marginVertical: hp(10),
    color: Colors.whiteColor,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
  },
  scoreText: {
    ...fontSizing(26, 1),
    marginVertical: hp(10),
    color: Colors.whiteColor,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: Colors.whiteColor,
    marginHorizontal: wp(20),
    marginVertical: hp(20),
    padding: wp(12),
    borderRadius: wp(12),
    shadowColor: Colors.blackColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  resultText: {
    ...fontSizing(20),
    marginBottom: hp(10),
  },
  profileText: {
    ...fontSizing(26),
    marginBottom: hp(10),
    fontWeight: 'bold',
    color: Colors.blackColor,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: hp(20),
  },
  labelLeft: {
    position: 'absolute',
    left: 0,
    top: -22,
    alignItems: 'center',
  },
  lowText: {
    color: Colors.greenColor,
  },
  labelMiddle: {
    position: 'absolute',
    top: -22,
    alignItems: 'center',
  },
  mediumText: {
    color: Colors.orangeColor,
  },
  labelRight: {
    position: 'absolute',
    right: 0,
    top: -22,
    alignItems: 'center',
  },
  highText: {
    color: Colors.redColor,
  },
  progressView: {
    width: '100%',
    height: hp(22),
    marginTop: hp(10),
  },
  buttonStyle: {
    marginTop: hp(20),
    backgroundColor: Colors.primaryColor,
  },
  buttonTextStyle: {
    fontWeight: 'bold',
  },
});

export default ResultScreen;
