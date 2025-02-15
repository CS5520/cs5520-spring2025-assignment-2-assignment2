import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseSetup";
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Diet, Activity } from "../firebase/firestore";
import { useEffect, useState } from "react";

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
                    : ({ id: doc.id, ...docData } as Activity);
            });
            setItems(data);
        });

        return () => unsubscribe();
    }, [type]);

    return (
        <View style={styles.container}>
            
            
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>
                        {/* 左侧：名称 + 是否重要 */}
                        <View style={styles.leftSection}>
                            <Text style={styles.itemTitle}>
                                {type === "diet" ? (item as Diet).description : (item as Activity).name}
                            </Text>
                            {(item as Diet).important && <Text style={styles.warning}>⚠️</Text>}
                        </View>

                        {/* 右侧：日期 + 数值 */}
                        <View style={styles.rightSection}>
                            <Text style={styles.dateText}>
                                {new Date(item.date.seconds * 1000).toDateString()}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    listContainer: {
        marginTop: 10,
    },
    itemText: {
        fontSize: 14,
    },
    itemCard: {
        flexDirection: "row",
        backgroundColor: "#1e1e1e",  // 卡片背景颜色
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        borderWidth: 1,
        borderColor: "#333",
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    itemTitle: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    warning: {
        fontSize: 16,
        color: "yellow",
        marginLeft: 6,
    },
    rightSection: {
        alignItems: "flex-end",
    },
    dateText: {
        fontSize: 14,
        color: "#bbb",
    },
    valueText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
});
