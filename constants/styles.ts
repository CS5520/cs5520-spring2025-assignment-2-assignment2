import { StyleSheet } from "react-native";
import { lightColors, darkColors } from "./colors";

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
    marginTop: 45,
    flexDirection: "row",
    justifyContent: "space-between",
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
  text: {
    color: lightColors.text,
    fontWeight: "bold",
    fontSize: 16,
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
    marginTop: 45,
    flexDirection: "row",
    justifyContent: "space-between",
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
  text: {
    color: darkColors.text,
    fontWeight: "bold",
    fontSize: 16,
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
});
