import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { database } from "../firebase/firebaseSetup";
import { Item, Activity, Diet } from "./ItemTypes";

interface ItemListProps {
  type: "activity" | "diet";
}

const ItemList = ({ type }: ItemListProps) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const collectionRef = collection(database, type);
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      if (querySnapshot.empty) {
        setItems([]);
      } else {
        const fetchedItems: Item[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const formattedDate = data.date?.toDate ? data.date.toDate() : data.date;

          if (type === "activity") {
            return {
              id: doc.id,
              date: formattedDate,
              important: data.important || false,
              activity: data.activity || "Unknown",
              duration: data.duration || 0,
            } as Activity;
          } else {
            return {
              id: doc.id,
              date: formattedDate,
              important: data.important || false,
              description: data.description || "No description",
              calories: data.calories || 0,
            } as Diet;
          }
        });

        setItems(fetchedItems);
      }
    });

    return () => unsubscribe();
  }, [type]);

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id  ?? "unknown_id"}
        renderItem={({ item }) => (
          <Text>{`Date: ${item.date instanceof Date ? item.date.toLocaleDateString() : item.date}`}</Text>
        )}
      />
    </View>
  );
};

export default ItemList;
