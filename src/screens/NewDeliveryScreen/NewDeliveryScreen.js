import React, { useState } from 'react';
import { View, TextInput, Text, Button, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './../../firebase/config'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import styles from './styles';

const NewDeliveryScreen = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); 
  const [size, setSize] = useState('');
  const [unit, setUnit] = useState('kg');
  const [packageStatus, setPackageStatus] = useState('waiting');
  const [Driver, setDriver] = useState('');
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

  const saveDelivery2DB = async () => {
    try {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        const deliveriesRef = firebase.firestore().collection(`users/${userId}/deliveries`);
        const newDeliveryRef = deliveriesRef.doc();

        const dateTimestamp = firebase.firestore.Timestamp.fromDate(date);
        
        await newDeliveryRef.set({
          source,
          destination,
          date: dateTimestamp,
          size,
          unit,
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
    <Button title="Select Date" onPress={showDatePicker} />
    <DateTimePickerModal
      style={styles.picker}
      isVisible={isDatePickerVisible}
      mode="datetime"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
    <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Package size"
          value={size}
          onChangeText={setSize}
          keyboardType="decimal-pad"
        />
        <Picker
          selectedValue={unit}
          style={styles.picker}
          onValueChange={(itemValue) => setUnit(itemValue)}

        >
          <Picker.Item label="kg" value="kg" mode="dropdown" />
          <Picker.Item label="lbs" value="lbs" mode="dropdown"/>
        </Picker>
      </View>
  <Button
    title="Post"
    onPress={saveDelivery2DB}
    style={Platform.OS === 'ios' ? styles.iosPostButton : styles.postButton}
  />
    </View>
  );
};

export default NewDeliveryScreen;
