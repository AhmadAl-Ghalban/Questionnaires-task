import {
  View,
  Text,
  TouchableOpacity,
  I18nManager,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';

export default function HeaderComponent({
  title = 'title',
  leftButton = {display: true},
  rightButton = {display: false},
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => (leftButton.display ? navigation.goBack() : null)}>
        {leftButton.display && (
          <Feather
            name={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
            size={26}
            color={Colors.blackColor}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => (rightButton.display ? rightButton.action() : null)}>
        {rightButton.display && (
          <Feather name={rightButton.name} size={26} color="#586FB5" />
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    // paddingVertical: 10,
    // paddingHorizontal: 20
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
