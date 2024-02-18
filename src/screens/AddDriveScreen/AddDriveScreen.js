import React, { useState } from 'react';
import { View, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './../../firebase/config'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from './styles';

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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Source"
        value={source}
        onChangeText={setSource}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />
      <Button title="Select Date" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Button
        title="Post"
        onPress={saveDrive2DB}
        style={styles.postButton}
      />
    </View>
  );
};

export default AddDriveScreen;