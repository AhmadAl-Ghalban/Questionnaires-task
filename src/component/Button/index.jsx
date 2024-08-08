// CustomButton.tsx
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const CustomButton = ({title, onPress, buttonStyle, textStyle, ...rest}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      {...rest}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: Colors.whiteColor,
    fontSize: 16,
  },
});

export default CustomButton;
