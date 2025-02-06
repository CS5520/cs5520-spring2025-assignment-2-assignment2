import { StyleSheet } from "react-native";
import { themes } from "../ThemeContext";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navBar: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#3D3D3D",
  },
  toggleButtons: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  settingsButton: {
    alignItems: "center",
  },
  content: {
    flex: 5,
    alignItems: "center",
    width: "100%",
    backgroundColor: themes.light.backgroundColor,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  activeButton: {
    color: "#007BFF",
  },
  inactiveButton: {
    color: "#CCC",
  },
});
