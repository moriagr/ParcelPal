import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import firebase from './../../firebase/config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../../common/context/UserContext';

export default function LoginScreen({ navigation, role }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useUserContext();


    const onFooterLinkPress = () => {
        navigation.navigate(role + 'Registration')
    }

    const onLoginPress = () => {
        try {

            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(async (response) => {
                    const uid = response.user.uid
                    const userToken = await response.user.getIdToken(); // Get user token
                    console.log('✌️userToken --->', userToken);

                    // Store the token securely
                    await AsyncStorage.setItem('userToken', userToken);

                    const usersRef2222 = firebase.firestore().collection('users')
                    console.log('✌️usersRef2222 --->', usersRef2222);
                    usersRef2222
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
                            navigation.navigate('Home', { user })
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