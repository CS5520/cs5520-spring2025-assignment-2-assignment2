import { StyleSheet, Text, View, Button } from "react-native";
import ItemList from "../components/ItemsList";

interface AllActivitiesProps {
  onAdd: () => void;
  onGoToDiets: () => void;
  onGoToSettings: () => void;
}

export default function AllActivities({ onAdd, onGoToDiets, onGoToSettings }: AllActivitiesProps) {
  return (
    <View style={styles.container} testID="all-activities-view">
      <View style={styles.header}>
        <View style={styles.switchButton}>
        <Button title="Activities"  disabled={true}/>
        <Button title="Diets" onPress={onGoToDiets} />
        </View>
        <Button title="Settings" onPress={onGoToSettings} />
      </View>
      <Text style={styles.title} testID="all-activities">All Activities</Text>
      <Button title="Add" onPress={onAdd}/>
      <ItemList type="activity" />
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
