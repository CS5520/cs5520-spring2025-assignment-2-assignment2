import { TextStyle, ViewStyle } from 'react-native';

export const COLORS = {
  PRIMARY: '#007BFF',
  INACTIVE: '#CCC',
  WHITE: 'white',
  BLACK: 'black',
  DANGER: '#FF0000',
};

export const LAYOUT = {
  PADDING: 20,
  MARGIN: 10,
};

export const TYPOGRAPHY: { [key: string]: TextStyle } = {
  TITLE: {
    fontSize: 24,
    fontWeight: '600',
  },
  SUBTITLE: {
    fontSize: 18,
    fontWeight: '500',
  },
  BODY: {
    fontSize: 16,
  },
};

export const INPUT: TextStyle = {
  fontSize: 16,
  padding: 10,
  borderWidth: 1,
  borderRadius: 5,
  marginVertical: 5,
};

export const BUTTON: ViewStyle = {
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  marginVertical: 5,
};
