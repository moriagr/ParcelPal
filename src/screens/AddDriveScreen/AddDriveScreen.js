import React, { useState } from 'react';
import { View, TextInput, Button , StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';

const AddDriveScreen = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const saveDrive2DB = () => {
    database()
      .ref('/drives')
      .push({
        source,
        destination,
        date,
      })
      .then(() => {
        console.log('Drive saved to Firebase!');
      })
      .catch((error) => {
        console.error('Error saving drive to Firebase: ', error);
      });
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
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Post Drive" onPress={saveDrive2DB} />
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
  });

export default AddDriveScreen;
