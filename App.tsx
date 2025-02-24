import React, { useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity, Text } from "react-native";
import Diets from "./screens/AllDiets";
import AllActivities from "./screens/AllActivities";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "./ThemeContext";
import Settings from "./screens/Settings";
import {styles} from "./constants/styles";

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}


function AppContent() {
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
        <ThemeProvider>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.container_app}>

                    <View style={styles.navbar}>
                        <TouchableOpacity onPress={showActivities}>
                            <Text style={[styles.navText, showActivity && styles.activeTab]}>Activities</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={showSet}>
                            <Text style={[styles.title_app, showSetting && styles.activeTab]}>Settings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={showDietsPage}>
                            <Text style={[styles.navText, showDiets && styles.activeTab]}>Diets</Text>
                        </TouchableOpacity>
                    </View>

                    {showSetting && <Settings />}


                    {showDiets && <Diets />}


                    {showActivity && <AllActivities />}

                </View>
            </SafeAreaView>
        </ThemeProvider>
    );
}

