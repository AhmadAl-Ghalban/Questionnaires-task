import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {fontSizing, hp, wp} from '../../utils/platform';
import CustomButton from '../../component/Button';
import TextTyped from '../../component/textTyped';
import Colors from '../../constants/Colors';
import logo from '../../assets/logo.png';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <TextTyped
            content=" Welcome to RAKBANK"
            textStyle={styles.textTypedStyle}
            style={styles.textTypedContainer}
            duration={500}
          />
          <Text style={styles.descriptionText}>
            Understanding your risk profile is essential to making informed
            investment decisions. By answering a few simple questions, you can
            gain insight into your risk tolerance and make choices that align
            with your financial goals. Let's get started on discovering your
            unique risk profile!
          </Text>
          <CustomButton
            buttonStyle={styles.buttonStyle}
            title="Start Questionnaire"
            onPress={() => navigation.navigate('Questionnaire')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: wp(150),
    height: hp(150),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: wp(8),
  },
  textTypedContainer: {},
  textTypedStyle: {
    ...fontSizing(20),
    fontWeight: 'bold',
    fontFamily: 'Menlo',
    marginBottom: 14,
    color: Colors.blackColor,
  },
  descriptionText: {
    ...fontSizing(20),
    fontWeight: 'bold',
    fontFamily: 'Menlo',
    marginBottom: 14,
    color: Colors.blackColor,
    textAlign: 'center', // Ensures text alignment is centered
  },
  buttonStyle: {
    marginTop: hp(20),
    backgroundColor: Colors.primaryColor,
  },
});

export default HomeScreen;
