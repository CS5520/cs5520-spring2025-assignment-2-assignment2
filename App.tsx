import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ThemeProvider } from './ThemeContext';
import { COLORS, LAYOUT, TYPOGRAPHY } from './constants/styles';
import AllActivities from './screens/AllActivities';
import AllDiets from './screens/AllDiets';
import AddActivity from './screens/AddActivity';
import AddDiet from './screens/AddDiet';
import Settings from './screens/Settings';

type Screen = 'activities' | 'diets' | 'addActivity' | 'addDiet' | 'settings';

export default function App() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('diets'); // Default to diets screen
    const [previousScreen, setPreviousScreen] = useState<'activities' | 'diets'>('diets');

    const handleScreenChange = (screen: Screen) => {
        if (screen === 'addActivity' || screen === 'addDiet') {
            setPreviousScreen(currentScreen as 'activities' | 'diets');
        }
        setCurrentScreen(screen);
    };

    const handleSave = () => {
        setCurrentScreen(previousScreen);
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 'activities':
                return <AllActivities onAdd={() => handleScreenChange('addActivity')} />;
            case 'diets':
                return <AllDiets onAdd={() => handleScreenChange('addDiet')} />;
            case 'addActivity':
                return <AddActivity onSave={handleSave} />;
            case 'addDiet':
                return <AddDiet onSave={handleSave} />;
            case 'settings':
                return <Settings />;
            default:
                return <AllDiets onAdd={() => handleScreenChange('addDiet')} />;
        }
    };

    return (
        <ThemeProvider>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.topTabs}>
                        {/* Left tab - Activities */}
                        <TouchableOpacity
                            onPress={() => handleScreenChange('activities')}
                            style={styles.tab}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    { color: currentScreen === 'activities' ? COLORS.PRIMARY : COLORS.INACTIVE }
                                ]}
                            >
                                Activities
                            </Text>
                        </TouchableOpacity>

                        {/* Right tab - Diets */}
                        <TouchableOpacity
                            onPress={() => handleScreenChange('diets')}
                            style={styles.tab}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    { color: currentScreen === 'diets' ? COLORS.PRIMARY : COLORS.INACTIVE }
                                ]}
                            >
                                Diets
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Settings button below */}
                    <TouchableOpacity
                        onPress={() => handleScreenChange('settings')}
                        style={styles.settingsButton}
                    >
                        <Text style={styles.settingsText}>Settings</Text>
                    </TouchableOpacity>
                </View>
                {renderScreen()}
            </View>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: LAYOUT.PADDING,
        backgroundColor: COLORS.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.INACTIVE,
    },
    topTabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: LAYOUT.MARGIN,
    },
    tab: {
        paddingVertical: LAYOUT.PADDING / 2,
    },
    tabText: {
        ...TYPOGRAPHY.SUBTITLE,
    },
    settingsButton: {
        alignSelf: 'center',
        paddingBottom: LAYOUT.PADDING / 2,
    },
    settingsText: {
        ...TYPOGRAPHY.BODY,
        color: COLORS.PRIMARY,
    },
});