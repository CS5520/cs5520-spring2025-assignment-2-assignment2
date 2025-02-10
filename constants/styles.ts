import { StyleSheet } from "react-native";

// styles for AllDiets.tsx and AllActivities.tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
  },
  listContainer: {
    flex: 1,
    marginTop: 1,
  },
});

// styles for AddDiet.tsx and AddActivities.tsx
export const styles_ = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    zIndex: 1000,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderColor: "black",
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 2,
  },
  dropdown: {
    backgroundColor: "white",
    borderColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default styles;
