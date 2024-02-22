import React, { useState, useEffect } from 'react';
import {TouchableOpacity, FlatList, TextInput, Modal, Alert } from 'react-native';
import firebase from './../../firebase/config';
// import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from "react-native-safe-area-context";
import { Button as RNEButton } from "@rneui/themed";
import { TextInput, Button } from "react-native-paper";
import { Datepicker as RNKDatepicker } from "@ui-kitten/components";
import { Padding, FontFamily, Border } from "../../../GlobalStyles";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";

const PickPackagesScreen = ({ navigation }) => {
  const [availablePackages, setAvailablePackages] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchAvailablePackages = async () => {
      try {
        const role = 'Client';
        const deliveriesRef = firebase.firestore().collection('users').where('role', '==', role);
        const clientsSnapshot = await deliveriesRef.get();

        const deliveriesDataPromises = clientsSnapshot.docs.map(async (clientDoc) => {
          const clientId = clientDoc.id;
          const deliveriesRef = clientDoc.ref.collection('deliveries');
          const deliveriesSnapshot = await deliveriesRef.where('packageStatus', '==', 'waiting').get();

          const deliveriesData = deliveriesSnapshot.docs.map((deliveryDoc) => {
            const deliveryData = deliveryDoc.data();
            return { ...deliveryData, clientId };
          });

          return deliveriesData;
        });

        const allDeliveriesData = await Promise.all(deliveriesDataPromises);
        const flattenedDeliveries = allDeliveriesData.flat();

        console.log('Setting deliveries:', flattenedDeliveries.length);
        setAvailablePackages(flattenedDeliveries);

      } catch (error) {
        console.error('Error fetching available deliveries:', error);
      }
    };

    fetchAvailablePackages();
  }, []);

  const choosePackages = async () => {
    try {
      if (selectedPackages.length === 0) {
        alert('Please select packages before delivering.');
        return;
      }

      // delivery logic here
      const driverUser = firebase.auth().currentUser
      const driverId = driverUser.uid;

      const driverDeliveriesRef = firebase.firestore().collection(`users/${driverId}/chosenDeliveries`);

      for (const packageData of selectedPackages) {
        if (!packageData || !packageData.clientId || !packageData.packageid) {
          console.error('Invalid package data:', packageData);
          continue;
        }

        const clientId = packageData.clientId;
        const packageId = packageData.packageid;

        const clientDeliveryRef = firebase.firestore().collection(`users/${clientId}/deliveries`).doc(packageId);
        const clientDeliverySnapshot = await clientDeliveryRef.get();

        if (clientDeliverySnapshot.exists) {
          const clientDeliveryData = clientDeliverySnapshot.data();

          // Add the chosen delivery to the driver's collection
          await driverDeliveriesRef.doc(packageId).set({
            ...clientDeliveryData,
            packageStatus: 'in transit',
            client: clientId,
          });

          // Update the client's delivery status and driver
          await clientDeliveryRef.update({
            packageStatus: 'in transit',
            Driver: driverId,
          });
        }

      }

      Alert.alert(
        'Success',
        `Packages delivered successfully!`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error choosing packages:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setFilterModalVisible(false);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const togglePackageSelection = (packageData) => {
    const isSelected = selectedPackages.some((selectedPackage) => selectedPackage.packagid === packageData.packagid);

    if (isSelected) {
      setSelectedPackages(selectedPackages.filter((selectedPackage) => selectedPackage.packagid !== packageData.packagid));
    } else {
      setSelectedPackages([...selectedPackages, packageData]);
    }
  };

  // Apply filters and sorting based on user input
  const filteredAndSortedPackages = availablePackages
    .filter(packageItem => packageItem.source.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(packageItem => selectedFilter === 'all' || packageItem.packageStatus === selectedFilter)
    .sort((a, b) => sortOrder === 'asc' ? a.destination.localeCompare(b.destination) : b.destination.localeCompare(a.destination));

  return (
    <View style={{ margin: 15 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 0, padding: 5 }}
        placeholder="Search packages by source"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#788eec' }}>Filter: {selectedFilter}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={filterModalVisible}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 10, elevation: 5 }}>
              <TouchableOpacity onPress={() => handleFilterChange('all')}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#788eec', margin: 10 }}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFilterChange('waiting')}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#788eec', margin: 10 }}>Waiting</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFilterChange('in transit')}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#788eec', margin: 10 }}>In Transit</Text>
              </TouchableOpacity>
              {/* Add more filter options based on your package statuses */}
            </View>
          </View>
        </Modal>

        <TouchableOpacity onPress={() => handleSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#788eec' }}>Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 0, marginBottom: 10, height: 260 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Available Packages:</Text>
        <FlatList
          data={filteredAndSortedPackages}
          keyExtractor={(item) => item.packagid}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => togglePackageSelection(item)}
              style={[
                styles.packageBox,
                {
                  borderColor: selectedPackages.includes(item) ? '#ff7700' : 'lightblue',
                  borderWidth: selectedPackages.includes(item) ? 2 : 1,
                },
              ]}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 3 }}>
                {item.source} - {item.destination} : {item.packageStatus}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                <Icon name="cube" size={16} color="#788eec" /> Package Size: {item.size}{item.unit || "kg"}{' '}
                {/* <Icon name="dollar" size={16} color="#788eec" /> Fee: {item.fee} */}
              </Text>
            </TouchableOpacity>
          )}
        />

      </View>

      <View style={styles.buttonContainer}>
        <Button
          style={styles.chooseButton}
          mode="contained"
          labelStyle={styles.chooseButtonBtn}
          contentStyle={styles.chooseButtonBtn1}
          onPress={choosePackages}
        >
        {selectedPackages.length === 0 ? "Choose package" : "Choose " + selectedPackages.length + " packages"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chooseButton: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#788eec",
    paddingHorizontal: 20,

    // borderRadius: 5,  // Adjust the border radius according to your preference
    // borderWidth: 2,  // Border width
    // borderColor: '#FF6347',  // Border color
    // padding: 10,
    // alignItems: 'center',
  },
  chooseButtonBtn: {
    color: "#292929",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    paddingHorizontal: 12,
  },
  chooseButtonBtn1: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  reviewText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6347',  // Text color
  },
});

export default PickPackagesScreen;
