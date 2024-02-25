import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firebase from './../../firebase/config'
import styles from './styles';
import { TextInput, Button } from "react-native-paper";
import { Datepicker as RNKDatepicker } from "@ui-kitten/components";
import { View, Text, Keyboard, TouchableWithoutFeedback } from "react-native";

// Defines a functional component named AddDriveScreen.
const AddDriveScreen = () => {

  // Initializes state variables for managing user input data 
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState();
  const [DateChosen, setDateChosen] = useState(false);

  // using navigation for go back
  const navigation = useNavigation();

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    setDateChosen(true)
  };

  // async Function for saving the drive to the dataBase
  const saveDrive2DB = async () => {

    try {
      setError("")
      //define currentUser as the user now connected through firebase API function auth()
      const currentUser = firebase.auth().currentUser;
      if (!source || !destination || !date || !DateChosen) {
        setError("All fields must be complete")
        return
      }
      if (currentUser) {
        //define user id
        const userId = currentUser.uid;

        //define reference document for the current userId in collection drives
        const drivesRef = firebase.firestore().collection(`users/${userId}/drives`);

        // Creates a new document reference for the drive
        const newDriveRef = drivesRef.doc();

        const dateTimestamp = firebase.firestore.Timestamp.fromDate(date);

        // setting the data from states
        await newDriveRef.set({
          source,
          destination,
          date: dateTimestamp,
          // New drive status will be "new drive" by default
          // This will help us later with clustering drives based on their status
          driveStatus: 'new drive',
          packagesIds: [],
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.frame2}>
      <View style={styles.inputs}>
        <TextInput
          style={[styles.sourceInput, styles.inputFlexBox, { borderWidth: 0, borderColor: 'transparent', width: "100%" }
          ]}
          placeholder="Source"
          mode="flat"
          placeholderTextColor="#a9a9a9"
          
          theme={{
            fonts: {
              regular: { fontWeight: "Medium" },
            },
            colors: { text: "#fff", background: "#fff", primary: "#4b6cb7" },
          }}
          onChangeText={setSource}
        />
        <TextInput
          style={[styles.destinationInput, styles.inputFlexBox, { width: "100%" }]}
          placeholder="Destination"
          mode="flat"
          placeholderTextColor="#a9a9a9"
          theme={{
            fonts: {
              regular: { fontWeight: "Medium" },
            },
            colors: { text: "#fff", background: "#fff", primary: "#4b6cb7" },
          }}
          onChangeText={setDestination}
        />
        <RNKDatepicker
          style={[styles.dateInput, { width: "100%" }]}
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
              Date
            </Text>
          )}
          date={date}
          onSelect={handleConfirm}
          status="basic"
          controlStyle={styles.dateInputDatePickerValue}
        />
        <Text style={{ color: "red" }}>{error}</Text>
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
    </TouchableWithoutFeedback>
  );
};

export default AddDriveScreen;