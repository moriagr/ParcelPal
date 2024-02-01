import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import firebase, { auth, database } from './../../firebase/config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../../common/context/UserContext';
import PasswordField from '../../components/PassswordField';
import { Formik } from 'formik';
import { loginValidationScheme } from '../../components/Schemes/LoginRegistrationSchemes';

export default function LoginScreen({ navigation, route }) {
    //use user context
    const { setUser } = useUserContext();
    const [loading, setLoading] = useState(false);

    // navigate to registration page if user dose not have account or wants to sign up
    const onFooterLinkPress = () => {
        navigation.navigate('Registration', { role: route.params.role })
    }

    // Login function 
    const onLoginPress = async (values) => {
        setLoading(true)
        try {
            const querySnapshot = await firebase
                .firestore()
                .collection('users')
                .where('email', '==', values.email)
                .get()

            if (querySnapshot.empty) {
                setLoading(false)
                // alert if user not found
                alert('User not found');
                return;
            }

            // Assuming there's only one user with the given email
            const user = querySnapshot.docs[0].data();

            // Check the role
            if (user.role !== route.params.role) {
                setLoading(false)
                // Driver should login as driver , client as client
                alert('Invalid role for this user');
                return;
            }

            auth.signInWithEmailAndPassword(values.email, values.password)
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
                                setLoading(false)
                                alert("User does not exist anymore.")
                                return;
                            }
                            const user = firestoreDocument.data()
                            setUser(user);
                            setLoading(true);
                            if (route.params.role == "Driver") {
                                navigation.navigate('HomeDriver')
                            } else {
                                navigation.navigate('HomeClient')
                            }
                        })
                        .catch(error => {
                            setLoading(false)
                            alert(error)
                        });
                })
                .catch(error => {
                    setLoading(false)
                    alert(error)
                })
        } catch (error) {
            setLoading(false)
            alert(error)
        }

    }

    // dynamic paremters taken from firebase
    let drivers = route.params.driversCount;
    let clients = route.params.clientsCount;
    let totaldeliverys = route.params.deliveriesCount;
    // headline and hero banner image based on role 
    // will be diffretn for client and driver
    let Headline ="";
    let BannerImg =""
    if (route.params.role === "Client") {
        Headline = `Join ${clients} clients with over ${totaldeliverys} successful deliveries`;
        BannerImg = require('../../../assets/client.png');
      } else { // else is driver
        Headline = `Join ${drivers} drivers with over ${totaldeliverys} successful deliveries`;
        BannerImg = require('../../../assets/driver.png');
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
                <Text style={styles.headline}>{Headline}</Text>

                <Image
                    style={styles.img}
                    source={BannerImg}
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
                                <Text style={styles.buttonTitle}>Log in {loading ? ". . ." : ""}</Text>
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