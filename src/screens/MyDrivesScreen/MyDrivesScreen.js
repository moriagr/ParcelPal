import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import firebase from './../../firebase/config'


const CurrentDrivesButton = ({ onDelivered }) => {
  return (
    <View style={styles.editDeleteButtons}>
      <TouchableOpacity onPress={onDelivered} style={styles.markbtn}>
        <Text style={styles.reviewText}>End Drive</Text>
      </TouchableOpacity>
    </View>
  );
};

const DriveBox = ({ packageInfo,  showEndDriveButton, onDelivered }) => {
  return (
    <TouchableOpacity style={styles.packageBox} onPress={() => console.log('View details', packageInfo)}>
      <View style={styles.packageInfoContainer}>
        <Text>{packageInfo.source} - {packageInfo.destination} </Text>
        {showEndDriveButton && <CurrentDrivesButton onDelivered={onDelivered} />}
      </View>
    </TouchableOpacity>
  );
};

const PackageSection = ({ title, packages, onFetchDrives }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleModal = (packageInfo) => {
    setSelectedPackage(packageInfo);
    setModalVisible(!isModalVisible);
  };

  const handleEndDrive = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
  
      if (currentUser) {
        const userId = currentUser.uid;
        const drivesRef = firebase.firestore().collection(`users/${userId}/drives`);
  
        // Assuming selectedPackage.driveid is the attribute that uniquely identifies the drive
        const drivesDocRef = drivesRef.doc(selectedPackage.driveid);
  
        // Update the PackageStatus field to "delivered"
        await drivesDocRef.update({
          driveStatus: "past drive",
        });
  
        console.log(`drive marked as ended: ${selectedPackage.driveid}`);
        setModalVisible(false);
        // trigers a refetch od data to update flatlist
        
        onFetchDrives();
        
      } else {
        console.error('No current user found');
      }
    } catch (error) {
      console.error('Error marking package as delivered:', error);
    }
  };

  const showEndDriveButton = title === 'Current Drives';

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
              onDelivered={handleEndDrive}
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
              onDelivered={() => toggleModal(item)}
            />
          )}
        />
      )}
    </View>
  );
};

const MyDriveScreen = () => {

  const [CurrentDrives, setCurrentDrives] = useState([]);
  const [PastDrives, setPastDrives] = useState([]);

  
  const fetchDrives = async () => {
    try {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        const drivesRef = firebase.firestore().collection(`users/${userId}/drives`);

        const snapshotCurrentDrives = await drivesRef.where('driveStatus', '==', 'current drive').get();
        const snapshotPastDrives = await drivesRef.where('driveStatus', '==', 'past drive').get();

        const currentDrives = snapshotCurrentDrives.docs.map(doc => doc.data());
        const pastDrives = snapshotPastDrives.docs.map(doc => doc.data());

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
      <PackageSection title="Current Drives" packages={CurrentDrives} onFetchDrives={fetchDrives}/>
      <PackageSection title="Past Drives" packages={PastDrives} onFetchDrives={fetchDrives}/>
    </View>
  );
};

export default MyDriveScreen;