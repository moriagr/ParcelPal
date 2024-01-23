import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useUserContext } from '../../common/context/UserContext.js';
import { Formik } from 'formik'
import { registrationValidationScheme } from '../../components/Schemes/LoginRegistrationSchemes.js';
import styles from './styles.js';
import { useNavigation } from '@react-navigation/native';
import firebase from './../../firebase/config'



const EditProfileScreen = () => {

  const { setUser, user } = useUserContext();

  const [isButtonPressedMan, setIsButtonPressedMan] = useState(false);
  const [isButtonPressedWoman, setIsButtonPressedWoman] = useState(false);

  const [profilePicture, setProfilePicture] = useState(user?.profilePicture);
  const [name, setName] = useState(user?.fullName);
  const [phone , setPhone] = useState(user?.phone)
  const navigation = useNavigation();

  const handleEditProfilePictureMan = () => {
    // Logic to handle uploading a new profile picture
    console.log('Editing profile picture to man...');
    const newProfilePicture = require('../../../assets/man.png');
    setProfilePicture(newProfilePicture);

    //saveProfile2DB();
  };

  const handleEditProfilePictureWoman = () => {
    // Logic to handle uploading a new profile picture
    console.log('Editing profile picture to woman...');
    const newProfilePicture = require('../../../assets/woman.png');
    setProfilePicture(newProfilePicture);

    //saveProfile2DB();
    
  };
  

  const saveProfile2DB = async () => {
    try {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        const profileRef = firebase.firestore().collection('users').doc(userId);
        
        await profileRef.update({
          profilePicture,
          fullName: name,
          phone,
        });
        //set up listener here to update
        // Set up a listener for real-time updates
        const unsubscribe = profileRef.onSnapshot((snapshot) => {
          const updatedUserData = snapshot.data();
          // Update your local state or context with the new data
          setUser(updatedUserData);
        });

        console.log('Delivery saved to Firestore!');
        navigation.goBack();

      } else {
        console.error('No current user found');
      }
    } catch (error) {
      console.error('Error saving delivery to Firestore:', error);
    }
  };

  return (
    <View style={styles.container}>


    <View style={styles.profileContainer}>
      <View>
          <Image
            source={user?.profilePicture} 
            style={styles.profileImage}
          />
      </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{user?.fullName}</Text>
          </View>
      </View>
      <Text style={styles.txtinfo}>Change Profile Picture:</Text>

      <View style={styles.gender}>
        <TouchableOpacity onPress={()=>{setIsButtonPressedMan(true); setIsButtonPressedWoman(false); handleEditProfilePictureMan();}} style={[styles.editButton,isButtonPressedMan?styles.buttonPressed: null,]}>
          <Text style={styles.buttonTitle}>Man</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setIsButtonPressedWoman(true); setIsButtonPressedMan(false); handleEditProfilePictureWoman();}} style={[styles.editButton,isButtonPressedWoman?styles.buttonPressed: null,]}>
          <Text style={styles.buttonTitle}>Woman</Text>
        </TouchableOpacity>
      </View>
      
      <Formik
          validationSchema={registrationValidationScheme}
          initialValues={{
              fullName: '',
              phoneNumber: '',
              email: '',
              password: '',
              confirmPassword: ''
          }}
          onSubmit={values => {
              console.log(values)
              onRegisterPress(values)
          }}
      >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (

              <>
                  <View style={styles.topinfo}>
                    <Text style={styles.txtinfo}>Role: {user.role}</Text>
                    <Text style={styles.txtinfo}>Email: {user.email}</Text>
                  </View>
                  <Text style={styles.txt}>Update Name</Text>
                  <TextInput
                      style={styles.input}
                      placeholder={user.fullName}
                      placeholderTextColor="#aaaaaa"
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      onBlur={handleBlur('fullName')}
                      value={name}
                      onChangeText={setName}

                  />
                  {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                  <Text style={styles.txt}>Update Phone Number</Text>
                  <TextInput
                      style={styles.input}
                      placeholder={user.phone}
                      placeholderTextColor="#aaaaaa"
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      onBlur={handleBlur('phoneNumber')}
                      value={phone}
                      onChangeText={setPhone}
                  />
                  {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

                  <TouchableOpacity
                      style={isValid ? styles.button : styles.disableButton}
                      disabled={!isValid}
                      onPress={saveProfile2DB}>
                      <Text style={styles.buttonTitle}>Update Profile</Text>
                  </TouchableOpacity>
              </>

          )}
      </Formik>

    </View>
  );
};

export default EditProfileScreen;