import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon
import styles from './styles'; // Import your styles
import Header from '../../components/Header/Header';

const HomeScreenDriver = ({ navigation }) => {

  const onPackageStatus = () => {
    navigation.navigate('PackageStatus');
  }

  const onMyDrives = () => {
    // Add navigation logic for My Drives
    navigation.navigate('Login');
  }

  const onMyPoints = () => {
    // Add navigation logic for My Points
    navigation.navigate('LoginDriver');
  }

  const onMyTips = () => {
    // Add navigation logic for My Tips
    navigation.navigate('LoginDriver');
  }

  const onReviewsReceived = () => {
    // Add navigation logic for Reviews Received
    navigation.navigate('LoginDriver');
  }

  const onLogout = () => {
    // Add navigation logic for Log Out
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../../assets/client.png')} // Replace with the actual path to your profile picture
            style={styles.profileImage}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>Driver #1001</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={20} color="#f1c40f" />
              <Text style={styles.ratingText}>4.6</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.driveActionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
                <Icon name="road" size={30} color="#788eec" />
                <Text style={styles.actionText}>Add Drive</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <Icon name="truck" size={30} color="#788eec" />
                <Text style={styles.actionText}>Pick Packages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <Icon name="comments" size={30} color="#788eec" />
                <Text style={styles.actionText}>Chat</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.menuButtonsContainer}>
          <TouchableOpacity style={styles.menuButton} onPress={onMyDrives}>
            <Text style={styles.menuButtonText}>My Drives</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={onMyPoints}>
            <Text style={styles.menuButtonText}>My Points</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={onMyTips}>
            <Text style={styles.menuButtonText}>My Tips</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
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
