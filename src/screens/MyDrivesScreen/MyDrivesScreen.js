import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import firebase from './../../firebase/config'

// end drive button
const CurrentDrivesButton = ({ onDelivered }) => {
  return (
    <View style={styles.editDeleteButtons}>
      <TouchableOpacity onPress={onDelivered} style={styles.markbtn}>
        <Text style={styles.reviewText}>End Drive</Text>
      </TouchableOpacity>
    </View>
  );
};

// start drive button
const StartDriverButton = ({onStart}) => {
  return (
    <View style={styles.editDeleteButtons}>
      <TouchableOpacity onPress={onStart} style={styles.startbtn}>
        <Text style={styles.reviewText}>Start Drive</Text>
      </TouchableOpacity>
    </View>
  );
}
// drive box : box that shows info about the drive as well as amount of uniqe packages and clients assgined to that drive
const DriveBox = ({packageInfo,  showEndDriveButton, showStartDriveButton ,onDelivered, onStart }) => {
  //uniqe packages assgined for the drive
  const uniquePackageIds = packageInfo.packagesIds
  ? packageInfo.packagesIds.reduce((uniqueIds, item) => [...new Set([...uniqueIds, ...item.packageId])], [])
  : [];
//uniqe clients assgined for the drive
const uniqueClientIds = packageInfo.packagesIds
  ? packageInfo.packagesIds.reduce((uniqueIds, item) => [...new Set([...uniqueIds, item.clientId])], [])
  : [];

  return (
    <TouchableOpacity style={styles.packageBox} onPress={() => console.log('View details', packageInfo)}>
      <View style={styles.packageInfoContainer}>
        <View>
          <Text style={{fontSize: 18, fontWeight:'bold', marginBottom: 2}}>{packageInfo.source} - {packageInfo.destination} </Text> 
          <Text style={{fontSize: 12, fontWeight:'bold'}}><Icon name="cubes" size={16} color="#788eec" /> Packages: {uniquePackageIds.length }    <Icon name="users" size={16} color="#788eec" /> Clients: {uniqueClientIds.length}</Text>
        </View>
        {showEndDriveButton && <CurrentDrivesButton onDelivered={onDelivered} />}
        {showStartDriveButton && <StartDriverButton onStart={onStart} />}
      </View>
    </TouchableOpacity>
  );
};

const PackageSection = ({ title, packages, onFetchDrives }) => {
  //states for expanding / making visable the modal and selected packages
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

    //toggel for making modal exapnd 
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
 //toggel for making modal visable
  const toggleModal = (packageInfo) => {
    setSelectedPackage(packageInfo);
    setModalVisible(!isModalVisible);
  };

  // function for handling the start drive button
  const handleStartDrive = async () => {
    try {
      //define current user
      const currentUser = firebase.auth().currentUser;
  
      if (currentUser) {
        //define user id
        const userId = currentUser.uid;
        const drivesRef = firebase.firestore().collection(`users/${userId}/drives`);
  
        // Assuming selectedPackage.driveid is the attribute that uniquely identifies the drive
        const drivesDocRef = drivesRef.doc(selectedPackage.driveid);
  
        // Update the PackageStatus field to "current drive" from "new drive" (new drive is its default when created);
        await drivesDocRef.update({
          driveStatus: "current drive",
        });
  
        console.log(`drive marked as ended: ${selectedPackage.driveid}`);
        //console.log(`drive marked as ended: ${selectedPackage.packagesIds}`);
        setModalVisible(false);

        // trigers a refetch of data to update flatlist
        onFetchDrives();
        
      } else {
        console.error('No current user found');
      }
    } catch (error) {
      console.error('Error marking package as delivered:', error);
    }
  }

    //handle end drive button function
  const handleEndDrive = async () => {
    try {
      //define user
      const currentUser = firebase.auth().currentUser;
  
      if (currentUser) {
        //define userid
        const userId = currentUser.uid;
        const drivesRef = firebase.firestore().collection(`users/${userId}/drives`);
  
        // Assuming selectedPackage.driveid is the attribute that uniquely identifies the drive
        const drivesDocRef = drivesRef.doc(selectedPackage.driveid);
  
        // Update the driveStatus field to "past drive" from current drive
        await drivesDocRef.update({
          driveStatus: "past drive",
        });
  
        console.log(`drive marked as ended: ${selectedPackage.driveid}`);
        console.log(`drive marked as ended: ${selectedPackage.driveid.packagesIds}`);
        //console.log(`drive marked as ended: ${selectedPackage.packagesIds}`);
        setModalVisible(false);

        // trigers a refetch of data to update flatlist
        onFetchDrives();
        
      } else {
        console.error('No current user found');
      }
    } catch (error) {
      console.error('Error marking package as delivered:', error);
    }
  };

  //flag for showing buttons in drive box
  const showEndDriveButton = title === 'Current Drives';
  const showStartDriveButton = title === 'New Drives';

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={toggleExpansion} style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color="black" />
      </TouchableOpacity>
      {isModalVisible && selectedPackage && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={[styles.modalContent, isExpanded && { flex: 1 }]}>
            <DriveBox
              packageInfo={selectedPackage}
              showEndDriveButton={showEndDriveButton}
              showStartDriveButton={showStartDriveButton}
              onDelivered={handleEndDrive}
              onStart={handleStartDrive}
            />
          </View>
        </Modal>
      )}
      {isExpanded && (
        <FlatList
          data={packages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DriveBox
              packageInfo={item}
              showEndDriveButton={showEndDriveButton}
              showStartDriveButton={showStartDriveButton}
              onDelivered={() => toggleModal(item)}
              onStart={() => toggleModal(item)}
            />
          )}
        />
      )}
    </View>
  );
};

const MyDriveScreen = () => {
  //states for the three types of status of drives
  const [NewDrives, setNewDrives] = useState([]);
  const [CurrentDrives, setCurrentDrives] = useState([]);
  const [PastDrives, setPastDrives] = useState([]);
  

  //fetch drives from database fiunction
  const fetchDrives = async () => {
    try {
      //define current user
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        //define current userid
        const userId = currentUser.uid;
        const drivesRef = firebase.firestore().collection(`users/${userId}/drives`);

        //saving snapshots of drives base on the statuses
        const snapshotNewDrives = await drivesRef.where('driveStatus', '==', 'new drive').get();
        const snapshotCurrentDrives = await drivesRef.where('driveStatus', '==', 'current drive').get();
        const snapshotPastDrives = await drivesRef.where('driveStatus', '==', 'past drive').get();

        //define varibales to map the data to
        const newDrives = snapshotNewDrives.docs.map(doc => doc.data());
        const currentDrives = snapshotCurrentDrives.docs.map(doc => doc.data());
        const pastDrives = snapshotPastDrives.docs.map(doc => doc.data());

        //set states of status with the arrays
        setNewDrives(newDrives);
        setCurrentDrives(currentDrives);
        setPastDrives(pastDrives);
        

      } else {
        console.error('No current user found');
      }
    } catch (error) {
      console.error('Error fetching deliveries from Firestore:', error);
    }
  };

  useEffect(() => {
    // Fetch deliveries when the component mounts
    fetchDrives();
  }, []);
  

  return (
    <View style={styles.container}>
      <PackageSection title="New Drives" packages={NewDrives} onFetchDrives={fetchDrives}/>
      <PackageSection title="Current Drives" packages={CurrentDrives} onFetchDrives={fetchDrives}/>
      <PackageSection title="Past Drives" packages={PastDrives} onFetchDrives={fetchDrives}/>
    </View>
  );
};

export default MyDriveScreen;