// imports 
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import firebase from './../../firebase/config'
import { useNavigation } from '@react-navigation/native';


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
  //using starting state with 1 as min of  1- 5 stars rating value
  const [rating, setRating] = useState(1);
  //setting state using handelpress function
  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };
  // 1- 5 stars rating 
  return (
    <View style={styles.editDeleteButtons}>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleStarPress(star)}
            style={styles.star}
          >
            <Text style={{ color: star <= rating ? 'gold' : 'gray', fontSize: 18 }}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => onReview(rating)} style={styles.reviewbtn}>
        <Text style={styles.reviewText}>Review</Text>
      </TouchableOpacity>
    </View>
  );
};

// package box for showing relevent buttons based on package status
const PackageBox = ({ packageInfo, showEditDeleteButtons, showDeliveredButton, showReviewButton, onEdit, onDelete, onDelivered, onReview }) => {
  return (
    <TouchableOpacity style={styles.packageBox} onPress={() => console.log('View details', packageInfo)}>
      <View style={styles.packageInfoContainer}>
        <Text>{packageInfo.source} - {packageInfo.destination} : {packageInfo.size} </Text>
        {showEditDeleteButtons && <EditDeleteButtons onEdit={onEdit} onDelete={onDelete} />}
        {showDeliveredButton && <PackageDeliveredButton onDelivered={onDelivered} />}
        {showReviewButton && <PackageReviewButton onReview={(rating) => onReview(rating)} />}
      </View>
    </TouchableOpacity>
  );
};


const PackageSection = ({ title, packages, onFetchDeliveries }) => {
  //using tates to set modal visability as expand
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

    // toggel for expaning the modal
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  // toggel for making the modal visable
  const toggleModal = (packageInfo) => {
    setSelectedPackage(packageInfo);
    setModalVisible(!isModalVisible);
  };
  //use navigotr to go bakc to home screen
  const navigation = useNavigation();

  //handl edit functions navigates to editpackescreen with current packages values
  const handleEdit = () => {
    // Handle edit action
    console.log(`Edit package: ${selectedPackage}`);
    setModalVisible(false);
    navigation.navigate('EditDeliveryScreen', { packageInfo: selectedPackage, onFetchDeliveries });
  };

  //handling delte button
  const handleDelete = async () => {
    try {
      //define current user
      const currentUser = firebase.auth().currentUser;
  
      if (currentUser) {
        //define current user id
        const userId = currentUser.uid;
        const deliveriesRef = firebase.firestore().collection(`users/${userId}/deliveries`);
  
        // Assuming selectedPackage.packageid is the attribute that uniquely identifies the package
        const deliveryDocRef = deliveriesRef.doc(selectedPackage.packageid);
        console.log(`Deleting package with ID: , ${selectedPackage.packageid}`);
        
        // Delete the document from the 'deliveries' collection
        await deliveryDocRef.delete();
  
        console.log(`Package deleted: ${selectedPackage.packageid}`);
        setModalVisible(false);
        // Triggers a refetch of data to update flatlist
        onFetchDeliveries();
      } else {
        console.error('No current user found');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  //handel mark as delivered function
  const handleMarkAsDelivered = async () => {
    try {
      //define current user
      const currentUser = firebase.auth().currentUser;
  
      if (currentUser) {
        //define current user Id
        const userId = currentUser.uid;
        const deliveriesRef = firebase.firestore().collection(`users/${userId}/deliveries`);
  
        // Assuming selectedPackage.packageId is the attribute that uniquely identifies the package
        const deliveryDocRef = deliveriesRef.doc(selectedPackage.packageid);
  
        // Update the PackageStatus field to "delivered" (this will put it in the next flatlist)
        await deliveryDocRef.update({
          packageStatus: "delivered",
        });
  
        console.log(`Package marked as delivered: ${selectedPackage.packageid}`);
        setModalVisible(false);
        // trigers a refetch od data to update flatlist
        onFetchDeliveries();
      } else {
        console.error('No current user found');
      }
    } catch (error) {
      console.error('Error marking package as delivered:', error);
    }
  };
  
  //handel review async function
  const handleReview = async (rating) => {
    
    try {
      //define user
      const currentUser = firebase.auth().currentUser;
      
      if (currentUser) {
        //define user iD
        const userId = currentUser.uid;
        
        const deliveriesRef = firebase.firestore().collection(`users/${userId}/deliveries`);
        const userDocRef = firebase.firestore().collection('users').doc(userId);
        const userDocSnapshot = await userDocRef.get(); 
        const userData = userDocSnapshot.data();
      
        // define client name
        const clientName = userData.fullName;
      
        console.log('Client Name:', clientName);

        // Assuming selectedPackage.packageId is the attribute that uniquely identifies the package
        const deliveryDocRef = deliveriesRef.doc(selectedPackage.packageid);
        // Update the PackageStatus field to "reviewed" to get out of list
        await deliveryDocRef.update({
          packageStatus: "reviewed",
        });
  
        // Fetch the driver's document from the users collection
        const driverDocSnapshot = await firebase.firestore().collection('users').doc(selectedPackage.Driver).get();
        const driverDocRef = driverDocSnapshot.ref;
        const userDocReff = userDocSnapshot.ref;

        const DriverData = driverDocSnapshot.data();
        const driverName = DriverData.fullName;
      
        console.log('Driver Name:', driverName);

        
        // Update the driver's review array to add the review 
        console.log(`client name and rating: ` ,clientName , " ", rating);
        await driverDocRef.update({
          reviews: firebase.firestore.FieldValue.arrayUnion({
            customerName: clientName,
            rating: rating,
          }),
        });
        // Update the clients's review array to add the review
        console.log(`driver name and rating: ` ,driverName , " ", rating);
        await userDocReff.update({
          reviews: firebase.firestore.FieldValue.arrayUnion({
            DriverName: driverName,
            rating: rating,
          }),
        });
  
        console.log(`Package reviewed: ${selectedPackage.packageid}`);
        setModalVisible(false);
        // trigers a refetch of data to update flatlist
        onFetchDeliveries();
      } else {
        console.error('No current user found');
      }
    } catch (error) {
      console.error('Error marking package as reviewed:', error);
    }
  };

  //flags for buttons to show on packageBox
  const showEditDeleteButtons = title === 'Packages waiting for driver';
  const showDeliveredButton = title === 'Packages in transit';
  const showReviewButton = title === 'Packages delivered';


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
  //states for flatlist based on package status
  const [packagesWaiting, setPackagesWaiting] = useState([]);
  const [packagesInTransit, setPackagesInTransit] = useState([]);
  const [packagesDelivered, setpackagesDelivered] = useState([]);

  //fetch data from firebase
  const fetchDeliveries = async () => {
    try {
      //define user
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        //define userId
        const userId = currentUser.uid;
        //define refrence doc of deliveries
        const deliveriesRef = firebase.firestore().collection(`users/${userId}/deliveries`);

        //get snapshot based on packages status
        const snapshotWaiting = await deliveriesRef.where('packageStatus', '==', 'waiting').get();
        const snapshotInTransit = await deliveriesRef.where('packageStatus', '==', 'in transit').get();
        const snapshotDelivered = await deliveriesRef.where('packageStatus', '==', 'delivered').get();

        //define values to map data to
        const waitingDeliveries = snapshotWaiting.docs.map(doc => doc.data());
        const inTransitDeliveries = snapshotInTransit.docs.map(doc => doc.data());
        const deliveredDeliveries = snapshotDelivered.docs.map(doc => doc.data());
        //use set state funtions to save the data as the states
        setPackagesWaiting(waitingDeliveries);
        setPackagesInTransit(inTransitDeliveries);
        setpackagesDelivered(deliveredDeliveries);
      } else {
        console.error('No current user found');
      }
    } catch (error) {
      console.error('Error fetching deliveries from Firestore:', error);
    }
  };

  useEffect(() => {
    // Fetch deliveries when the component mounts
    fetchDeliveries();
  }, []);


  return (
    <View style={styles.container}>
      <PackageSection title="Packages waiting for driver" packages={packagesWaiting} onFetchDeliveries={fetchDeliveries}/>
      <PackageSection title="Packages in transit" packages={packagesInTransit} onFetchDeliveries={fetchDeliveries}/>
      <PackageSection title="Packages delivered" packages={packagesDelivered} onFetchDeliveries={fetchDeliveries}/>
    </View>
  );
};

export default PackageStatusScreen;
