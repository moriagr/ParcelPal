import React, { useState } from 'react';
import { View, TextInput, Button , StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './../../firebase/config'

const AddDriveScreen = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const navigation = useNavigation();

  const saveDrive2DB = async () => {
    try {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        const drivesRef = firebase.firestore().collection(`users/${userId}/drives`);
        const newDriveRef = drivesRef.doc();

        await newDriveRef.set({
          source,
          destination,
          date,
        });

        console.log('Drive saved to Firestore!');
        navigation.goBack();

      } else {
        console.error('No current user found');
      }
    } catch (error) {
      console.error('Error saving drive to Firestore:', error);
    }
  };

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
