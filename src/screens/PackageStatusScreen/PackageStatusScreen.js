// imports 
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import firebase from './../../firebase/config'

//edit delete buttons for packages waiting for driver
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

//Mark as delivered button for packages delivered by driver
const PackageDeliveredButton = ({ onDelivered }) => {
  return (
    <View style={styles.editDeleteButtons}>
      <TouchableOpacity onPress={onDelivered} style={styles.markbtn}>
        <Text style={styles.reviewText}>Mark as Delivered</Text>
      </TouchableOpacity>
    </View>
  );
};


//review button for reviewing delivered packages
const PackageReviewButton = ({ onReview }) => {

  const [rating, setRating] = useState(0);

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <View style={styles.editDeleteButtons}>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleStarPress(star)}
            style={styles.star}
          >
            <Text style={{ color: star <= rating ? 'gold' : 'gray' }}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={onReview} style={styles.reviewbtn}>
        <Text style={styles.reviewText}>Review</Text>
      </TouchableOpacity>
    </View>
  );
};

// package box 
const PackageBox = ({ packageInfo, showEditDeleteButtons, showDeliveredButton, showReviewButton, onEdit, onDelete, onDelivered, onReview }) => {
  return (
    <TouchableOpacity style={styles.packageBox} onPress={() => console.log('View details', packageInfo)}>
      <View style={styles.packageInfoContainer}>
        <Text>{packageInfo.source} - {packageInfo.destination} : {packageInfo.size} </Text>
        {showEditDeleteButtons && <EditDeleteButtons onEdit={onEdit} onDelete={onDelete} />}
        {showDeliveredButton && <PackageDeliveredButton onEdit={onDelivered} />}
        {showReviewButton && <PackageReviewButton onEdit={onReview} />}
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

  const handleMarkAsDelivered = () => {
    // Handle delete action
    console.log(`Mark package as delivered: ${selectedPackage}`);
    setModalVisible(false);
  };

  const handleReview = () => {
    // Handle delete action
    console.log(`Review package: ${selectedPackage}`);
    setModalVisible(false);
  };

  const showEditDeleteButtons = title === 'Packages waiting for driver';
  const showDeliveredButton = title === 'Packages in transit';
  const showReviewButton = title === 'Packages delivered';

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
              showDeliveredButton={showDeliveredButton}
              showReviewButton={showReviewButton}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDelivered={handleMarkAsDelivered}
              onReview={handleReview}
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
              showDeliveredButton={showDeliveredButton}
              showReviewButton={showReviewButton}
              onEdit={() => toggleModal(item)}
              onDelete={() => toggleModal(item)}
              onDelivered={() => toggleModal(item)}
              onReview={() => toggleModal(item)}
            />
          )}
        />
      )}
    </View>
  );
};

const PackageStatusScreen = () => {
  //const packagesWaiting = ['Package 1', 'Package 2', 'Package 3'];
  //
  const [packagesWaiting, setPackagesWaiting] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const currentUser = firebase.auth().currentUser;

        if (currentUser) {
          const userId = currentUser.uid;

          const deliveriesRef = firebase.firestore().collection(`users/${userId}/deliveries`);

          const snapshot = await deliveriesRef.get();

          const deliveries = snapshot.docs.map(doc => doc.data());

          setPackagesWaiting(deliveries);
        } else {
          console.error('No current user found');
        }
      } catch (error) {
        console.error('Error fetching deliveries from Firestore:', error);
      }
    };

    fetchDeliveries();
  }, []);

  //
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
