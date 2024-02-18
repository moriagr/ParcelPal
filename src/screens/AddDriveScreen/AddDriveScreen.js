import React, { useState } from 'react';
// import { View, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './../../firebase/config'
import DateTimePickerModal from "react-native-modal-datetime-picker";
//import styles from './styles';

import { SafeAreaView } from "react-native-safe-area-context";
import { Button as RNEButton } from "@rneui/themed";
import { TextInput, Button } from "react-native-paper";
import { Datepicker as RNKDatepicker } from "@ui-kitten/components";
import { Padding, FontFamily, Border } from "../../../GlobalStyles";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";

// Defines a functional component named AddDriveScreen.
const AddDriveScreen = () => {

  //using states for empty data at the beggining
  // states will be updated with values the user inputs in to the text fields

  // Initializes state variables using the useState hook for managing user input data 
  // (source, packagesIds, destination, date, driveStatus).
  const [source, setSource] = useState('');
  const [packagesIds, setpackagesIds] = useState([]);
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  //new drive status will be "new drive" by default
  // this will help us later with clustring drives based on thier status
  const [driveStatus, setDriveStatus] = useState('new drive');

  // using navigation for go back
  const navigation = useNavigation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  // async Funcion for saving the drive to the dataBase
  const saveDrive2DB = async () => {
    
    try {
      //define currentuse as the user now connected through firebase API function auth()
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        //define user id
        const userId = currentUser.uid;

        //define refrence document for the current userId in colection drives
        const drivesRef = firebase.firestore().collection(`users/${userId}/drives`);

        // Creates a new document reference for the drive
        const newDriveRef = drivesRef.doc();

        const dateTimestamp = firebase.firestore.Timestamp.fromDate(date);

        // seting the data from states
        await newDriveRef.set({
          source,
          destination,
          date: dateTimestamp,
          driveStatus,
          packagesIds,
        });

        // adding driveid to the data
        const driveid = newDriveRef.id;
        await newDriveRef.update({
          driveid,
        });

        console.log('Drive saved to Firestore!');
        // navigator navigates back to home page
        navigation.goBack();

      } else {
        console.error('No current user found');
      }
    } catch (error) {
      console.error('Error saving drive to Firestore:', error);
    }
  };

  //input form
  return (
      <View style={styles.frame2}>
          <View style={styles.inputs}>
            <TextInput
              style={[styles.sourceInput, styles.inputFlexBox, { borderWidth: 0, borderColor: 'transparent' } // Set borderWidth to 0 and borderColor to transparent
            ]}
              placeholder="Source"
              mode="flat"
              placeholderTextColor="#a9a9a9"
              theme={{
                fonts: {
                  regular: { fontFamily: "Inter", fontWeight: "Medium" },
                },
                colors: { text: "#fff", background: "#fff" , primary: "#788eec"},
              }}
              onChangeText={setSource}
            />
            <TextInput
              style={[styles.destinationInput, styles.inputFlexBox]}
              placeholder="Destination"
              mode="flat"
              placeholderTextColor="#a9a9a9"
              theme={{
                fonts: {
                  regular: { fontFamily: "Inter", fontWeight: "Medium" },
                },
                colors: { text: "#fff", background: "#fff" , primary: "#788eec"},
              }}
              onChangeText={setDestination}
            />
            <RNKDatepicker
              style={styles.dateInput}
              label={() => (
                <Text style={styles.dateInputDatePickerLabel}>Date & Time</Text>
              )}
              caption={() => (
                <Text style={styles.dateInputDatePickerCaption}>
                  Select date
                </Text>
              )}
              placeholder={() => (
                <Text style={styles.dateInputDatePickerPlaceHolder}>
                  Date & Time
                </Text>
              )}
              date={date}
              onSelect={handleConfirm}
              status="basic"
              controlStyle={styles.dateInputDatePickerValue}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.postButton}
              mode="contained"
              labelStyle={styles.postButtonBtn}
              contentStyle={styles.postButtonBtn1}
              onPress={saveDrive2DB}
            >
            Post
            </Button>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    padding: 10,
  },
  backBtn1: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  dateInputDatePickerLabel: {
    color: "rgba(0, 0, 0, 0)",
  },
  dateInputDatePickerCaption: {
    color: "rgba(0, 0, 0, 0)",
  },
  dateInputDatePickerPlaceHolder: {
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    color: "#a9a9a9",
    fontSize: 12,
  },
  dateInputDatePickerValue: {},
  postButtonBtn: {
    color: "#292929",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    paddingHorizontal: 12,
  },
  postButtonBtn1: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postGroupScrollViewContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  addDriveFlexBox: {
    undefined: "",
    flex: 1,
  },
  frameFlexBox: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  inputFlexBox: {
    maxHeight: 50,
    minWidth: 200,
    paddingVertical: Padding.p_xs,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    // borderRadius: 20, // Adjust as needed
    // borderRadius: Border.br_xl,
  },
  frame1: {
    width: 232,
    height: 50,
    flexDirection: "row",
    overflow: "hidden",
  },
  frame: {
    overflow: "hidden",
  },
  sourceInput: {
    paddingHorizontal: 8,
    backgroundColor: "white",
    // borderRadius: Border.br_xl,

  },
  destinationInput: {
    paddingHorizontal: 8,
    marginTop: 10,
    // borderRadius: Border.br_6xl,
    backgroundColor: "white"
  },
  dateInput: {
    marginTop: 10,
  },
  inputs: {
    paddingHorizontal: 24,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  postButton: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#788eec",
    paddingHorizontal: 20,
  },
  postGroup: {
    alignSelf: "center",
    flex: 1, // Added
    backgroundColor: "#f1f1f1",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    padding: 15,
    borderRadius: Border.br_6xl,
  },
  frame2: {
    marginTop: 20,
    overflow: "hidden",
    justifyContent: 'center', // Ensure centering within container
    alignSelf: "stretch",
  },
  addDrive: {
    backgroundColor: "#f1f1f1", // "#fff",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    overflow: "hidden",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
});

export default AddDriveScreen;