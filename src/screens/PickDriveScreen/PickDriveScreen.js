import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Modal, Alert } from 'react-native';
import firebase from './../../firebase/config';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const PickDriveScreen = ({ navigation }) => {
  const [availableDrives, setAvailableDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [clientPackages, setClientPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedPackages, setSelectedPackages] = useState([]);

  useEffect(() => {
    // Fetch available drives from the database
    const fetchAvailableDrives = async () => {
      try {
        const role = 'Driver';

        const driversRef = firebase.firestore().collection('users').where('role', '==', role);
        const driversSnapshot = await driversRef.get();

        const drivesDataPromises = driversSnapshot.docs.map(async (driverDoc) => {
          console.log('Fetching drives for driver:', driverDoc.id);
          const drivesRef = driverDoc.ref.collection('drives');
          const drivesSnapshot = await drivesRef.where('driveStatus', '==', 'new drive').get();
          console.log('Drives fetched:', drivesSnapshot.docs.length);

          const drivesData = drivesSnapshot.docs.map((driveDoc) => driveDoc.data());
          return drivesData;
        });

        const allDrivesData = await Promise.all(drivesDataPromises);
        const flattenedDrives = allDrivesData.flat();

        console.log('Setting drives:', flattenedDrives.length);
        setAvailableDrives(flattenedDrives);

      } catch (error) {
        console.error('Error fetching available drives:', error);
      }
    };

    // Fetch client's packages from the database
    const fetchClientPackages = async () => {
      try {

        const clientId = firebase.auth().currentUser.uid;
        const packagesRef = firebase.firestore().collection(`users/${clientId}/deliveries`);
        const snapshot = await packagesRef.where('packageStatus', '==', 'waiting').get();
        const packages = snapshot.docs.map(doc => doc.data());

        setClientPackages(packages);
      } catch (error) {
        console.error('Error fetching client packages:', error);
      }
    };

    fetchAvailableDrives();
    fetchClientPackages();
  }, []);

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

  const togglePackageSelection = (packageid) => {
    const isSelected = selectedPackages.includes(packageid);

    if (isSelected) {
      setSelectedPackages(selectedPackages.filter(id => id !== packageid));
    } else {
      setSelectedPackages([...selectedPackages, packageid]);
    }
  };
  // TODO ///////////////////////////////////
  //////////////////////////////////////////
  /////////////////////////////////////////
  const assignPackagesToDrive = async () => {

    try {
      if (selectedDrive) {
        let DriverID = 0;
        try {
          const driversCollection = firebase.firestore().collection('users').where('role', '==', 'Driver');

          const driversSnapshot = await driversCollection.get();

          for (const driverDoc of driversSnapshot.docs) {
            const drivesCollection = driverDoc.ref.collection('drives');
            const driveDoc = await drivesCollection.doc(selectedDrive).get();

            if (driveDoc.exists) {
              // Found the driver with the specified driveId
              DriverID = driverDoc.id; // Return the driver's ID
            }
          }


        } catch (error) {
          console.error('Error finding driver ID by drive ID:', error);
          return null;
        }
        const driveRef = firebase.firestore().collection(`users/${DriverID}/drives`).doc(selectedDrive);
        const clientId = firebase.auth().currentUser.uid;
        //update amount of packages sent
        const profileRef = firebase.firestore().collection('users').doc(clientId);
        const profileSnapshot = await profileRef.get();
        const userData = profileSnapshot.data();
        let current_packages_sent = userData.packagesSent;
        console.log("user current packages", current_packages_sent);
        current_packages_sent += selectedPackages.length;
        console.log("user sent #", current_packages_sent);
        await profileRef.update({
          packagesSent: current_packages_sent,
        });

        // Update the drive in the database
        console.log("updating driver", clientId, selectedPackages);
        await driveRef.update({
          //Update drive information based on assigned packages
          // For example, you might update the available space, list of assigned packages, etc.
          packagesIds: firebase.firestore.FieldValue.arrayUnion({
            clientId: clientId,
            packageId: selectedPackages,
          }),
        });

        // Update the client's packages with the selected drive information
        //const clientId = firebase.auth().currentUser.uid;
        const packagesRef = firebase.firestore().collection(`users/${clientId}/deliveries`);

        for (const packageId of selectedPackages) {
          const packageRef = packagesRef.doc(packageId);

          // Update the package with the drive information

          await packageRef.update({
            Driver: DriverID,
            packageStatus: "in transit"
            // Add other drive-related information to the package
          });
        }

        // Provide feedback to the client
        Alert.alert(
          'Success',
          'Packages assigned to the drive successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                // go back
                navigation.goBack();
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        alert('Please select a drive before assigning packages.');
      }
    } catch (error) {
      console.error('Error assigning packages to drive:', error);
    }
  };
  /////////////////////////////////////////////
  ////////////////////////////////////////////
  ////////////////////////////////////////////

  // Apply filters and sorting based on user input
  const filteredAndSortedDrives = availableDrives
    .filter(drive => drive.source.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(drive => selectedFilter === 'all' || drive.status === selectedFilter)
    .sort((a, b) => sortOrder === 'asc' ? a.destination.localeCompare(b.destination) : b.destination.localeCompare(a.destination));

  return (
    <View style={{ margin: 15 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 0, padding: 5 }}
        placeholder="Search drives by drive source"
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
              <TouchableOpacity onPress={() => handleFilterChange('current drive')}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#788eec', margin: 10 }}>Current Drive</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFilterChange('past drive')}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#788eec', margin: 10 }}>Past Drive</Text>
              </TouchableOpacity>
              {/* Add more filter options based on your drive statuses */}
            </View>
          </View>
        </Modal>

        <TouchableOpacity onPress={() => handleSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#788eec' }}>Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 0, marginBottom: 10, height: 260 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Select Available Drive:</Text>
        <FlatList
          data={filteredAndSortedDrives}
          keyExtractor={(item) => item.driveid}
          renderItem={({ item }) => {
            // Calculate unique package and client IDs for the current drive
            const uniquePackageIdsForDrive = (item.packagesIds || []).reduce((uniqueIds, packageItem) => {
              return [...new Set([...uniqueIds, ...packageItem.packageId])];
            }, []);

            const uniqueClientIdsForDrive = (item.packagesIds || []).reduce((uniqueIds, packageItem) => {
              return [...new Set([...uniqueIds, packageItem.clientId])];
            }, []);

            return (
              <TouchableOpacity
                onPress={() => setSelectedDrive(item.driveid)}
                style={[
                  styles.packageBox,
                  {
                    borderColor: selectedDrive === item.driveid ? '#ff7700' : 'lightblue',
                    borderWidth: selectedDrive === item.driveid ? 2 : 1,
                  },
                ]}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 3 }}>
                  {item.source} - {item.destination} : {item.driveStatus}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                  <Icon name="cubes" size={16} color="#788eec" /> Packages Booked: {uniquePackageIdsForDrive.length}{'       '}
                  <Icon name="users" size={16} color="#788eec" /> #Clients: {uniqueClientIdsForDrive.length}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

      </View>
      <View style={{ marginBottom: 20, height: 260, }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Select Packages:</Text>
        <FlatList
          data={clientPackages}
          keyExtractor={(item) => item.packagid}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => togglePackageSelection(item.packageid)}
              style={[
                styles.packageBox,
                {
                  borderColor: selectedPackages.includes(item.packageid) ? 'green' : 'lightblue',
                  borderWidth: selectedPackages.includes(item.packageid) ? 2 : 1
                },
              ]}>
              <Text>{item.source} - {item.destination} : {item.size}{item.unit || "kg"} </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.reviewbtn}>
        <TouchableOpacity onPress={assignPackagesToDrive}>
          <Text style={styles.reviewText}>Assign {selectedPackages.length === 0 ? "" : selectedPackages.length} Packages to Drive</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PickDriveScreen;
