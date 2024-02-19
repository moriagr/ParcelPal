import React, { useState } from 'react';
import { View, TextInput, Text, Button, Platform, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './../../firebase/config'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import inputStyles from '../inputStyles';


const NewDeliveryScreen = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [DateChosen, setDateChosen] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [size, setSize] = useState('');
  const [error, setError] = useState();
  const [unit, setUnit] = useState('kg');
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

  const saveDelivery2DB = async () => {
    try {
      setError("")
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        const deliveriesRef = firebase.firestore().collection(`users/${userId}/deliveries`);
        const newDeliveryRef = deliveriesRef.doc();

        const dateTimestamp = firebase.firestore.Timestamp.fromDate(date);
        if (!source || !destination || !date || !DateChosen || !size || !unit) {
          setError("All fields must be complete")
          return
        }
        await newDeliveryRef.set({
          source,
          destination,
          date: dateTimestamp,
          size,
          unit,
          packageStatus: "waiting",
          Driver: "",
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
        style={styles.picker}
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={[inputStyles.input, { width: "75%" }]}
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
          <Picker.Item label="lbs" value="lbs" mode="dropdown" />
        </Picker>
      </View>
      <Text style={{ color: "red" }}>{error}</Text>
      <TouchableOpacity
        style={inputStyles.postButton}
        onPress={saveDelivery2DB}>
        <Text style={styles.buttonTitle}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewDeliveryScreen;
