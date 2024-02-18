import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import firebase from './../../firebase/config'


const DriveBox = ({packageInfo}) => {

  return (
    <TouchableOpacity style={styles.packageBox} onPress={() => console.log('View details', packageInfo)}>
      <View style={styles.packageInfoContainer}>
        <View>
          <Text style={{fontSize: 20, fontWeight:'bold', marginBottom: 3}}><Icon name="home" size={20} color="#788eec" /> {packageInfo.source}    <Icon name="arrows-h" size={20} color="#788eec" />    <Icon name="street-view" size={20} color="#788eec" /> {packageInfo.destination} </Text>
          <Text style={{fontSize: 14, fontWeight:'bold'}}><Icon name="calendar" size={18} color="#788eec" /> {packageInfo.date}     <Icon name="balance-scale" size={18} color="#788eec" /> {packageInfo.size} </Text>
          <Text style={{fontSize: 11, marginBottom: 2}}>clientId: {packageInfo.client}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PackageSection = ({ title, packages }) => {
  
  return (
    <View style={styles.sectionContainer}>
        <FlatList
          data={packages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DriveBox
              packageInfo={item}
            />
          )}
        />
    </View>
  );
};

const ChoosenDeliveriesScreen = () => {

  const [MyChoosenDeliveries, setMyChoosenDeliveries] = useState([]);
  
  const fetchDrives = async () => {
    try {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        const drivesRef = firebase.firestore().collection(`users/${userId}/chosenDeliveries`);

        const snapshotMyChoosenDeliveries = await drivesRef.get();

        const chossenDeliveries = snapshotMyChoosenDeliveries.docs.map(doc => doc.data());

        setMyChoosenDeliveries(chossenDeliveries);

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
      <PackageSection title="My Choosen Deliveries" packages={MyChoosenDeliveries} onFetchDrives={fetchDrives}/>
    </View>
  );
};

export default ChoosenDeliveriesScreen;