import React, { useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity, Text  } from "react-native";
import Diets from "./screens/AllDiets";
import AllActivities from "./screens/AllActivities";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "./ThemeContext"; 
import Settings from "./screens/Settings";


export default function App() {
    const [showDiets, setShowDiets] = useState(true);
    const [showActivity, setShowActivity] = useState(false);
    const [showSetting, setShowSetting] = useState(false);


    const showSet = () => {
        setShowSetting(true);
        setShowDiets(false);
        setShowActivity(false);
    };


    const showActivities = () => {
        setShowActivity(true);
        setShowDiets(false);
        setShowSetting(false);
    };


    const showDietsPage = () => {
        setShowDiets(true);
        setShowActivity(false);
        setShowSetting(false);
    };


    return (
    <Provider>
        <SafeAreaView style={styles.safeContainer}> 
            <View style={styles.container}>

                <View style={styles.navbar}>
                    <TouchableOpacity onPress={showActivities}>
                        <Text style={[styles.navText, showActivity && styles.activeTab]}>Activities</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showSet}>
                    <Text style={[styles.title, showSetting && styles.activeTab]}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showDietsPage}>
                        <Text style={[styles.navText, showDiets && styles.activeTab]}>Diets</Text>
                    </TouchableOpacity>
                </View>

                {showSetting && <Settings/>}


                {showDiets && <Diets/>}


                {showActivity && <AllActivities/>}

            </View>
        </SafeAreaView>
    </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#333", 
    paddingTop: 70 , 
    },
    navText: {
        fontSize: 16,
        color: "#CCC",
    },
    activeTab: {
        color: "#007BFF", 
        fontWeight: "bold",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    safeContainer: {
        flex: 1,
        backgroundColor: "#333", 
    },
});
