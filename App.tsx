import { View, Text, SafeAreaView, Button } from "react-native";
import { useState } from "react";
import AllActivities from "./screens/AllActivities";
import AllDiet from "./screens/AllDiets";
import AddDiet from "./screens/AddDiet";
import AddActivity from "./screens/AddActivity";

const App = () => {
  const [screen, setScreen] = useState(1);

  function addActivity() {
    console.log("add activity");
    setScreen(2);
  }

  function addDiet() {
    console.log("add diet");
    setScreen(3);
  }

  function back2Activity() {
    console.log("back to activity");
    setScreen(0);
  }

  function back2Diet() {
    console.log("back to diet");
    setScreen(1);
  }
  return (
    <SafeAreaView>
      <View style={{ marginTop: 20 }}>
        <Button
          title="Activities"
          onPress={() => {
            setScreen(0);
          }}
        />
        <Button
          title="Diets"
          onPress={() => {
            setScreen(1);
          }}
        />
        <View>
          <Button title="Settings" onPress={() => {}} />
        </View>
      </View>
      <View>
        {screen === 1 ? <AllDiet onAdd={addDiet} /> : null}
        {screen === 0 ? <AllActivities onAdd={addActivity} /> : null}
        {screen === 3 ? <AddDiet onSave={back2Diet} /> : null}
        {screen === 2 ? <AddActivity onSave={back2Activity} /> : null}
      </View>
    </SafeAreaView>
  );
};

export default App;
