import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import firebase from '../../firebase/config.js'
import { useUserContext } from '../../common/context/UserContext.js';
import PasswordField from '../../components/PassswordField.js';
import { Formik } from 'formik'
import { registrationValidationScheme } from '../../components/Schemes/LoginRegistrationSchemes.js';

export default function RegistrationScreen({ navigation, route }) {
    //use user ocntext
    const { setUser } = useUserContext();

    // go to login screen
    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }
    // upon registration save data to database
    const onRegisterPress = (values) => {
        console.log('✌️values --->', values);
        
        firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((response) => {
                const uid = response.user.uid
                //default profile picture
                const DefaultProfilePicture = require('../../../assets/defaultPP.png');

                //data to save
                let data = {
                    id: uid,
                    email: values.email,
                    role: route.params.role,
                    fullName: values.fullName,
                    phone: values.phoneNumber,
                    profilePicture: DefaultProfilePicture,
                };
                // ADD fields based on role
                if (route.params.role === 'Driver') {
                    // If the role is Driver, add avgReview field
                    data = {
                      ...data,
                      reviews: [],
                    };
                  } else {
                    // If the role is not Driver, add packagesSent field
                    data = {
                      ...data,
                      packagesSent: 0,
                      reviews: [],
                    };
                  }
                const usersRef = firebase.firestore().collection('users')

                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        setUser(data);
                        if (route.params.role == "Driver") {
                            navigation.navigate('HomeDriver')
                        } else {
                            navigation.navigate('HomeClient')
                        }
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
            });
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/ParcelPal.png')}
                />
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
                                placeholder="Full Name"
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
                                placeholder='Phone number'
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
                                placeholder="Email"
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                            <PasswordField styles={styles} name="password" title="Password" value={values.password} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />

                            <PasswordField styles={styles} name="confirmPassword" title="Confirm password" value={values.confirmPassword} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />

                            <TouchableOpacity
                                style={isValid ? styles.button : styles.disableButton}
                                disabled={!isValid}
                                onPress={handleSubmit}>
                                <Text style={styles.buttonTitle}>Create account</Text>
                            </TouchableOpacity>
                        </>

                    )}
                </Formik>

                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}