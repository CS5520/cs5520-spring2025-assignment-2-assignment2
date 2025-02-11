import { View, Text, FlatList, StyleSheet } from "react-native";
import { collection, query, onSnapshot } from "firebase/firestore";
import { database } from "../firebase/firestore";
import { Diet } from "@/screens/AddDiet";
import { Activity } from "@/screens/AddActivity";
import { useEffect, useState } from "react";

/**
 * ItemsList Component
 * Displays a list of items (either diet or activities) from Firestore
 * and listens for real-time updates.
 *
 * param  collectionName - The name of the Firestore collection to listen to.
 */
const ItemsList = (props: { collectionName: string }) => {
  const [items, setItems] = useState<Diet[] | Activity[]>([]);

  useEffect(() => {
    const q = query(collection(database, props.collectionName));
    let unsubscribe: () => void;

    // Listen for real-time updates from Firestore
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
  /**
   * Renders an individual item in the list.
   */
  const renderItem = ({ item }: { item: Diet | Activity }) => (
    <View style={styles.itemContainer}>
      {props.collectionName === "diet" ? (
        <View style={styles.contentContainer}>
          <Text style={styles.mainText}>{(item as Diet).description}</Text>
          <Text style={styles.importantText}>{item.important ? "❗" : ""}</Text>
          <Text style={styles.dateText}>
            {item.date.toDate().toDateString()}
          </Text>
          <Text style={styles.detailText}>{(item as Diet).calories} cal</Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.mainText}>{(item as Activity).activity}</Text>
          <Text style={styles.importantText}>{item.important ? "❗" : ""}</Text>
          <Text style={styles.dateText}>
            {item.date.toDate().toDateString()}
          </Text>
          <Text style={styles.detailText}>
            {(item as Activity).duration} min
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    backgroundColor: "white", //#e6f3ff",
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainText: {
    flex: 1.6,
    fontSize: 16,
    color: "#2c3e50", // Dark blue-gray text
    fontWeight: "500",
  },
  importantText: {
    flex: 0.3,
    fontSize: 16,
    textAlign: "center",
  },
  dateText: {
    flex: 2.4,
    fontSize: 16,
    color: "#34495e", // Slightly lighter blue-gray
    textAlign: "right",
  },
  detailText: {
    flex: 1.2,
    fontSize: 16,
    color: "#2c3e50",
    textAlign: "right",
  },
});

export default ItemsList;
