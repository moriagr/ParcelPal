import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Platform, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './../../firebase/config'
import styles from './styles'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import inputStyles from '../inputStyles';
import FloatingLabelInput from './myInput';
import { Picker } from '@react-native-picker/picker';

const EditDeliveryScreen = ({ route }) => {
  const { packageInfo } = route.params;
  console.log('Package Info in EditDeliveryScreen:', packageInfo);

  const [source, setSource] = useState(packageInfo.source);
  const [destination, setDestination] = useState(packageInfo.destination);
  const [date, setDate] = useState(packageInfo.date);
  const [DateChosen, setDateChosen] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [size, setSize] = useState(packageInfo.size);
  const [packageStatus, setPackageStatus] = useState(packageInfo.packageStatus);
  const [Driver, setDriver] = useState(packageInfo.Driver);
  const [packageid, setPackageId] = useState(packageInfo.packageid);
  const [unit, setUnit] = useState(packageInfo.unit||"kg");


  const navigation = useNavigation();

  const saveDelivery2DB = async () => {
    try {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        const deliveriesRef = firebase.firestore().collection(`users/${userId}/deliveries/`);
        const newDeliveryRef = deliveriesRef.doc(packageid);

        let dateTimestamp = date;
        if (DateChosen) {
          dateTimestamp = firebase.firestore.Timestamp.fromDate(date);
        }

        await newDeliveryRef.update({
          source,
          destination,
          date: dateTimestamp,
          size,
          unit,
          packageStatus,
          Driver,
          packageid,
        });

        console.log('Delivery saved to Firestore!');
        navigation.goBack();

        // Trigger fetch after going back
        if (route.params && route.params.onFetchDeliveries) {
          route.params.onFetchDeliveries();
        }

      } else {
        console.error('No current user found');
      }
    } catch (error) {
      console.error('Error saving delivery to Firestore:', error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDateChosen(selectedDate)
    setDate(selectedDate);
    hideDatePicker();
  };


  return (
    <View style={styles.container}>
      <FloatingLabelInput label="Source:" value={source} setValue={setSource} />
      {/* <TextInput
        style={styles.input}
        placeholder="Source"
        value={source}
        onChangeText={setSource}
      /> */}

      <FloatingLabelInput label="Destination:" value={destination} setValue={setDestination} />
      {/* <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      /> */}
      <TouchableOpacity
        style={[inputStyles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
        onPress={showDatePicker}>
        <Text>{JSON.stringify(
          DateChosen ?
            DateChosen.toISOString() :
            typeof date == "object" ?
              date.toDate() :
              date)
        }</Text>
        <Image source={require("../../../assets/calendar.png")} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <View style={styles.inputRow}>
        <FloatingLabelInput label="Package size:" style={{ width: "65%", margin: 0 }} keyboardType={"decimal-pad"} value={size} setValue={setSize} />

        {/* <TextInput
          style={[inputStyles.input, { width: "75%" }]}
          placeholder="Package size"
          value={size}
          onChangeText={setSize}
          keyboardType="decimal-pad"
        /> */}
        <Picker
          selectedValue={unit}
          style={styles.picker}
          onValueChange={(itemValue) => setUnit(itemValue)}

        >
          <Picker.Item label="kg" value="kg" mode="dropdown" />
          <Picker.Item label="lbs" value="lbs" mode="dropdown" />
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.postButton}
        onPress={saveDelivery2DB}>
        <Text style={styles.buttonTitle}>edit package</Text>
      </TouchableOpacity>
    </View>
  );
};


export default EditDeliveryScreen;
