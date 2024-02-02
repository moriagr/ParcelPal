import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon
import styles from './styles'; // Import your styles
import Header from '../../components/Header/Header';
import firebase from './../../firebase/config.js'
import { useUserContext } from '../../common/context/UserContext.js';

const HomeScreenDriver = ({ navigation }) => {
  //use user context
  const { setUser, user } = useUserContext();

  // navigate to add drive
  const onAddDrive = () => {
    navigation.navigate('AddDriveScreen');
  }

  // navigate to pick packages
  const onPickPackages = () => {
    navigation.navigate('PickPackagesScreen');
  }

  // navigate to my drives
  const onMyDrives = () => {
    // Add navigation logic for My Drives
    navigation.navigate('MyDrives');
  }
  // navigate to reviews recived
  const onReviewsReceived = () => {
    // Add navigation logic for Reviews Received
    navigation.navigate('ReviewsRecivedScreen');
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

  //culculate avg reviews for driver with 2 decimal points
  let avgReview = 0.0;
  if (user?.reviews.length === 0) {
    avgReview = 0.0;
  } else {
    avgReview = user?.reviews.reduce((sum, review) => sum + review.rating, 0) / user?.reviews.length;
    avgReview = parseFloat(avgReview.toFixed(2));
  }

  // home screen driver
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={user?.profilePicture} // Replace with the actual path to your profile picture
            style={styles.profileImage}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{user?.fullName}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={20} color="#f1c40f" />
              <Text style={styles.ratingText}>{avgReview}</Text>
              <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.driveActionsContainer}>

          <TouchableOpacity style={styles.actionButton} onPress={onAddDrive}>
            <Icon name="road" size={30} color="#a1c4fd" />
            <Text style={styles.actionText}>Add Drive</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onPickPackages}>
            <Icon name="archive" size={30} color="#a1c4fd" />
            <Text style={styles.actionText}>Pick Packages</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onChatScreen}>
            <Icon name="comments" size={30} color="#a1c4fd" />
            <Text style={styles.actionText}>Chat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuButtonsContainer}>
          <TouchableOpacity style={styles.menuButton} onPress={onMyDrives}>
            <Text style={styles.menuButtonText}>My Drives</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
          {/*<TouchableOpacity style={styles.menuButton} onPress={onMyPoints}>
            <Text style={styles.menuButtonText}>My Points</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={onMyTips}>
            <Text style={styles.menuButtonText}>My Tips</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>*/}
          <TouchableOpacity style={styles.menuButton} onPress={onReviewsReceived}>
            <Text style={styles.menuButtonText}>Reviews Received</Text>
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

export default HomeScreenDriver;
