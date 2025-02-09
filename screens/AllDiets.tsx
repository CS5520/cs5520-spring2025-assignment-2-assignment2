import ItemList from "../components/ItemsList";
import { Button, StyleSheet, Text, View } from "react-native";

interface AllActivitiesProps {
  onAdd: () => void;
  onGoToActivities: () => void;
  onGoToSettings: () => void;
}

export default function AllActivities({ onAdd, onGoToActivities, onGoToSettings }: AllActivitiesProps) {
  return (
    <View style={styles.container} testID="all-diets-view">
      <View style={styles.header}>
          <View style={styles.switchButton}>
      <Button title="Diets"  disabled={true}/>
      <Button title="Activities" onPress={onGoToActivities} />
      </View>
      <Button title="Settings" onPress={onGoToSettings} />
      </View>
      <Text style={styles.title} testID="all-diets">All Diets</Text>
      <Button title="Add" onPress={onAdd} />
      <ItemList type="diet" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: 'grey',
    paddingTop: 0,
    width:'100%'
  },
  switchButton:{
    marginTop:45,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  title: {
    color:'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  addButton: {
    marginVertical: 20,
  }
});

