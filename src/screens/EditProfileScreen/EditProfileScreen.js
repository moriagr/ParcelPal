import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useUserContext } from '../../common/context/UserContext.js';
import { Formik } from 'formik'
import { registrationValidationScheme } from '../../components/Schemes/LoginRegistrationSchemes.js';
import firebase from './../../firebase/config'


const EditProfileScreen = () => {

  const { setUser, user } = useUserContext();
  
  const [profilePicture, setProfilePicture] = useState(require('../../../assets/icon.png'));
  const [name, setName] = useState(user?.fullName);

  const handleEditProfilePicture = () => {
    // Logic to handle uploading a new profile picture
    console.log('Editing profile picture...');
    // You can implement image upload functionality here
  };

  const handleEditName = () => {
    // Logic to handle editing the name
    console.log('Editing name...');
    // You can implement a modal or input field for editing the name
  };

  return (
    <View style={styles.container}>


    <View style={styles.profileContainer}>
      <View>
          <Image
            source={require('../../../assets/client.png')} // Replace with the actual path to your profile picture
            style={styles.profileImage}
          />
      </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{user?.fullName}</Text>
          </View>
      </View>

      <TouchableOpacity onPress={handleEditProfilePicture} style={styles.editButton}>
        <Text style={styles.buttonTitle}>Change Profile Picture</Text>
      </TouchableOpacity>
      
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
                  <Text style={styles.txt}>Update Name</Text>
                  <TextInput
                      style={styles.input}
                      placeholder={user.fullName}
                      placeholderTextColor="#aaaaaa"
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      value={values.fullName}
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}

                  />
                  {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                  <Text style={styles.txt}>Update Phone Number</Text>
                  <TextInput
                      style={styles.input}
                      placeholder={user.phone}
                      placeholderTextColor="#aaaaaa"
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      value={values.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                  />
                  {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

                  <TouchableOpacity
                      style={isValid ? styles.button : styles.disableButton}
                      disabled={!isValid}
                      onPress={handleSubmit}>
                      <Text style={styles.buttonTitle}>Update Profile</Text>
                  </TouchableOpacity>
              </>

          )}
      </Formik>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    padding: 16,
    marginLeft:30
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#788eec',
    marginRight: 30,
    marginTop: 0,
    height: 35,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    width: 220,
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 30,
    paddingHorizontal: 8
},
button: {
    backgroundColor: '#788eec',
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
},
disableButton: {
    backgroundColor: '#d3d3d3',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
},
errorText: {
    fontSize: 16,
    color: '#ff0000',
    marginHorizontal: 30,
},
buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
},
txt:{
  fontWeight: "bold"
},
profileContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20, // Add margin to create space between the profile and menu buttons
},
profileImage: {
  width: 80,
  height: 80,
  borderRadius: 40,
  marginRight: 10,
},
profileTextContainer: {
  justifyContent: 'center',
},
profileName: {
  fontSize: 22,
  fontWeight: 'bold',
},
});

export default EditProfileScreen;
