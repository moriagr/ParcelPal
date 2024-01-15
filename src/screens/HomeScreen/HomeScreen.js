import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import firebase from '../../firebase/config';

export default function HomeScreen(props) {

    const logOut = () => {
        firebase.auth()
            .signOut()
            .then(() => {
                props.setUser(null);
                console.log('User signed out!')
            });

    }
    return (
        <View>
            <Text>Home Screen</Text>
            <TouchableOpacity style={{ backgroundColor: "blue", width: "auto", height: "auto" }} onPress={() => logOut()}><Text>Log out</Text></TouchableOpacity>
        </View>
    )
}