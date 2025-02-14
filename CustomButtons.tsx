// components/CustomButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle } from "react-native";

interface CustomButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle; // optional extra style
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onPress,
  backgroundColor = "#007BFF",
  textColor = "#FFFFFF",
  style
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor }, style]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
