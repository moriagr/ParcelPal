import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';


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
        <Text>{packageInfo}</Text>
        {showEndDriveButton && <CurrentDrivesButton onEdit={onDelivered} />}
      </View>
    </TouchableOpacity>
  );
};

const PackageSection = ({ title, packages }) => {
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

  const handleEndDrive = () => {
    // Handle delete action
    console.log(`Mark package as delivered: ${selectedPackage}`);
    setModalVisible(false);
  };

  const showEndDriveButton = title === 'Current Drives';

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={toggleExpansion} style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color="black" />
      </TouchableOpacity>
      {isModalVisible && selectedPackage && showEndDriveButton && (
        <Modal
          animationType="slide"
          transparent={true}
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
  
  const CurrentDrives = ['Drive A', 'Drive B', 'Drive C'];
  const PastDrives = ['Drive 1', 'Drive 2', 'Drive 3'];

  return (
    <View style={styles.container}>
      <PackageSection title="Current Drives" packages={CurrentDrives} />
      <PackageSection title="Past Drives" packages={PastDrives} />
    </View>
  );
};

export default MyDriveScreen;