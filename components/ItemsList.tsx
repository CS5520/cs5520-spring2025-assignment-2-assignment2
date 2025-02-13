import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { readFromDB } from "../firebase/firestore";
import { Activity, Diet } from "../constants/types";
import { styles } from "../constants/styles";

interface ItemsListProps {
  type: "diet" | "activity";
}

const ItemsList = ({ type }: ItemsListProps) => {
  const [items, setItems] = useState<(Diet | Activity)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await readFromDB(type === "diet" ? "diets" : "activities");
        setItems(data);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };

    fetchData();
  }, [type]);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id || ""}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
              {type === "activity" ? (
                <>
                  <View style={styles.itemNameContainer}>
                    <Text style={styles.itemName}>
                      {(item as Activity).activity}
                    </Text>
                  </View>
                  <View style={[styles.itemInfoContainer, styles.dateContainer]}>
                    <Text style={styles.itemInfoText}>{item.date.toDate().toDateString()}</Text>
                  </View>
                  <View style={[styles.itemInfoContainer, styles.durationContainer]}>
                    <Text style={styles.itemInfoText}>{(item as Activity).duration || 0} min</Text>
                  </View>
                </>
              ) : (
                <>
                  Calories: {((item as Diet).calories || 0) + " "} -
                  Description: {(item as Diet).description || ""}
                </>
              )}
          </View>
        )}
      />
    </View>
  );
};

export default ItemsList;
