import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import firebase from './../../firebase/config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../../common/context/UserContext';
import PasswordField from '../../components/PassswordField';
import { Formik } from 'formik';
import { loginValidationScheme } from '../../components/Schemes/LoginRegistrationSchemes';

export default function LoginScreen({ navigation, route }) {
    const { setUser } = useUserContext();

    const onFooterLinkPress = () => {
        navigation.navigate('Registration', { role: route.params.role })
    }

    const onLoginPress = async (values) => {
        try {
            const querySnapshot = await firebase
                .firestore()
                .collection('users')
                .where('email', '==', values.email)
                .get()

            if (querySnapshot.empty) {
                alert('User not found');
                return;
            }

            // Assuming there's only one user with the given email
            const user = querySnapshot.docs[0].data();

            // Check the role
            if (user.role !== route.params.role) {
                alert('Invalid role for this user');
                return;
            }

            firebase
                .auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .then(async (response) => {
                    const uid = response.user.uid
                    const userToken = await response.user.getIdToken(); // Get user token

                    // Store the token securely
                    await AsyncStorage.setItem('userToken', userToken);

                    const usersRef = firebase.firestore().collection('users')
                    usersRef
                        .doc(uid)
                        .get()
                        .then(firestoreDocument => {
                            if (!firestoreDocument.exists) {
                                alert("User does not exist anymore.")
                                return;
                            }
                            const user = firestoreDocument.data()
                            setUser(user);
                            if (route.params.role == "Driver") {
                                navigation.navigate('HomeDriver')
                            } else {
                                navigation.navigate('HomeClient')
                            }
                        })
                        .catch(error => {
                            alert(error)
                        });
                })
                .catch(error => {
                    alert(error)
                })
        } catch (error) {
            alert(error)
        }

    }

    let drivers = 56;
    let clients = 130;
    let totaldeliverys = 342;

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/ParcelPal.png')}
                />
                <Text style={styles.headline}>Join {clients} clients with over {totaldeliverys} successfull deliverys</Text>

                <Image
                    style={styles.img}
                    source={require('../../../assets/client.png')}
                />
                <Formik
                    validationSchema={loginValidationScheme}
                    initialValues={{
                        fullName: '',
                        phoneNumber: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    onSubmit={values => {
                        onLoginPress(values)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (

                        <>
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

                            <TouchableOpacity
                                style={isValid ? styles.button : styles.disableButton}
                                disabled={!isValid}
                                onPress={handleSubmit}>
                                <Text style={styles.buttonTitle}>Log in</Text>
                            </TouchableOpacity>
                        </>)}
                </Formik>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}