import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import firebase from './../../firebase/config';

export default function LandingScreen({ navigation }) {
  const [driversCount, setDriversCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [totalDeliveries, setTotalDeliveries] = useState(0);

  const onDriverLoginPress = () => {
    navigation.navigate('Login', { role: 'Driver', driversCount: driversCount, deliveriesCount: totalDeliveries, clientsCount:clientsCount});
  };

  const onClientLoginPress = () => {
    navigation.navigate('Login', { role: 'Client', driversCount: driversCount, deliveriesCount: totalDeliveries, clientsCount:clientsCount });
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      const drivers = await getUsersCountByRole('Driver');
      const clients = await getUsersCountByRole('Client');
      const totalDeliveries = await fetchTotalDeliveries();

      setDriversCount(drivers);
      setClientsCount(clients);
      setTotalDeliveries(totalDeliveries);
    };

    fetchStatistics();
  }, []);

  const getUsersCountByRole = async (role) => {
    try {
      const usersSnapshot = await firebase.firestore().collection('users').where('role', '==', role).get();
      return usersSnapshot.size;
    } catch (error) {
      console.error('Error fetching user count:', error);
      return 0;
    }
  };

  const fetchTotalDeliveries = async () => {
    try {
      let totalDeliveries = 0;

      // Fetch deliveries for each client
      const clientsSnapshot = await firebase.firestore().collection('users').where('role', '==', 'Client').get();
      const clientDocs = clientsSnapshot.docs;

      for (const clientDoc of clientDocs) {
        const clientId = clientDoc.id;
        const clientDeliveriesRef = firebase.firestore().collection(`users/${clientId}/deliveries`);
        const clientDeliveriesSnapshot = await clientDeliveriesRef.get();

        totalDeliveries += clientDeliveriesSnapshot.size;
      }

      return totalDeliveries;
    } catch (error) {
      console.error('Error fetching total deliveries:', error);
      return 0;
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require('../../../assets/ParcelPal.png')}
        />
        <Text style={styles.headline}>
          Join {driversCount} Delivery drivers and {clientsCount} clients with over {totalDeliveries} successful deliveries
        </Text>
        <View>
          <Image
            style={styles.img}
            source={require('../../../assets/Landingimg.png')}
          />
        </View>
        <View style={styles.choice}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onDriverLoginPress()}>
            <Text style={styles.buttonTitle}>Driver Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onClientLoginPress()}>
            <Text style={styles.buttonTitle}>Client Log in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
