import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import firebase from './../../firebase/config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../../common/context/UserContext';

export default function LoginScreen({ navigation, route }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useUserContext();

    const onFooterLinkPress = () => {
        navigation.navigate('Registration', { role: route.params.role })
    }

    const onLoginPress = async () => {
        try {
            const querySnapshot = await firebase
                .firestore()
                .collection('users')
                .where('email', '==', email)
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
                .signInWithEmailAndPassword(email, password)
                .then(async (response) => {
                    const uid = response.user.uid
                    const userToken = await response.user.getIdToken(); // Get user token
                    console.log('✌️userToken --->', userToken);

                    // Store the token securely
                    await AsyncStorage.setItem('userToken', userToken);

                    console.log('✌️role --->', route.params.role);
                    const usersRef = firebase.firestore().collection('users')
                    // .where("role", "==", route.params.role);
                    console.log('✌️usersRef1234567890 --->', usersRef);
                    usersRef
                        .doc(uid)
                        .get()
                        .then(firestoreDocument => {
                            console.log('✌️firestoreDocument11111111 --->', firestoreDocument);
                            if (!firestoreDocument.exists) {
                                alert("User does not exist anymore.")
                                return;
                            }
                            const user = firestoreDocument.data()
                            console.log('✌️user --->', user);
                            setUser(user);
                            navigation.navigate('Home')
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
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}