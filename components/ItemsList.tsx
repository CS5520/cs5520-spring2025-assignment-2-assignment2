import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { ThemeContext } from '../ThemeContext';
import { COLORS, LAYOUT, TYPOGRAPHY } from '../constants/styles';

interface Item {
    id: string;
    date: any;
    important: boolean;
    [key: string]: any;
}

interface ItemsListProps {
    type: 'activities' | 'diets';
}

export default function ItemsList({ type }: ItemsListProps) {
    const [items, setItems] = useState<Item[]>([]);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        try {
            const q = query(collection(db, type), orderBy('date', 'desc'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const newItems: Item[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    newItems.push({
                        id: doc.id,
                        date: data.date,
                        important: data.important,
                        ...data,
                    });
                });
                setItems(newItems);
            });

            return () => unsubscribe();
        } catch (error) {
            // console.error("Error fetching items: ", error);
        }
    }, [type]);

    const renderItem = ({ item }: { item: Item }) => {
        const date = item.date.toDate().toDateString();
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemContent}>
                    <Text style={styles.itemName}>
                        {type === 'activities' ? item.activity : item.description}
                    </Text>

                    <View style={styles.rightContent}>
                        {item.important && (
                            <Text style={styles.warningIcon}>⚠️</Text>
                        )}
                        <View style={styles.pillContainer}>
                            <View style={styles.datePill}>
                                <Text style={styles.pillText}>{date}</Text>
                            </View>
                            <View style={styles.valuePill}>
                                <Text style={styles.pillText}>
                                    {type === 'activities' ? `${item.duration} min` : `${item.calories}`}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    itemContainer: {
        backgroundColor: '#333333',
        marginVertical: 6,
        marginHorizontal: LAYOUT.MARGIN,
        borderRadius: 12,
        padding: LAYOUT.PADDING,
    },
    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        ...TYPOGRAPHY.BODY,
        color: 'white',
        fontSize: 18,
        flex: 1,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    warningIcon: {
        fontSize: 16,
        marginRight: 4,
    },
    pillContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    datePill: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    valuePill: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        minWidth: 60,
        alignItems: 'center',
    },
    pillText: {
        color: 'black',
        fontSize: 16,
    },
});