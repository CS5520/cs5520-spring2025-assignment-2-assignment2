import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { onSnapshot, Timestamp } from "firebase/firestore";
import { Alert, StyleSheet, View, Pressable } from "react-native";
import { ThemeContext } from "@/ThemeContext";
import { writeToDB } from "@/firebase/firestore";
import { router } from "expo-router";
import config from "@/config";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));
jest.mock("expo-font");
jest.mock("@expo/vector-icons", () => {
  const MockIcon = jest.fn(({ name, onPress, testID }) => <></>);

  return new Proxy(
    {},
    {
      get: () => MockIcon, // Returns the same mock component for any icon set
    }
  );
});

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  addDoc: jest.fn(),
  getDoc: jest.fn(),
  collection: jest.fn(),
  onSnapshot: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  Timestamp: {
    fromDate: jest.fn(),
  },
}));
jest.spyOn(require("@/firebase/firestore"), "writeToDB");

const unsubscribeMock = jest.fn();

// Update the mock to return our unsubscribe function
(onSnapshot as jest.Mock).mockReturnValue(unsubscribeMock);
jest.mock("expo-router", () => ({
  ...jest.requireActual("expo-router"),
  useLocalSearchParams: jest.fn(() => ({})), // Default mock
  Stack: {
    Screen: jest.fn(() => null), // Mock Stack.Screen
  },
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
}));
const toggleThemeMock = jest.fn();
const mockTheme = {
  theme: {
    backgroundColor: "white",
    textColor: "black",
    navigationBackgroundColor: "white",
    navigationTextColor: "black",
  },
  toggleTheme: toggleThemeMock,
};
const newMockTheme = {
  theme: {
    backgroundColor: "black",
    textColor: "white",
    navigationBackgroundColor: "black",
    navigationTextColor: "white",
  },
  toggleTheme: toggleThemeMock,
};

describe("AddActivity Screen", () => {
  const AddActivity = require(config.AddActivityPath).default;

  test("renders correctly with all inputs", () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddActivity />
      </ThemeContext.Provider>
    );

    // expect(getByTestId("add-activity")).toBeTruthy();
    expect(getByText(/^Activity/i)).toBeTruthy();
    expect(getByTestId("dropdown-picker")).toBeTruthy();

    expect(getByText(/Duration/i)).toBeTruthy();
    expect(getByPlaceholderText(/duration/i)).toBeTruthy();

    expect(getByText(/Date/i)).toBeTruthy();
    expect(getByPlaceholderText(/Date/i)).toBeTruthy();

    expect(getByText(/Cancel/i)).toBeTruthy();
    expect(getByText(/Save/i)).toBeTruthy();
  });

  test("pressing cancel navigates back", async () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddActivity />
      </ThemeContext.Provider>
    );
    const backButton = getByText(/cancel/i);
    await waitFor(() => {
      fireEvent.press(backButton); // Navigate back
    });
    expect(router.back).toHaveBeenCalled();
  });

  test("opening dropdown shows all the items", async () => {
    const { getByTestId, findByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddActivity />
      </ThemeContext.Provider>
    );
    const dropdown = getByTestId("dropdown-picker");
    await waitFor(() => {
      fireEvent(dropdown, "setOpen", true);
    });
    const walkingOption = findByText(/walking/i);
    expect(walkingOption).toBeTruthy();
    const runningOption = findByText(/running/i);
    expect(runningOption).toBeTruthy();
    const swimmingOption = findByText(/swimming/i);
    expect(swimmingOption).toBeTruthy();
    const weightsOption = findByText(/weights/i);
    expect(weightsOption).toBeTruthy();
    const yogaOption = findByText(/yoga/i);
    expect(yogaOption).toBeTruthy();
    const cyclingOption = findByText(/cycling/i);
    expect(cyclingOption).toBeTruthy();
    const hikingOption = findByText(/hiking/i);
    expect(hikingOption).toBeTruthy();
  });

  test("tapping on the date textinput brings up the datepicker and set it as today's date", async () => {
    const { queryByTestId, getByPlaceholderText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddActivity />
      </ThemeContext.Provider>
    );
    let datepicker = queryByTestId("datetime-picker");
    expect(datepicker).toBeFalsy();

    const datepickerTextInput = getByPlaceholderText(/Date/i);
    await waitFor(() => {
      fireEvent(datepickerTextInput, "onPressIn");
    });
    datepicker = queryByTestId("datetime-picker");
    expect(datepicker).toBeTruthy();
    expect(datepickerTextInput.props.value).toBe(new Date().toDateString());
  });
  jest.spyOn(Alert, "alert");

  test("shows error when submitting with empty inputs", async () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddActivity />
      </ThemeContext.Provider>
    );

    await waitFor(() => {
      fireEvent.press(getByText(/Save/i));
    });
    expect(Alert.alert).toHaveBeenCalledWith(
      expect.stringMatching(/invalid/i), // Check for part of the title
      expect.stringMatching(/check/i) // Check for part of the message
    );
  });

  jest.spyOn(Alert, "alert");

  test("shows error when submitting with empty inputs", async () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddActivity />
      </ThemeContext.Provider>
    );

    await waitFor(() => {
      fireEvent.press(getByText(/Save/i));
    });
    expect(Alert.alert).toHaveBeenCalledWith(
      expect.stringMatching(/invalid/i), // Check for part of the title
      expect.stringMatching(/check/i) // Check for part of the message
    );
  });

  test("shows error when submitting with invalid duration value (negative number or alphabetic)", async () => {
    const { getByText, queryByTestId, getByPlaceholderText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddActivity />
      </ThemeContext.Provider>
    );

    let datepicker = queryByTestId("datetime-picker");
    expect(datepicker).toBeFalsy();
    const datepickerTextInput = getByPlaceholderText(/Date/i);
    await waitFor(() => {
      fireEvent(datepickerTextInput, "onPressIn");
    });
    datepicker = queryByTestId("datetime-picker");
    expect(datepicker).toBeTruthy();
    expect(datepickerTextInput.props.value).toBe(new Date().toDateString());

    const dropdown = queryByTestId("dropdown-picker");
    await waitFor(() => {
      fireEvent(dropdown, "setValue", "Running");
    });

    const durationInput = getByPlaceholderText(/duration/i);
    expect(durationInput).toBeTruthy();
    act(() => {
      fireEvent.changeText(durationInput, "-1");
    });

    await waitFor(() => {
      fireEvent.press(getByText(/Save/i));
    });
    expect(Alert.alert).toHaveBeenCalledWith(
      expect.stringMatching(/invalid/i), // Check for part of the title
      expect.stringMatching(/check/i) // Check for part of the message
    );

    act(() => {
      fireEvent.changeText(durationInput, "ab");
    });

    await waitFor(() => {
      fireEvent.press(getByText(/Save/i));
    });
    expect(Alert.alert).toHaveBeenCalledWith(
      expect.stringMatching(/invalid/i), // Check for part of the title
      expect.stringMatching(/check/i) // Check for part of the message
    );
  });

  it("toggles theme in add activitiy when theme button is pressed ", async () => {
    const { getByTestId, rerender } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddActivity />
      </ThemeContext.Provider>
    );

    // Check that Activities screen is rendered
    // const addActivityTitle = getByTestId("add-activity");
    // expect(addActivityTitle).toBeTruthy();
    // const originalTextColor = StyleSheet.flatten(
    //   addActivityTitle.props.style
    // ).color;
    // expect(originalTextColor).toBe("black");

    const originalAddDietsView = getByTestId("add-activity-view");
    expect(originalAddDietsView).toBeTruthy(); // Verifies Diet screen button is visible
    const originalBackgroundColor = StyleSheet.flatten(
      originalAddDietsView.props.style
    ).backgroundColor;
    expect(originalBackgroundColor).toBe("white");

    // Re-render with the new theme
    rerender(
      <ThemeContext.Provider value={newMockTheme}>
        <AddActivity />
      </ThemeContext.Provider>
    );

    // Check if the theme color has been updated

    // const newTitle = getByTestId("add-activity");
    // const newTextColor = StyleSheet.flatten(newTitle.props.style).color;
    // expect(newTextColor).toBe("white");
    // expect(newTextColor).not.toBe(originalTextColor);

    const newDietsView = getByTestId("add-activity-view");
    expect(newDietsView).toBeTruthy(); // Verifies Diet screen button is visible
    const newBackgroundColor = StyleSheet.flatten(
      newDietsView.props.style
    ).backgroundColor;
    expect(newBackgroundColor).toBe("black");
    expect(newBackgroundColor).not.toBe(originalBackgroundColor);
  });

  test("submits form successfully with valid inputs - important: false", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddActivity />
      </ThemeContext.Provider>
    );

    const dropdown = getByTestId("dropdown-picker");
    await waitFor(() => {
      fireEvent(dropdown, "setValue", "Running");
    });
    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText(/Duration/i), "45");
    });
    const datepickerTextInput = getByPlaceholderText(/Date/i);
    await waitFor(() => {
      fireEvent(datepickerTextInput, "onPressIn");
    });
    await waitFor(() => {
      fireEvent.press(getByText("Save"));
    });

    await waitFor(() => {
      expect(writeToDB).toHaveBeenCalled();
      expect(writeToDB).toHaveBeenCalledWith("activities", {
        duration: "45",
        activity: "Running",
        date: Timestamp.fromDate(new Date()),
        important: false,
      });
      expect(router.back).toHaveBeenCalled();
    });
  });
  test("submits form successfully with valid inputs - important: true , running", async () => {
    jest.spyOn(require("@/firebase/firestore"), "writeToDB");

    const { getByText, getByPlaceholderText, getByTestId } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddActivity />
      </ThemeContext.Provider>
    );

    const dropdown = getByTestId("dropdown-picker");
    await waitFor(() => {
      fireEvent(dropdown, "setValue", "Running");
    });
    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText(/Duration/i), "75");
    });
    const datepickerTextInput = getByPlaceholderText(/Date/i);
    await waitFor(() => {
      fireEvent(datepickerTextInput, "onPressIn");
    });
    await waitFor(() => {
      fireEvent.press(getByText("Save"));
    });

    await waitFor(() => {
      expect(writeToDB).toHaveBeenCalled();
      expect(writeToDB).toHaveBeenCalledWith("activities", {
        duration: "75",
        activity: "Running",
        date: Timestamp.fromDate(new Date()),
        important: true,
      });
      expect(router.back).toHaveBeenCalled();
    });
  });

  test("submits form successfully with valid inputs - important: true , weights", async () => {
    jest.spyOn(require("@/firebase/firestore"), "writeToDB");

    const { getByText, getByPlaceholderText, getByTestId } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddActivity />
      </ThemeContext.Provider>
    );

    const dropdown = getByTestId("dropdown-picker");
    await waitFor(() => {
      fireEvent(dropdown, "setValue", "Weights");
    });
    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText(/Duration/i), "75");
    });
    const datepickerTextInput = getByPlaceholderText(/Date/i);
    await waitFor(() => {
      fireEvent(datepickerTextInput, "onPressIn");
    });
    await waitFor(() => {
      fireEvent.press(getByText("Save"));
    });

    await waitFor(() => {
      expect(writeToDB).toHaveBeenCalled();
      expect(writeToDB).toHaveBeenCalledWith("activities", {
        duration: "75",
        activity: "Weights",
        date: Timestamp.fromDate(new Date()),
        important: true,
      });
      expect(router.back).toHaveBeenCalled();
    });
  });
});

describe("AddDiet Screen", () => {
  const AddDiet = require(config.AddDietPath).default;

  test("renders correctly with all inputs", () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddDiet />
      </ThemeContext.Provider>
    );

    expect(getByText(/description/i)).toBeTruthy();
    expect(getByPlaceholderText(/description/i)).toBeTruthy();

    expect(getByText(/calories/i)).toBeTruthy();
    expect(getByPlaceholderText(/calories/i)).toBeTruthy();

    expect(getByText(/Date/i)).toBeTruthy();
    expect(getByPlaceholderText(/Date/i)).toBeTruthy();

    expect(getByText(/Cancel/i)).toBeTruthy();
    expect(getByText(/Save/i)).toBeTruthy();
  });
  test("pressing cancel navigates back", async () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddDiet />
      </ThemeContext.Provider>
    );
    const backButton = getByText(/cancel/i);
    await waitFor(() => {
      fireEvent.press(backButton); // Navigate back
    });
    expect(router.back).toHaveBeenCalled();
  });

  test("tapping on the date textinput brings up the datepicker and set it as today's date", async () => {
    const { queryByTestId, getByPlaceholderText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddDiet />
      </ThemeContext.Provider>
    );
    let datepicker = queryByTestId("datetime-picker");
    expect(datepicker).toBeFalsy();

    const datepickerTextInput = getByPlaceholderText(/Date/i);
    await waitFor(() => {
      fireEvent(datepickerTextInput, "onPressIn");
    });
    datepicker = queryByTestId("datetime-picker");
    expect(datepicker).toBeTruthy();
    await waitFor(() => {
      fireEvent(datepickerTextInput, "onPressIn");
    });
    datepicker = queryByTestId("datetime-picker");
    expect(datepicker).toBeFalsy();

    expect(datepickerTextInput.props.value).toBe(new Date().toDateString());
  });

  jest.spyOn(Alert, "alert");

  test("shows error when submitting with empty inputs", async () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddDiet />
      </ThemeContext.Provider>
    );

    await waitFor(() => {
      fireEvent.press(getByText(/Save/i));
    });
    expect(Alert.alert).toHaveBeenCalledWith(
      expect.stringMatching(/invalid/i), // Check for part of the title
      expect.stringMatching(/check/i) // Check for part of the message
    );
  });

  test("shows error when submitting with invalid calories value (negative number or alphabetic)", async () => {
    const { queryByTestId, getByPlaceholderText, getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddDiet />
      </ThemeContext.Provider>
    );
    const descriptionInput = getByPlaceholderText(/description/i);
    expect(descriptionInput).toBeTruthy();
    act(() => {
      fireEvent.changeText(descriptionInput, "test");
    });

    let datepicker = queryByTestId("datetime-picker");
    expect(datepicker).toBeFalsy();
    const datepickerTextInput = getByPlaceholderText(/Date/i);
    await waitFor(() => {
      fireEvent(datepickerTextInput, "onPressIn");
    });
    datepicker = queryByTestId("datetime-picker");
    expect(datepicker).toBeTruthy();
    expect(datepickerTextInput.props.value).toBe(new Date().toDateString());

    const caloriesInput = getByPlaceholderText(/calories/i);
    expect(caloriesInput).toBeTruthy();
    act(() => {
      fireEvent.changeText(caloriesInput, "-1");
    });

    await waitFor(() => {
      fireEvent.press(getByText(/Save/i));
    });
    expect(Alert.alert).toHaveBeenCalledWith(
      expect.stringMatching(/invalid/i), // Check for part of the title
      expect.stringMatching(/check/i) // Check for part of the message
    );

    act(() => {
      fireEvent.changeText(caloriesInput, "ab");
    });

    await waitFor(() => {
      fireEvent.press(getByText(/Save/i));
    });
    expect(Alert.alert).toHaveBeenCalledWith(
      expect.stringMatching(/invalid/i), // Check for part of the title
      expect.stringMatching(/check/i) // Check for part of the message
    );
  });

  test("toggles theme in add diet when theme button is pressed", async () => {
    // Update the theme context (simulate the toggle)

    const { getByTestId, rerender } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddDiet />
      </ThemeContext.Provider>
    );
    // Check that Activities screen is rendered
    // const addDietTitle = getByTestId("add-diet");
    // expect(addDietTitle).toBeTruthy();
    // const originalTextColor = StyleSheet.flatten(
    //   addDietTitle.props.style
    // ).color;
    // expect(originalTextColor).toBe("black");

    const originalAddDietsView = getByTestId("add-diet-view");
    expect(originalAddDietsView).toBeTruthy(); // Verifies Diet screen button is visible
    const originalBackgroundColor = StyleSheet.flatten(
      originalAddDietsView.props.style
    ).backgroundColor;
    expect(originalBackgroundColor).toBe("white");

    // Re-render with the new theme
    rerender(
      <ThemeContext.Provider value={newMockTheme}>
        <AddDiet />
      </ThemeContext.Provider>
    );

    // Check if the theme color has been updated

    // const newTitle = getByTestId("add-diet");
    // const newTextColor = StyleSheet.flatten(newTitle.props.style).color;
    // expect(newTextColor).toBe("white");
    // expect(newTextColor).not.toBe(originalTextColor);

    const newDietsView = getByTestId("add-diet-view");
    expect(newDietsView).toBeTruthy(); // Verifies Diet screen button is visible
    const newBackgroundColor = StyleSheet.flatten(
      newDietsView.props.style
    ).backgroundColor;
    expect(newBackgroundColor).toBe("black");
    expect(newBackgroundColor).not.toBe(originalBackgroundColor);
  });

  test("submits form successfully with valid inputs - important: false", async () => {
    const { getByText, getByPlaceholderText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddDiet />
      </ThemeContext.Provider>
    );

    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText(/description/i), "Breakfast");
    });

    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText(/calories/i), "700");
    });

    const datepickerTextInput = getByPlaceholderText(/Date/i);
    await waitFor(() => {
      fireEvent(datepickerTextInput, "onPressIn");
    });
    await waitFor(() => {
      fireEvent.press(getByText("Save"));
    });

    await waitFor(() => {
      expect(writeToDB).toHaveBeenCalled();
      expect(writeToDB).toHaveBeenCalledWith("diets", {
        calories: "700",
        description: "Breakfast",
        date: Timestamp.fromDate(new Date()),
        important: false,
      });
      expect(router.back).toHaveBeenCalled();
    });
  });

  test("submits form successfully with valid inputs - important: true", async () => {
    const { getByText, getByPlaceholderText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AddDiet />
      </ThemeContext.Provider>
    );

    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText(/description/i), "Breakfast");
    });

    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText(/calories/i), "1000");
    });

    const datepickerTextInput = getByPlaceholderText(/Date/i);
    await waitFor(() => {
      fireEvent(datepickerTextInput, "onPressIn");
    });
    await waitFor(() => {
      fireEvent.press(getByText("Save"));
    });

    await waitFor(() => {
      expect(writeToDB).toHaveBeenCalled();
      expect(writeToDB).toHaveBeenCalledWith("diets", {
        calories: "1000",
        description: "Breakfast",
        date: Timestamp.fromDate(new Date()),
        important: true,
      });
      expect(router.back).toHaveBeenCalled();
    });
  });
});

describe("Settings Screen", () => {
  const Settings = require(config.SettingsPath).default;

  it("renders with the correct initial theme", () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <Settings />
      </ThemeContext.Provider>
    );

    expect(getByText("Toggle Theme")).toBeTruthy();
  });

  it("toggles theme when button is pressed", async () => {
    const { getByText, getByTestId, rerender } = render(
      <ThemeContext.Provider value={mockTheme}>
        <Settings />
      </ThemeContext.Provider>
    );
    // const settingsTitle = getByTestId("settings");
    // expect(settingsTitle).toBeTruthy(); // Verifies Diet screen button is visible
    // const originalTextColor = StyleSheet.flatten(
    //   settingsTitle.props.style
    // ).color;
    // expect(originalTextColor).toBe("black");

    const settingsView = getByTestId("settings-view");
    expect(settingsView).toBeTruthy(); // Verifies Diet screen button is visible
    const originalBackgroundColor = StyleSheet.flatten(
      settingsView.props.style
    ).backgroundColor;
    expect(originalBackgroundColor).toBe("white");

    const button = getByText("Toggle Theme");
    await waitFor(() => {
      fireEvent.press(button);
    });
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
    // Re-render with the new theme
    rerender(
      <ThemeContext.Provider value={newMockTheme}>
        <Settings />
      </ThemeContext.Provider>
    );

    // Check if the theme color has been updated
    // const newSettingsTitle = getByTestId("settings");
    // const newTextColor = StyleSheet.flatten(newSettingsTitle.props.style).color;
    // expect(newTextColor).toBe("white");
    // expect(newTextColor).not.toBe(originalTextColor);

    const newSettingsView = getByTestId("settings-view");
    expect(newSettingsView).toBeTruthy(); // Verifies Diet screen button is visible
    const newBackgroundColor = StyleSheet.flatten(
      settingsView.props.style
    ).backgroundColor;
    expect(newBackgroundColor).toBe("black");
    expect(newBackgroundColor).not.toBe(originalBackgroundColor);
  });
});

describe("All Activities Screen", () => {
  const AllActivities = require(config.AllActivitiesPath).default;
  it("toggles theme in all activities when button is pressed", async () => {
    const { getByTestId, rerender } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AllActivities />
      </ThemeContext.Provider>
    );
    // Check that Activities screen is rendered
    // const activitiestTitle = getByTestId("all-activities");
    // expect(activitiestTitle).toBeTruthy();
    // const originalTextColor = StyleSheet.flatten(
    //   activitiestTitle.props.style
    // ).color;
    // expect(originalTextColor).toBe("black");

    const allAcitivitiesView = getByTestId("all-activities-view");
    expect(allAcitivitiesView).toBeTruthy(); // Verifies Diet screen button is visible
    const originalBackgroundColor = StyleSheet.flatten(
      allAcitivitiesView.props.style
    ).backgroundColor;
    expect(originalBackgroundColor).toBe("white");
    // Re-render with the new theme
    rerender(
      <ThemeContext.Provider value={newMockTheme}>
        <AllActivities />
      </ThemeContext.Provider>
    );

    // Check if the theme color has been updated

    // const newTitle = getByTestId("all-activities");
    // const newTextColor = StyleSheet.flatten(newTitle.props.style).color;
    // expect(newTextColor).toBe("white");

    // expect(newTextColor).not.toBe(originalTextColor);

    const newAcitivitiesView = getByTestId("all-activities-view");
    expect(newAcitivitiesView).toBeTruthy(); // Verifies Diet screen button is visible
    const newBackgroundColor = StyleSheet.flatten(
      newAcitivitiesView.props.style
    ).backgroundColor;
    expect(newBackgroundColor).toBe("black");
    expect(newBackgroundColor).not.toBe(originalBackgroundColor);
  });
});
describe("All Diets Screen", () => {
  const AllDiets = require(config.AllDietsPath).default;

  it("toggles theme in all diets when button is pressed", async () => {
    const { getByRole, getByTestId, rerender, getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <AllDiets />
      </ThemeContext.Provider>
    );
    // Check that Activities screen is rendered
    // const activitiestTitle = getByTestId("all-diets");
    // expect(activitiestTitle).toBeTruthy();
    // const originalTextColor = StyleSheet.flatten(
    //   activitiestTitle.props.style
    // ).color;
    // expect(originalTextColor).toBe("black");

    const originalDietsView = getByTestId("all-diets-view");
    expect(originalDietsView).toBeTruthy(); // Verifies Diet screen button is visible
    const originalBackgroundColor = StyleSheet.flatten(
      originalDietsView.props.style
    ).backgroundColor;
    expect(originalBackgroundColor).toBe("white");

    // Re-render with the new theme
    rerender(
      <ThemeContext.Provider value={newMockTheme}>
        <AllDiets />
      </ThemeContext.Provider>
    );

    // Check if the theme color has been updated

    // const newTitle = getByTestId("all-diets");
    // const newTextColor = StyleSheet.flatten(newTitle.props.style).color;
    // expect(newTextColor).toBe("white");
    // expect(newTextColor).not.toBe(originalTextColor);

    const newDietsView = getByTestId("all-diets-view");
    expect(newDietsView).toBeTruthy(); // Verifies Diet screen button is visible
    const newBackgroundColor = StyleSheet.flatten(
      newDietsView.props.style
    ).backgroundColor;
    expect(newBackgroundColor).toBe("black");
    expect(newBackgroundColor).not.toBe(originalBackgroundColor);
  });
});
