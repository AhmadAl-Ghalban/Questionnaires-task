import React from 'react';
import renderer from 'react-test-renderer';
import {Text, TouchableOpacity} from 'react-native';
import CustomButton from '../Button';

describe('CustomButton', () => {
  it('renders correctly with default props', () => {
    const tree = renderer
      .create(<CustomButton title="Click Me" onPress={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with custom buttonStyle and textStyle', () => {
    const tree = renderer
      .create(
        <CustomButton
          title="Custom Button"
          onPress={() => {}}
          buttonStyle={{backgroundColor: 'red'}}
          textStyle={{color: 'yellow'}}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with custom title', () => {
    const tree = renderer
      .create(<CustomButton title="Custom Title" onPress={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('triggers onPress callback when pressed', () => {
    const mockOnPress = jest.fn();
    const component = renderer.create(
      <CustomButton title="Press Me" onPress={mockOnPress} />,
    );
    component.root.findByType(TouchableOpacity).props.onPress();
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('contains the correct title', () => {
    const component = renderer.create(
      <CustomButton title="Check Title" onPress={() => {}} />,
    );
    const text = component.root.findByType(Text);
    expect(text.props.children).toBe('Check Title');
  });
});
