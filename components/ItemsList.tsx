import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface ItemsListProps {
  type: 'diet' | 'activity';
}

const ItemsList = ({ type }: ItemsListProps) => {

  const items = [
    { id: "1", description: type === "diet" ? "Salad" : "Running" },
    { id: "2", description: type === "diet" ? "Pasta" : "Swimming" },
  ];

  return (
    <View>
      <FlatList data={items} renderItem={({ item }) => <Text>{item.description}</Text>} />
    </View>
  )
}

export default ItemsList
