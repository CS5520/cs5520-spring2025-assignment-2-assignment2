import { collection, onSnapshot, Timestamp } from "firebase/firestore"; // Import Firebase functions to interact with Firestore
import { useEffect, useState } from "react"; // Import React hooks for managing component state and side effects
import { FlatList, Text, View } from "react-native"; // Import components from React Native for rendering lists and text
import { database } from "../firebase/firebaseSetup"; // Import Firebase setup to interact with Firestore
import { Item, Activity, Diet } from "./ItemTypes"; // Import the types for Activity and Diet
import { useTheme } from "../ThemeContext"; // Import the custom hook to access the theme and styles

// Define the type for ItemList props, specifying the data type and screen type (activities or diets)
interface ItemListProps {
  type: "activities" | "diets"; // The type of items (activities or diets)
  screenType: "activities" | "diets" // The type of screen to render (activities or diets)
}

const ItemList = ({ type, screenType }: ItemListProps) => {
  const [items, setItems] = useState<Item[]>([]); // State to store fetched items (activities or diets)
  const { styles } = useTheme(); // Access the styles based on the current theme

  // useEffect hook to fetch data from Firestore whenever the 'type' changes
  useEffect(() => {
    const collectionRef = collection(database, type); // Reference the Firestore collection based on the type (activities or diets)
    
    // Subscribe to Firestore collection changes using onSnapshot
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("Cannot fetch data");
        setItems([]); // If no data is found, set items to an empty array
      } else {
        // Map the Firestore documents to the appropriate data format
        const fetchedItems: Item[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const formattedDate = data.date?.toDate ? data.date.toDate() : data.date; // Format the date field if available
          console.log("Fetched data:", data);

          // Check if the type is "activities" or "diets" and return the appropriate item
          if (type === "activities") {
            return {
              id: doc.id,
              date: formattedDate,
              important: data.important || false,
              activity: data.activity || "Unknown",
              duration: data.duration || 0,
            } as Activity; // Return Activity type
          } else {
            return {
              id: doc.id,
              date: formattedDate,
              important: data.important || false,
              description: data.description || "No description",
              calories: data.calories || 0,
            } as Diet; // Return Diet type
          }
        });

        setItems(fetchedItems); // Update the items state with the fetched data
      }
    });

    return () => unsubscribe(); // Clean up the subscription on component unmount
  }, [type]); // Re-run the effect whenever the 'type' changes

  return (
    <View>
      <FlatList
        data={items} // Data to be rendered in the list
        keyExtractor={(item) => item.id ?? "unknown_id"} // Key extractor for each item
        renderItem={({ item }) => (
          <View>
            {screenType === "activities" ? (
              <View style={styles.itemBar}>
                <Text style={styles.textDescription}>{(item as Activity).activity}</Text> 
                {(item as Activity).important ? (
                  <Text style={styles.textDescription}>⚠️</Text> // Show warning icon if the activity is important
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
                  <Text style={styles.textDescription}>⚠️</Text> // Show warning icon if the diet is important
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
