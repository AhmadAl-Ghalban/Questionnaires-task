import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, ViewStyle, TextStyle} from 'react-native';

const TextTyped = ({content, duration, style, textStyle, onFinish}) => {
  const animatedValues = useRef(
    content
      .trim()
      .split(' ')
      .map(() => new Animated.Value(0)),
  ).current;
  const textArr = content.trim().split(' ');

  useEffect(() => {
    animated();

    // Cleanup function to stop animations if the component unmounts
    return () => {
      animatedValues.forEach(value => value.stopAnimation());
    };
  }, []);

  const animated = (toValue = 1) => {
    const animations = textArr.map((_, i) => {
      return Animated.timing(animatedValues[i], {
        toValue,
        duration,
        useNativeDriver: true,
      });
    });

    Animated.stagger(
      duration / 5,
      toValue === 0 ? animations.reverse() : animations,
    ).start(() => {
      setTimeout(() => animated(toValue === 0 ? 1 : 0), 1000);
      if (onFinish) {
        onFinish();
      }
    });
  };

  return (
    <View style={[style, styles.textWrapper]}>
      {textArr.map((word, index) => (
        <Animated.Text
          key={`${word}-${index}`}
          style={[
            textStyle,
            {
              opacity: animatedValues[index],
              transform: [
                {
                  translateY: Animated.multiply(
                    animatedValues[index],
                    new Animated.Value(-5),
                  ),
                },
              ],
            },
          ]}>
          {word}
          {`${index < textArr.length ? ' ' : ''}`}
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center', // Ensures text alignment is centered
  },
});

export default TextTyped;
