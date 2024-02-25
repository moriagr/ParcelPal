import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import firebase from './../../firebase/config';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from "react-native-paper";

const PickPackagesScreen = ({ navigation }) => {
  const [availablePackages, setAvailablePackages] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [searchSource, setSearchSource] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);

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

  const handleSourceSearch = (query) => {
    setSearchSource(query);
  };

  const handleDestinationSearch = (query) => {
    setSearchDestination(query);
  };

  const togglePackageSelection = (packageData) => {
    const isSelected = selectedPackages.some((selectedPackage) => selectedPackage.packageid === packageData.packageid);
  
    console.log('Is selected:', isSelected);
    console.log('Before toggle:', selectedPackages);
  
    if (isSelected) {
      setSelectedPackages(selectedPackages.filter((selectedPackage) => selectedPackage.packageid !== packageData.packageid));
    } else {
      setSelectedPackages([...selectedPackages, packageData]);
    }
  
    console.log('After toggle:', selectedPackages);
  };
   
  
  // Apply filters and sorting based on user input
  const filteredPackages = availablePackages
    .filter(packageItem => packageItem.source.toLowerCase().includes(searchSource.toLowerCase()))
    .filter(packageItem => packageItem.destination.toLowerCase().includes(searchDestination.toLowerCase()))
    .filter(packageItem => packageItem.packageStatus === 'waiting');

  return (
    <View style={{ margin: 15 }}>
      <TextInput
        style={[styles.textInput, styles.inputFlexBox, { borderWidth: 0, borderColor: 'transparent', width: "100%" } ]}
        placeholder="Search by source"
        value={searchSource}
        onChangeText={handleSourceSearch}
      />
      <TextInput
        style={[styles.textInput, styles.inputFlexBox, { borderWidth: 0, borderColor: 'transparent', width: "100%" } ]}
        placeholder="Search by destination"
        value={searchDestination}
        onChangeText={handleDestinationSearch}
      />

      <View style={{ marginTop: 10, marginBottom: 10, height: '60%' }}>
        <FlatList
          data={filteredPackages}
          keyExtractor={(item) => item.packagid}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => togglePackageSelection(item)}
              style={[
                styles.packageBox,
                {
                  borderColor: selectedPackages.includes(item) ? '#788eec' : 'transparent',
                  borderWidth: selectedPackages.includes(item) ? 2 : 0,
                },
              ]}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 3 }}>
                {item.source} - {item.destination}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
                {item.packageStatus}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                Package Size: {item.size}{item.unit || "kg"}{' '}
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

export default PickPackagesScreen;
