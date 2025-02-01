import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { ThemeContext } from '../ThemeContext';
import { COLORS, LAYOUT, TYPOGRAPHY } from '../constants/styles';
import { Timestamp } from 'firebase/firestore';

interface Item {
    id: string;
    date: Timestamp;
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
        const isActivity = type === 'activities';

        return (
            <View style={[styles.item, { borderColor: item.important ? COLORS.PRIMARY : COLORS.INACTIVE }]}>
                <Text style={[styles.itemText, { color: theme.textColor }]}>
                    {isActivity ? `${item.activity} - ${item.duration} minutes` : `${item.description} - ${item.calories} calories`}
                </Text>
                <Text style={[styles.dateText, { color: theme.textColor }]}>{date}</Text>
            </View>
        );
    };

    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={[styles.list, { backgroundColor: theme.backgroundColor }]}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    item: {
        padding: LAYOUT.PADDING,
        marginVertical: LAYOUT.MARGIN / 2,
        marginHorizontal: LAYOUT.MARGIN,
        borderRadius: 5,
        borderWidth: 2,
    },
    itemText: {
        ...TYPOGRAPHY.BODY,
        marginBottom: 5,
    },
    dateText: {
        ...TYPOGRAPHY.BODY,
        opacity: 0.7,
    },
});