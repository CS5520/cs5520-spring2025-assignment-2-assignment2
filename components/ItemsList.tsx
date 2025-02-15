import { View, Text, StyleSheet, FlatList } from 'react-native'
import {useEffect, useState} from 'react'
import { database } from '@/firebase/firebaseSetup';
import { collection, onSnapshot } from 'firebase/firestore';
import { Activity } from '@/screens/AddActivity';
import { Diet } from '@/screens/AddDiet';
import { color, commonItemContainerStyles } from '@/constants/styles';


interface ItemsListProps {
  type: "diet" | "exercise";
}

interface ActivityFromDB extends Activity {
  id: string;
}

interface DietFromDB extends Diet {
  id: string;
}
  
  
const ItemsList = ({type}: ItemsListProps) => {
    const [entries, setEntries] = useState<ActivityFromDB[] | DietFromDB[]>([])
    
    // listen for realtime updates from Firestore
    useEffect(() => {
        const collectionPath = type === "diet" ? "diets" : "activities";
      
        const unsubscribe = onSnapshot(collection(database, collectionPath), (querySnapshot) => {
          if (querySnapshot.empty) {
            setEntries([]);
          } else {
            if (type === "diet") {
              const newEntries: DietFromDB[] = querySnapshot.docs.map((docSnapshot) => ({
                ...(docSnapshot.data() as Diet),
                id: docSnapshot.id,
             }));
              setEntries(newEntries);
            } else {
              const newEntries: ActivityFromDB[] = querySnapshot.docs.map((docSnapshot) => ({
                ...(docSnapshot.data() as Activity),
                id: docSnapshot.id,
              }));
              setEntries(newEntries);
            }
          }
        });
      
        return () => unsubscribe();
      }, [type]);
    

    return (
      <View> 
        {type === "diet" ? (
          <FlatList
            data={entries as DietFromDB[]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={commonItemContainerStyles.container}>
                <Text style={styles.activity}>{item.description}</Text>
                <View style={styles.icon}>
                  {item.important && <Text>⚠️</Text>}
                </View>
                <View style={[styles.cell, styles.date]}>
                  <Text style={styles.text}>{item.date.toDate().toDateString()}</Text>
                </View>
                <Text style={[styles.cell, styles.duration]}>{item.calories}</Text>
              </View>
            )}
          />
          ) : (
          <FlatList
            data={entries as ActivityFromDB[]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={commonItemContainerStyles.container}>
                <Text style={styles.activity}>{item.activity}</Text>
                <View style={styles.icon}>
                  {item.important && <Text>⚠️</Text>}
                </View>
                <View style={[styles.cell, styles.date]}>
                  <Text style={styles.text}>{item.date.toDate().toDateString()}</Text>
                </View>
                <Text style={[styles.cell, styles.duration]}>{item.duration} min</Text>
              </View>
            )}
          />
        )}
      </View>
    );
}

const styles = StyleSheet.create({
  textContainer: {      
    borderRadius: 8, 
    backgroundColor: color.white,            
  },
  activity: {
    flex: 1,
    fontWeight: 'bold',
    color: color.white,
    textAlign: 'left',
  },
  date: {
    flex: 2,
    textAlign: 'center',
  },
  duration: {
    flex: 1, 
    fontWeight: 'bold',
  },
  icon: {
    flex: 0.5,
    alignItems: 'center',
  },
  cell: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: color.brightWhite,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default ItemsList

