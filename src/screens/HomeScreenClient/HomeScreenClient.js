import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon
import styles from './styles'; // Import your styles
import Header from '../../components/Header/Header';
import firebase from '../../firebase/config';
import { useUserContext } from '../../common/context/UserContext';

const HomeScreen = ({ navigation }) => {
  // use users context
  const { setUser, user } = useUserContext();

  // navigate to new delivery
  const onNewDelivery = () => {
    navigation.navigate('NewDeliveryScreen');
  }
  // navigate to pick drive
  const onPickDriver = () =>{
    navigation.navigate('PickDriveScreen');
  }

  // navigate to packages status
  const onMyPackages = () => {
    // Add navigation logic for My Drives
    navigation.navigate('PackageStatus');
  }

  // navigate to reviews reciveed
  const onReviewsReceived = () => {
    // Add navigation logic for Reviews Received
    navigation.navigate('ReviewsGivenScreen');
  }

  // navigate to chats
  const onChatScreen = () => {
    navigation.navigate('ChatsScreen');
  }

  // navigate to edit profile
  const onEditProfile = () => {
    // Add navigation logic for Reviews Received
    navigation.navigate('EditProfileScreen');
  }

  // Logout and navigate to login screen
  const onLogout = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        setUser(null);
        navigation.navigate('Landing');
        console.log('User signed out!')
      });

  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={user?.profilePicture}
            style={styles.profileImage}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{user?.fullName}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="truck" size={20} color="#f1c40f" />
              <Text style={styles.ratingText}>{user?.packagesSent}</Text>
              <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.driveActionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={onNewDelivery}>
            <Icon name="cubes" size={30} color="#a1c4fd" />
            <Text style={styles.actionText}>New Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onPickDriver}>
            <Icon name="truck" size={30} color="#a1c4fd" />
            <Text style={styles.actionText}>Pick Driver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onChatScreen}>
            <Icon name="comments" size={30} color="#a1c4fd" />
            <Text style={styles.actionText}>Chat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuButtonsContainer}>
          <TouchableOpacity style={styles.menuButton} onPress={onMyPackages}>
            <Text style={styles.menuButtonText}>My Packages</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
          {/*<TouchableOpacity style={styles.menuButton} onPress={onMyPoints}>
            <Text style={styles.menuButtonText}>My Points</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={onMyTips}>
            <Text style={styles.menuButtonText}>Tips Given</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>*/}
          <TouchableOpacity style={styles.menuButton} onPress={onReviewsReceived}>
            <Text style={styles.menuButtonText}>Reviews Given</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButtonLogout} onPress={onLogout}>
            <Text style={styles.menuButtonText}>Log Out</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Add the rest of your content here */}
    </View>
  );
};

export default HomeScreen;