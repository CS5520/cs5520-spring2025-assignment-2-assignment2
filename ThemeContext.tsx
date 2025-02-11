import { StyleSheet } from "react-native";
import { lightColors, darkColors, buttonColors } from "./constants/colors";

export const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: lightColors.background,
  },
  header: {
    flexDirection: "column",
    marginBottom: 10,
    backgroundColor: lightColors.topContainer,
    paddingTop: 0,
    width: "100%",
  },
  switchButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttomContainer: {
    marginHorizontal: 20,
  },
  title: {
    color: lightColors.title,
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: lightColors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: lightColors.text,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: lightColors.inputBackground,
  },
  dietInput:{
    height: 100,
    borderColor: lightColors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: lightColors.text,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: lightColors.inputBackground,
  },
  text: {
    color: lightColors.text,
    fontWeight: "bold",
    fontSize: 16,
    margin: 6,
  },
  textDescription: {
    padding:5,
    color: lightColors.text,
    fontWeight: "bold",
    fontSize: 14,
    margin:10,
  },
  textDetail:{
    padding: 6,
    borderRadius: 8,
    color: darkColors.text,
    backgroundColor:darkColors.background,
    fontWeight: "bold",
    fontSize: 14,
    margin: 10,
  },
  placeholder: {
    color: lightColors.placeholder,
  },
  pickerContainer: {
    backgroundColor: lightColors.pickerBackground,
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    width: "100%",
    backgroundColor: lightColors.pickerBackground,
    color: lightColors.pickerText,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  itemBar: {
    margin:20,
    padding:5,
    flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor:lightColors.topContainer,
    borderRadius:16
  },
  activeButton: {
    backgroundColor: buttonColors.primary,
  },
  inactiveButton: {
    backgroundColor: buttonColors.disabled,
  },
});

export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: darkColors.background,
  },
  header: {
    flexDirection: "column",
    marginBottom: 10,
    backgroundColor: darkColors.topContainer,
    paddingTop: 0,
    width: "100%",
  },
  switchButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttomContainer: {
    marginHorizontal: 20,
  },
  title: {
    color: darkColors.title,
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: darkColors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: darkColors.text,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: darkColors.inputBackground,
  },
  dietInput:{
    height: 100,
    borderColor: darkColors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: darkColors.text,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: darkColors.inputBackground,
  },
  textDescription: {
    padding:5,
    color: darkColors.text,
    fontWeight: "bold",
    fontSize: 14,
    margin:10,
  },
  textDetail:{
    padding: 6,
    borderRadius: 8,
    color: lightColors.text,
    backgroundColor:lightColors.background,
    fontWeight: "bold",
    fontSize: 14,
    margin: 10,
  },
  placeholder: {
    color: darkColors.placeholder,
  },
  pickerContainer: {
    backgroundColor: darkColors.pickerBackground,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: darkColors.border,
  },
  picker: {
    width: "100%",
    backgroundColor: darkColors.pickerBackground,
    color: darkColors.pickerText,
    borderColor: darkColors.border,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  itemBar: {
    margin:20,
    padding:5,
    flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor:darkColors.topContainer,
    borderRadius:16
  },

});
