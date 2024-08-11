import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {setSplashScreen} from '../../redux/action/splashScreenActions';
import {hp, wp} from '../../utils/platform';
import rakLogo from '../../assets/rak_logo.png';
import Colors from '../../constants/Colors';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSplashScreen(false));
      navigation.navigate('Home');
    }, 2000); // Duration for the splash screen (2 seconds)

    return () => clearTimeout(timer);
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <Image source={rakLogo} style={styles.logo} testID="splash-logo" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
  },
  logo: {
    width: wp(150),
    height: hp(150),
  },
});

export default SplashScreen;
