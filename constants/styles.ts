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
    paddingTop: 50,
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
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginBottom: 10,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
  inputText: {
    fontSize: 16,
    marginVertical: 10,
    alignSelf: "flex-start",
  },
  adjacentButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
  },
  itemContainer: {
    flex: 1,
    backgroundColor: "#373737",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    marginVertical: 10,
    alignSelf: "flex-start",
  },
  itemName: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemNameContainer: {
    flex: 1,
  },
  itemInfoContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
  },
  itemInfoText: {
    fontWeight: "bold",
  },
  dateContainer: {
    width: "45%",
    marginRight: 5,
    alignItems: "center",
  },
  durationContainer: {
    width: "25%",
    alignItems: "center",
  },
});
