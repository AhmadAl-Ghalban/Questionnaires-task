import React from 'react';
import renderer from 'react-test-renderer';
import {useNavigation} from '@react-navigation/native';
import HeaderComponent from '../src/component/Header';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('react-native-vector-icons/Feather', () => 'FeatherIcon');

describe('HeaderComponent', () => {
  const mockGoBack = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({
      goBack: mockGoBack,
      navigate: mockNavigate,
    });
  });

  it('renders correctly with default props', () => {
    const tree = renderer.create(<HeaderComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with custom title', () => {
    const tree = renderer
      .create(<HeaderComponent title="Custom Title" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with leftButton hidden', () => {
    const tree = renderer
      .create(<HeaderComponent leftButton={{display: false}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with rightButton visible', () => {
    const tree = renderer
      .create(
        <HeaderComponent rightButton={{display: true, name: 'settings'}} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
