import React, { useState } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback} from "react-native";
import { useNavigation } from '@react-navigation/native';
import firebase from './../../firebase/config'
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import { TextInput, Button } from "react-native-paper";
import { Datepicker as RNKDatepicker } from "@ui-kitten/components";

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

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    setDateChosen(true)
    // hideDatePicker();
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
    // <View style={styles.container}>
    //   <TextInput
    //     style={inputStyles.input}
    //     placeholder="Source"
    //     value={source}
    //     onChangeText={setSource}
    //   />
    //   <TextInput
    //     style={inputStyles.input}
    //     placeholder="Destination"
    //     value={destination}
    //     onChangeText={setDestination}
    //   />
    //   <TouchableOpacity
    //     style={[inputStyles.input, { backgroundColor: "white", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
    //     onPress={showDatePicker}>
    //     <Text style={styles.buttonTitle}>{DateChosen ? date.toISOString() : "Select Date"}</Text>
    //     <Image source={require("../../../assets/calendar.png")} style={{ width: 30, height: 30 }} />
    //   </TouchableOpacity>
    //   <DateTimePickerModal
    //     style={styles.picker}
    //     isVisible={isDatePickerVisible}
    //     mode="datetime"
    //     onConfirm={handleConfirm}
    //     onCancel={hideDatePicker}
    //   />
    //   <View style={styles.inputRow}>
    //     <TextInput
    //       style={[inputStyles.input, { width: "75%" }]}

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.frame2}>
      <View style={styles.inputs}>

        <TextInput
          style={[styles.sourceInput, styles.inputFlexBox, { borderWidth: 0, borderColor: 'transparent', width: "100%" }
          ]} placeholder="Source"
          mode="flat"
          placeholderTextColor="#a9a9a9"
          theme={{
            fonts: {
              regular: { fontFamily: "Inter", fontWeight: "Medium" },
            },
            colors: { text: "#fff", background: "#fff", primary: "#4b6cb7" },
          }}
          // value={source}
          onChangeText={setSource}
        />
        <TextInput
          style={[styles.destinationInput, styles.inputFlexBox, { width: "100%" }]}
          placeholder="Destination"
          mode="flat"
          placeholderTextColor="#a9a9a9"
          theme={{
            fonts: {
              regular: { fontFamily: "Inter", fontWeight: "Medium" },
            },
            colors: { text: "#fff", background: "#fff", primary: "#4b6cb7" },
          }}
          // value={destination}
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
              Date & Time
            </Text>
          )}
          date={date}
          onSelect={handleConfirm}
          status="basic"
          controlStyle={styles.dateInputDatePickerValue}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={[styles.sizeInput, styles.inputFlexBox, { width: "70%", padding: 0 }]}
            placeholder="Package size"
            mode="flat"
            placeholderTextColor="#a9a9a9"
            theme={{
              fonts: {
                regular: { fontFamily: "Inter", fontWeight: "Medium" },
              },
              colors: { text: "#fff", background: "#fff", primary: "#788eec" },
            }}
            // value={size}
            onChangeText={setSize}
            keyboardType="decimal-pad"
          />
          <Picker
            selectedValue={unit}
            style={styles.picker}
            onValueChange={(itemValue) => setUnit(itemValue)}
          >
            <Picker.Item label="kg" value="kg" mode="dropdown" style={{ fontSize: 16 }} />
            <Picker.Item label="lbs" value="lbs" mode="dropdown" style={{ fontSize: 16 }} />
          </Picker>
        </View>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          style={styles.postButton}
          mode="contained"
          labelStyle={styles.postButtonBtn}
          contentStyle={styles.postButtonBtn1}
          onPress={saveDelivery2DB}
        >
          Post
        </Button>
      </View>
    </View >
    </TouchableWithoutFeedback>
  );
};

export default NewDeliveryScreen;
