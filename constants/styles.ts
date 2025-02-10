import { StyleSheet } from "react-native";

export const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
      },
      header: {
        flexDirection: 'column',
        marginBottom: 10,
        backgroundColor: 'grey',
        paddingTop: 0,
        width: '100%',
      },
      switchButton: {
        marginTop: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      buttomContainer:{
        marginHorizontal:20
      },
      title: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
      },
      input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 16,
        marginBottom: 16,
      },
      text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        margin: 10,
      },
      placeholder: {
        color: 'black',
      },
      pickerContainer: {
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 8,
      },
      picker: {
        height: 100,
        width: '100%',
        backgroundColor: 'black',
        color:'black'
      },
      buttonContainer:{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: "space-evenly",
      }
});

export const darkStyles = StyleSheet.create({
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
        width: '100%',
      },
      switchButton: {
        marginTop: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      buttomContainer:{
        marginHorizontal:20
      },
      title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
      },
      input: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 16,
        marginBottom: 16,
      },
      text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        margin: 10,
      },
      placeholder: {
        color: 'white',
      },
      pickerContainer: {
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 8,
      },
      picker: {
        height: 100,
        width: '100%',
        backgroundColor: 'white',
        color:'white'
      },
      buttonContainer:{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: "space-evenly",
      }
});
