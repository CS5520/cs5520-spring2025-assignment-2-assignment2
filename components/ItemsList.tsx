
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseSetup";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Diet, Activity } from "../firebase/firestore";
import { useEffect, useState } from "react";
import {styles} from "../constants/styles";

interface ItemsListProps {
    type: "diet" | "activity";
    openAdd: () => void;
}

export default function ItemsList({ type, openAdd}: ItemsListProps) {
    const [items, setItems] = useState<(Diet | Activity)[]>([]);

    useEffect(() => {
        const collectionRef = collection(db, type === "diet" ? "diets" : "activities");
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                const docData = doc.data();
                return type === "diet"
                    ? ({ id: doc.id, ...docData } as Diet)
                    : ({ ...docData } as Activity);
            });
            setItems(data);
        });

        return () => unsubscribe();
    }, [type]);

    return (
        <View style={styles.container}>
            
            
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>

                        <View style={styles.leftSection}>
                            <Text style={styles.itemTitle}>
                                {type === "diet" ? (item as Diet).description : (item as Activity).activity}
                            </Text>
                            {(item as Diet).important && <Text style={styles.warning}>⚠️</Text>}
                        </View>


                        <View style={styles.rightSection}>
                            <Text style={styles.dateText}>
                                {item.date ? new Date(item.date.seconds * 1000).toDateString() : "No Date Available"}
                            </Text>
                            <Text style={styles.valueText}>
                                {type === "diet"
                                    ? `${(item as Diet).calories} kcal`
                                    : `${(item as Activity).duration} min`}
                            </Text>
                        </View>
                    </View>
                )}
            />

























            {/* <View style={styles.listContainer}>
                {items.map((item) => (
                    <View key={item.id} style={styles.itemCard}>
                        {type === "diet" ? (
                            <>
                                <Text style={styles.itemText}>Description: {(item as Diet).description}</Text>
                                <Text style={styles.itemText}>Calories: {(item as Diet).calories} kcal</Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.itemText}>Activity: {(item as Activity).name}</Text>
                                <Text style={styles.itemText}>Duration: {(item as Activity).duration} min</Text>
                            </>
                        )}
                        <Text style={styles.itemText}>
                            Date: {new Date(item.date.seconds * 1000).toDateString()}
                        </Text>
                    </View>
                ))}
            </View> */}
        </View>
    );
}


