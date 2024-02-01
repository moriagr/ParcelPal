import React, { useState } from 'react';
import { View, TextInput, Button , StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './../../firebase/config'

const AddDriveScreen = () => {
  //using states for empty data at the beggining
  // states will be updated with values the user inputs in to the text fields
  const [source, setSource] = useState('');
  const [packagesIds, setpackagesIds] = useState([]);
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  //new drive status will be "new drive" by default
  // this will help us later with clustring drives based on thier status
  const [driveStatus, setDriveStatus] = useState('new drive');
  // using navigation for go back
  const navigation = useNavigation();

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
        const newDriveRef = drivesRef.doc();

        //seting the data from states
        await newDriveRef.set({
          source,
          destination,
          date,
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
      <TextInput
        style={styles.input}
        placeholder="Date and time"
        value={date}
        onChangeText={setDate}
      />
      <Button
        title="Post"
        onPress={saveDrive2DB}
        style={styles.postButton}
      />
    </View>
  );
};

// style sheet
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      padding: 8,
      width: '100%',
    },
    postButton: {
        ...Platform.select({
          ios: {
            padding: 15,
            borderRadius: 8,
            backgroundColor: 'black',
          },
          android: {
            backgroundColor: '#3498db',
            padding: 15,
            borderRadius: 8,
            elevation: 3,
            backgroundColor: 'black',
          },
        }),
    },
  });

export default AddDriveScreen;
