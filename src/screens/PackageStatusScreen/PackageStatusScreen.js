import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const EditDeleteButtons = ({ onDelete, onEdit }) => {
  return (
    <View style={styles.editDeleteButtons}>
      <TouchableOpacity onPress={onEdit}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const PackageBox = ({ packageInfo, showEditDeleteButtons, onEdit, onDelete }) => {
  return (
    <TouchableOpacity style={styles.packageBox} onPress={() => console.log('View details', packageInfo)}>
      <View style={styles.packageInfoContainer}>
        <Text>{packageInfo}</Text>
        {showEditDeleteButtons && <EditDeleteButtons onEdit={onEdit} onDelete={onDelete} />}
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

  const handleEdit = () => {
    // Handle edit action
    console.log(`Edit package: ${selectedPackage}`);
    setModalVisible(false);
  };

  const handleDelete = () => {
    // Handle delete action
    console.log(`Delete package: ${selectedPackage}`);
    setModalVisible(false);
  };

  const showEditDeleteButtons = title === 'Packages waiting for driver';

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={toggleExpansion} style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color="black" />
      </TouchableOpacity>
      {isModalVisible && selectedPackage && showEditDeleteButtons && (
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
            <PackageBox
              packageInfo={selectedPackage}
              showEditDeleteButtons={showEditDeleteButtons}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </View>
        </Modal>
      )}
      {isExpanded && (
        <FlatList
          data={packages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <PackageBox
              packageInfo={item}
              showEditDeleteButtons={showEditDeleteButtons}
              onEdit={() => toggleModal(item)}
              onDelete={() => toggleModal(item)}
            />
          )}
        />
      )}
    </View>
  );
};

const PackageStatusScreen = () => {
  const packagesWaiting = ['Package 1', 'Package 2', 'Package 3'];
  const packagesInTransit = ['Package A', 'Package B', 'Package C'];
  const packagesDelivered = ['Package X', 'Package Y', 'Package Z'];

  return (
    <View style={styles.container}>
      <PackageSection title="Packages waiting for driver" packages={packagesWaiting} />
      <PackageSection title="Packages in transit" packages={packagesInTransit} />
      <PackageSection title="Packages delivered" packages={packagesDelivered} />
    </View>
  );
};

export default PackageStatusScreen;