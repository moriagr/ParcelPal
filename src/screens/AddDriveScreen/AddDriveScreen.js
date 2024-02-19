import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './../../firebase/config'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from './styles';
import inputStyles from '../inputStyles';
// Defines a functional component named AddDriveScreen.
const AddDriveScreen = () => {

  //using states for empty data at the beginning
  // states will be updated with values the user inputs in to the text fields

  // Initializes state variables using the useState hook for managing user input data 
  // (source, packagesIds, destination, date, driveStatus).
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState();
  const [DateChosen, setDateChosen] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
    setDateChosen(true)
    hideDatePicker();
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

  //input form
  return (
    <View style={styles.container}>
      <TextInput
        style={inputStyles.input}
        placeholder="Source"
        value={source}
        onChangeText={setSource}
      />
      <TextInput
        style={inputStyles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />
      <TouchableOpacity
        style={[inputStyles.input, { backgroundColor: "white", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
        onPress={showDatePicker}>
        <Text style={styles.buttonTitle}>{DateChosen ? date.toISOString() : "Select Date"}</Text>
        <Image source={require("../../../assets/calendar.png")} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <TouchableOpacity
        style={inputStyles.postButton}
        onPress={saveDrive2DB}>
        <Text style={styles.buttonTitle}>Post</Text>
      </TouchableOpacity>

    </View>
  );
};

export default AddDriveScreen;