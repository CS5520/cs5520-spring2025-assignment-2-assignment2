// components/ItemsList.tsx
import React, { useEffect, useState, useContext } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Timestamp } from "firebase/firestore";
import { listenToCollection } from "../firebase/firestore";
import { Spacing } from "../constants/styles";
import { ThemeContext } from "../ThemeContext";

interface Item {
  id: string;
  // For activities:
  activity?: string;
  duration?: string;
  // For diets:
  description?: string;
  calories?: string;
  date: Date;
  important: boolean;
}

interface ItemsListProps {
  type: "activity" | "diet";
}

const ItemsList: React.FC<ItemsListProps> = ({ type }) => {
  const [items, setItems] = useState<Item[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const collectionName = type === "activity" ? "activities" : "diets";

    const unsubscribe = listenToCollection(collectionName, (docs) => {
      const newItems: Item[] = docs.map((doc) => {
        // Convert Firestore Timestamp -> JS Date
        let jsDate = new Date();
        if (doc.date && doc.date.toDate) {
          jsDate = doc.date.toDate(); 
        }

        return {
          id: doc.id,
          activity: doc.activity,
          duration: doc.duration,
          description: doc.description,
          calories: doc.calories,
          date: jsDate,
          important: doc.important,
        };
      });
      setItems(newItems);
    });

    return () => unsubscribe();
  }, [type]);

  const renderItem = ({ item }: { item: Item }) => {
    const mainLabel = type === "diet" ? item.description : item.activity;
    const numericVal =
      type === "diet"
        ? item.calories
        : item.duration
        ? `${item.duration} min`
        : "";
    const dateStr = item.date.toDateString();

    return (
      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.leftPart}>
          <Text style={[styles.mainLabel, { color: theme.cardText }]}>
            {mainLabel}
          </Text>
          {item.important && <Text style={styles.warningIcon}>⚠️</Text>}
        </View>

        <View style={[styles.dateBox, { backgroundColor: theme.dateBackground }]}>
          <Text style={[styles.dateText, { color: theme.dateText }]}>
            {dateStr}
          </Text>
        </View>

        <View style={[styles.numericBox, { backgroundColor: theme.numericBackground }]}>
          <Text style={[styles.numericText, { color: theme.numericText }]}>
            {numericVal}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 30 }}
    />
  );
};

export default ItemsList;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: Spacing.small,
    marginBottom: Spacing.small,
  },
  leftPart: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: Spacing.small,
  },
  mainLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 6,
  },
  warningIcon: {
    fontSize: 16,
  },
  dateBox: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: Spacing.small,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "500",
  },
  numericBox: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  numericText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
