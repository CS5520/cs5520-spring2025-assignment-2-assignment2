import { View, TextInput, Text, StyleSheet } from 'react-native'
import { ThemeContext } from "@/ThemeContext";
import  { useContext } from "react";
import { color } from "@/constants/styles";


interface InputProps {
  label: string
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;

}

const Input = ({label, placeholder, value, onChangeText}: InputProps) => { 
  const { theme } = useContext(ThemeContext);

  return (  
    <View style={[styles.container, { backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>
      <TextInput
        value={value} 
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
        style={[styles.input, 
          { backgroundColor: theme.backgroundColor === color.tertiaryColor ? 
          color.white : color.primaryColor }]}
      />    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '95%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
 
});

export default Input

