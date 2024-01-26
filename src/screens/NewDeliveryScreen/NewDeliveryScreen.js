import React, { useState } from 'react';
import { View, TextInput, Button , StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './../../firebase/config'

const NewDeliveryScreen = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [size, setSize] = useState('');
  const [packageStatus, setPackageStatus] = useState('waiting');
  const [Driver, setDriver] = useState('');
  const navigation = useNavigation();

  const saveDelivery2DB = async () => {
    try {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        const deliveriesRef = firebase.firestore().collection(`users/${userId}/deliveries`);
        const newDeliveryRef = deliveriesRef.doc();
        
        await newDeliveryRef.set({
          source,
          destination,
          date,
          size,
          packageStatus,
          Driver,
        });

        const packageid = newDeliveryRef.id;

        await newDeliveryRef.update({
          packageid,
        });

        console.log('Delivery saved to Firestore!');
        navigation.goBack();

      } else {
        console.error('No current user found');
      }
    } catch (error) {
      console.error('Error saving delivery to Firestore:', error);
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
      <TextInput
        style={styles.input}
        placeholder="Package size"
        value={size}
        onChangeText={setSize}
      />
      <Button
        title="Post"
        onPress={saveDelivery2DB}
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

export default NewDeliveryScreen;
