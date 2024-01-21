import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useUserContext } from '../../common/context/UserContext.js';
import { Formik } from 'formik'
import { registrationValidationScheme } from '../../components/Schemes/LoginRegistrationSchemes.js';
import PasswordField from '../../components/PassswordField.js';

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
      <TouchableOpacity onPress={handleEditProfilePicture}>
        <Image source={profilePicture} style={styles.profilePicture} />
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleEditName}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.editButton}>Edit</Text>
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

                  <TextInput
                      style={styles.input}
                      placeholderTextColor="#aaaaaa"
                      placeholder={user.email}
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                  />
                  {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                  <TouchableOpacity
                      style={isValid ? styles.button : styles.disableButton}
                      disabled={!isValid}
                      onPress={handleSubmit}>
                      <Text style={styles.buttonTitle}>Create account</Text>
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
    color: 'green',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  }
});

export default EditProfileScreen;
