import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { database } from "../firebase/firebaseSetup";
import { Item, Activity, Diet } from "./ItemTypes";
import { useTheme } from "./ThemeSwitch";

interface ItemListProps {
  type: "activity" | "diet";
  screenType: "activities" | "diets"
}

const ItemList = ({ type,screenType }: ItemListProps) => {
  const [items, setItems] = useState<Item[]>([]); 
  const { styles } = useTheme(); 

  useEffect(() => {
    const collectionRef = collection(database, type);
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("can not fetch data")
        setItems([]);
      } else {
        const fetchedItems: Item[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const formattedDate = data.date?.toDate ? data.date.toDate() : data.date;
          console.log("Fetched data:", data); 
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
        keyExtractor={(item) => item.id ?? "unknown_id"}
        renderItem={({ item }) => (
          <View>
            {screenType === "activities" ? (
            <View style={styles.itemBar}>
              <Text style={styles.textDescription}>{(item as Activity).activity}</Text>
              {(item as Activity).important ? (
                <Text style={styles.textDescription}>⚠️</Text>
              ) : (
               <Text></Text>
              )}
              <Text style={styles.textDetail}>
              {(item.date instanceof Timestamp
                ? item.date.toDate()
                : typeof item.date === "string"
                ? new Date(item.date)
                : item.date
              ).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
              <Text style={styles.textDetail}>{(item as Activity).duration} min</Text>
            </View>
            ) : (
              <View style={styles.itemBar}>
                <Text style={styles.textDescription}>{(item as Diet).description}</Text>
                {(item as Diet).important ? (
                <Text style={styles.textDescription}>⚠️</Text>
              ) : (
               <Text></Text>
              )}
                <Text style={styles.textDetail}>
              {(item.date instanceof Timestamp
                ? item.date.toDate()
                : typeof item.date === "string"
                ? new Date(item.date)
                : item.date
              ).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
                <Text style={styles.textDetail}>{(item as Diet).calories}</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );  
};

export default ItemList;
