import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import {collection, onSnapshot, Timestamp} from 'firebase/firestore';
import { database } from '../firebase/firebaseSetup';
import colours from '../constants/styles';

interface ItemsListProps {
  type: string;
}

export interface ItemFromDB {
  id: string;
  value: string;
  title: string;
  date: Timestamp;
  isImportant: boolean;
}

export default function ItemsList({type}: ItemsListProps) {
  const [items, setItems] = useState<ItemFromDB[]>([]);

  // set the listener
  useEffect(()=> {
    try {
      const unsubscribe = onSnapshot(collection(database, type), (querySnapshot) => {
        if (querySnapshot.empty) {
          setItems([]);
        } else {
          let newArrayOfItems: ItemFromDB[] = [];
          querySnapshot.forEach((docSnapshot) => {
            const data = docSnapshot.data();
            newArrayOfItems.push({
              id: docSnapshot.id,
              value: data.duration || data.calories,
              title: data.activity || data.description,
              date: data.date,
              isImportant: data.important
            });
          })
          setItems(newArrayOfItems);
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }, [type])

  return (
    <FlatList
      data={items}
      renderItem={({item}) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View style={styles.importantPlaceholder}>
            {item.isImportant && <Text style={styles.important}>{"\u26A0"}</Text>}
          </View>
          <Text style={styles.itemBox}>{item.date.toDate().toDateString()}</Text>
          <Text style={styles.itemValue}>{item.value}{type === 'activities' ? ' min' : ''}</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: colours.topBackground,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTitle: {
    flex: 1,
    fontWeight: "bold",
    color: "white"
  },
  importantPlaceholder: {
    flex: 0.5,
    width: 25, 
    alignItems: "center", 
  },
  important: {
    color: "yellow",
    fontSize: 18,
  },
  itemBox: {
    flex: 1.6,
    backgroundColor: "white",
    fontWeight: "bold",
    padding: 8,
    borderRadius: 5,
    textAlign: "center",
    marginRight: 5,
    
  },
  itemValue: {
    flex: 0.8,
    backgroundColor: "white",
    fontWeight: "bold",
    padding: 8,
    borderRadius: 5,
    textAlign: "center",
  },

})