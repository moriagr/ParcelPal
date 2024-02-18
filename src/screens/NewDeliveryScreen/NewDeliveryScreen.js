import React, { useState } from 'react';
// import { View, TextInput, Text, Button, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from './../../firebase/config'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
// import styles from './styles';

import { SafeAreaView } from "react-native-safe-area-context";
import { Button as RNEButton } from "@rneui/themed";
import { TextInput, Button } from "react-native-paper";
import { Datepicker as RNKDatepicker } from "@ui-kitten/components";
import { Padding, FontFamily, Border } from "../../../GlobalStyles";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";

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
    <View style={styles.frame2}>
                <View style={styles.inputs}>

    <TextInput
      style={[styles.sourceInput, styles.inputFlexBox, { borderWidth: 0, borderColor: 'transparent' }
]}    placeholder="Source"
      mode="flat"
      placeholderTextColor="#a9a9a9"
      theme={{
        fonts: {
          regular: { fontFamily: "Inter", fontWeight: "Medium" },
        },
        colors: { text: "#fff", background: "#fff" , primary: "#788eec"},
      }}
      // value={source}
      onChangeText={setSource}
    />
    <TextInput
              style={[styles.destinationInput, styles.inputFlexBox]}
              placeholder="Destination"
              mode="flat"
              placeholderTextColor="#a9a9a9"
              theme={{
                fonts: {
                  regular: { fontFamily: "Inter", fontWeight: "Medium" },
                },
                colors: { text: "#fff", background: "#fff" , primary: "#788eec"},
              }}
      // value={destination}
      onChangeText={setDestination}
    />
      <RNKDatepicker
              style={styles.dateInput}
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
          style={[styles.sizeInput, styles.inputFlexBox]}
          placeholder="Package size"
          mode="flat"
              placeholderTextColor="#a9a9a9"
              theme={{
                fonts: {
                  regular: { fontFamily: "Inter", fontWeight: "Medium" },
                },
                colors: { text: "#fff", background: "#fff" , primary: "#788eec"},
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
          <Picker.Item label="kg" value="kg" mode="dropdown" style={{ fontSize: 6 }}/>
          <Picker.Item label="lbs" value="lbs" mode="dropdown" style={{ fontSize: 6 }}/>
        </Picker>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    padding: 10,
  },
  backBtn1: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  dateInputDatePickerLabel: {
    color: "rgba(0, 0, 0, 0)",
  },
  dateInputDatePickerCaption: {
    color: "rgba(0, 0, 0, 0)",
  },
  dateInputDatePickerPlaceHolder: {
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    color: "#a9a9a9",
    fontSize: 12,
  },
  dateInputDatePickerValue: {},
  postButtonBtn: {
    color: "#292929",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    paddingHorizontal: 12,
  },
  postButtonBtn1: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postGroupScrollViewContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  frameFlexBox: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
  inputFlexBox: {
    maxHeight: 50,
    minWidth: 200,
    paddingVertical: Padding.p_xs,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    // borderRadius: 20, // Adjust as needed
    // borderRadius: Border.br_xl,
  },
  frame1: {
    width: 232,
    height: 50,
    flexDirection: "row",
    overflow: "hidden",
  },
  frame: {
    overflow: "hidden",
  },
  sourceInput: {
    paddingHorizontal: 8,
    backgroundColor: "white",

  },
  destinationInput: {
    paddingHorizontal: 8,
    marginTop: 10,
    backgroundColor: "white"
  },
  sizeInput: {
    paddingHorizontal: 8,
    marginTop: 10,
    backgroundColor: "white"
  },
  dateInput: {
    marginTop: 10,
  },
  inputs: {
    paddingHorizontal: 24,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  postButton: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#788eec",
    paddingHorizontal: 20,
  },
  postGroup: {
    alignSelf: "center",
    flex: 1, // Added
    backgroundColor: "#f1f1f1",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    padding: 15,
    borderRadius: Border.br_6xl,
  },
  frame2: {
    marginTop: 20,
    overflow: "hidden",
    justifyContent: 'center',
    alignSelf: "stretch",
  },
  addDrive: {
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    overflow: "hidden",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  picker: {
    marginTop: 10,
    // borderRadius: 10,
    // borderColor: 'gray',
    // borderWidth: 0.5,
  },
});

export default NewDeliveryScreen;
