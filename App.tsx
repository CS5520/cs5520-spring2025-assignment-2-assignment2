import React, { useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity, Text  } from "react-native";
import Diets from "./screens/AllDiets";
import AddDiet from "./screens/AddDiet";
import AllActivities from "./screens/AllActivities";
import AddActivity from "./screens/AddActivity";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "./ThemeContext"; // 引入 ThemeProvider
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
    <ThemeProvider>
    <SafeAreaView style={styles.safeContainer}> 
        <View style={styles.container}>
            {/* 顶部导航栏 */}
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

            {/* 显示 Settings 页面 */}
            {showSetting && <Settings/>}

            {/* 显示 Diet 页面 */}
            {showDiets && <Diets/>}

            {/* 显示 Activity 页面 */}
            {showActivity && <AllActivities/>}

        </View>
    </SafeAreaView>
    </ThemeProvider>
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
    paddingTop: 70 , // 顶部导航背景色
    },
    navText: {
        fontSize: 16,
        color: "#CCC",
    },
    activeTab: {
        color: "#007BFF", // 选中的 tab 颜色
        fontWeight: "bold",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    safeContainer: {
        flex: 1,
        backgroundColor: "#333", // 避免和手机的时间栏混到一起
    },
});
