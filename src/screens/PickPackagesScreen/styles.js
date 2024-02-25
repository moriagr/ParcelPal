import { StyleSheet, Platform } from 'react-native';
import { Padding, FontFamily, Border } from "../../../GlobalStyles";

export default StyleSheet.create({
    textInput: {
      paddingHorizontal: 8,
      backgroundColor: "white",
    },
    inputFlexBox: {
      marginBottom: 10,
      maxHeight: 50,
      minWidth: 200,
      paddingVertical: Padding.p_xs,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
    chooseButton: {
      marginTop: 30,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#788eec",
      paddingHorizontal: 20,
    },
    chooseButtonBtn: {
      color: 'white',
      fontSize: 18,
      fontWeight: "500",
      fontFamily: "Inter-Medium",
      paddingHorizontal: 12,
    },
    chooseButtonBtn1: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
    },
    buttonContainer: {
      paddingHorizontal: 20,
      alignItems: "center",
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FF6347',  // Text color
    },
    packageBox: {
      padding: 10,
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: 'white',
    },
  });