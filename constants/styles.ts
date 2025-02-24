
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    absolutePage: {
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        alignSelf: "center",
        width: "90%",
        backgroundColor: "#fff"
    },
    descriptionInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginTop: 5,
        fontSize: 16,
        width: "90%",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        alignSelf: "center",
        minHeight: 100,

    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        alignSelf: "center",
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    container_setting: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
    },
    listContainer: {
        marginTop: 10,
    },
    itemText: {
        fontSize: 14,
    },
    itemCard: {
        flexDirection: "row",
        backgroundColor: "#1e1e1e",  // 卡片背景颜色
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        borderWidth: 1,
        borderColor: "#333",
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    itemTitle: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    warning: {
        fontSize: 16,
        color: "yellow",
        marginLeft: 6,
    },
    rightSection: {
        alignItems: "flex-end",
    },
    dateText: {
        fontSize: 14,
        color: "#bbb",
    },
    valueText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    navbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#333",
        paddingTop: 70,
    },
    navText: {
        fontSize: 16,
        color: "#CCC",
    },
    activeTab: {
        color: "#007BFF",
        fontWeight: "bold",
    },
    title_app: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    safeContainer: {
        flex: 1,
        backgroundColor: "#333",
    },
    container_app: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

