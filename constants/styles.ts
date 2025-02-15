import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export const color = {
  // Colors
  primaryColor: 'gainsboro',
  secondaryColor: 'gray',
  tertiaryColor: 'black',
  blueish: '#007BFF',
  whiteish: '#CCC',
  white: 'white',
  brightWhite: '#fff',
};

export const commonContainerStyles = {
  container: {
    flex: 1,
  },
};

export const commonTitleStyles = {
  title: {
    marginTop: 50,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 10,
  } as StyleProp<TextStyle>,
};

export const commonButtonContainerStyles = {
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  } as StyleProp<ViewStyle>,
};

export const commonItemContainerStyles = {
  container: {
    flexDirection: 'row',          
    alignItems: 'center',          
    justifyContent: 'space-around', 
    padding: 8,
    marginVertical: 5,
    backgroundColor: '#333',       
    borderRadius: 10,
    width: '95%', 
    marginLeft: 10, 
    marginBottom: 10,            
  } as StyleProp<ViewStyle>,
};

export const commonTextStyles = {
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  } as StyleProp<TextStyle>,
};
    
