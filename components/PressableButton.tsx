import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

interface PressableButtonProps {
    pressedInHandler?: () => void;
    pressedStyle?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    componentStyle?: StyleProp<ViewStyle>;
}

export default function PressableButton({children, pressedInHandler, pressedStyle, componentStyle}:PressableButtonProps) {
  return (
    <Pressable 
      onPress={pressedInHandler} 
      style={({pressed})=>{
        return [
          styles.defaultStyle, 
          componentStyle,
          pressed && styles.defaultPressedStyle,
          pressed && pressedStyle];
      }}
    >
      <View>{children}</View>
    </Pressable>

  )
}

const styles = StyleSheet.create({
  defaultStyle: {
    // backgroundColor: "dimgrey",
  },
  defaultPressedStyle: {
    opacity: 0.5,
  }
})