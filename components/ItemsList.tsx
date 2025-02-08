import { View, Text, FlatList } from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { database } from "../firebase/firestore";
import { Diet } from "@/screens/AddDiet";
import { Activity } from "@/screens/AddActivity";
import { useEffect, useState } from "react";

const ItemsList = (props: { collectionName: string }) => {
  const [items, setItems] = useState<Diet[] | Activity[]>([]);

  useEffect(() => {
    const q = query(collection(database, props.collectionName));
    let unsubscribe: () => void;

    if (props.collectionName === "diet") {
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const dietItems: Diet[] = [];
        querySnapshot.forEach((doc) => {
          dietItems.push(doc.data() as Diet);
        });
        setItems(dietItems);
      });
    } else if (props.collectionName === "activities") {
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const activityItems: Activity[] = [];
        querySnapshot.forEach((doc) => {
          activityItems.push(doc.data() as Activity);
        });
        setItems(activityItems);
      });
    }

    return () => unsubscribe && unsubscribe();
  }, [props.collectionName]);

  const renderItem = ({ item }: { item: Diet | Activity }) => (
    <View>
      {props.collectionName === "diet" ? (
        <View>
          <Text>Description: {(item as Diet).description}</Text>
          <Text>Calories: {(item as Diet).calories}</Text>
          <Text>Date: {item.date.toDate().toDateString()}</Text>
          <Text>Important: {item.important ? "❗" : ""}</Text>
        </View>
      ) : (
        <View>
          <Text>Activity: {(item as Activity).activity}</Text>
          <Text>Duration: {(item as Activity).duration} minutes</Text>
          <Text>Date: {item.date.toDate().toLocaleDateString()}</Text>
          <Text>Important: {item.important ? "❗" : ""}</Text>
        </View>
      )}
    </View>
  );

  return <FlatList data={items} renderItem={renderItem} />;
};

export default ItemsList;
