import { Text, View, Button } from "react-native";
import ItemsList from "@/components/ItemsList";
import { ThemeContext } from "@/ThemeContext";
import  { useContext } from "react";
import { 
  commonButtonContainerStyles, 
  commonTitleStyles, 
  commonContainerStyles 
} from "@/constants/styles";

interface AllActivitiesProps {
  onAdd: () => void;
}

export default function AllActivities({ onAdd }: AllActivitiesProps) {
  const { theme } = useContext(ThemeContext);
  
  return (
    <View 
      testID="all-diets-view" 
      style={[commonContainerStyles.container, { backgroundColor: theme.backgroundColor }]} 
    >
      <Text 
        testID="all-diets" 
        style={[commonTitleStyles.title, { color: theme.textColor }]}
      >
      All Diets
      </Text>
      <View style={commonButtonContainerStyles.buttonContainer}>
        <Button title="Add" onPress={onAdd} />
      </View>
      <ItemsList type="diet" />
    </View>
  );
}

