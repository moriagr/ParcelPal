// import {StyleSheet, Platform, Pressable } from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Button as RNEButton } from "@rneui/themed";
// import { TextInput, Button } from "react-native-paper";
// import { Datepicker as RNKDatepicker } from "@ui-kitten/components";
// import { Padding, FontFamily, Border } from "../GlobalStyles";
// import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";



// const styles = StyleSheet.create({
//   backBtn: {
//     padding: 10,
//   },
//   backBtn1: {
//     flex: 1,
//     flexDirection: "column",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//   },
//   dateInputDatePickerLabel: {
//     color: "rgba(0, 0, 0, 0)",
//   },
//   dateInputDatePickerCaption: {
//     color: "rgba(0, 0, 0, 0)",
//   },
//   dateInputDatePickerPlaceHolder: {
//     fontWeight: "500",
//     fontFamily: "Inter-Medium",
//     color: "#a9a9a9",
//     fontSize: 12,
//   },
//   dateInputDatePickerValue: {},
//   postButtonBtn: {
//     color: "#292929",
//     fontSize: 18,
//     fontWeight: "500",
//     fontFamily: "Inter-Medium",
//   },
//   postButtonBtn1: {
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   postGroupScrollViewContent: {
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   addDriveFlexBox: {
//     undefined: "",
//     flex: 1,
//   },
//   frameFlexBox: {
//     justifyContent: "center",
//     alignSelf: "stretch",
//   },
//   inputFlexBox: {
//     maxHeight: 50,
//     minWidth: 60,
//     paddingVertical: Padding.p_xs,
//     justifyContent: "space-between",
//     alignSelf: "flex-start",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   addDrive1: {
//     fontSize: 16,
//     letterSpacing: -0.2,
//     fontWeight: "500",
//     fontFamily: FontFamily.interMedium,
//     color: "#292929",
//     textAlign: "left",
//     marginLeft: 138,
//     flex: 1,
//   },
//   frame1: {
//     width: 232,
//     flexDirection: "row",
//     overflow: "hidden",
//   },
//   frame: {
//     overflow: "hidden",
//   },
//   sourceInput: {
//     paddingHorizontal: 9,
//     borderRadius: Border.br_xl,
//   },
//   destinationInput: {
//     paddingHorizontal: 8,
//     marginTop: 10,
//     borderRadius: Border.br_6xl,
//   },
//   dateInput: {
//     marginTop: 10,
//   },
//   inputs: {
//     alignSelf: "stretch",
//     alignItems: "center",
//   },
//   postButton: {
//     marginTop: 30,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   postGroup: {
//     alignSelf: "center",
//     backgroundColor: "#f1f1f1",
//     shadowColor: "rgba(0, 0, 0, 0.25)",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowRadius: 4,
//     elevation: 4,
//     shadowOpacity: 1,
//     padding: 15,
//     borderRadius: Border.br_6xl,
//   },
//   frame2: {
//     marginTop: 120,
//     overflow: "hidden",
//   },
//   addDrive: {
//     backgroundColor: "#fff",
//     borderStyle: "solid",
//     borderColor: "#b0afaf",
//     borderWidth: 6,
//     width: "100%",
//     paddingHorizontal: 20,
//     paddingVertical: 65,
//     alignItems: "center",
//     overflow: "hidden",
//     borderRadius: Border.br_xl,
//   },
// });

// // style sheet
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: 16,
//     },
//     input: {
//       height: 40,
//       borderColor: 'gray',
//       borderWidth: 1,
//       marginBottom: 12,
//       padding: 8,
//       width: '100%',
//     },
//     postButton: {
//         ...Platform.select({
//           ios: {
//             padding: 15,
//             borderRadius: 8,
//             backgroundColor: 'black',
//           },
//           android: {
//             // backgroundColor: '#3498db',
//             padding: 15,
//             borderRadius: 8,
//             elevation: 3,
//             backgroundColor: 'black',
//           },
//         }),
//     },
//   });