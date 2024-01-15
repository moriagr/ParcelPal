import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function LandingScreen({ navigation }) {

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onDriverLoginPress = () => {
        navigation.navigate('DriverLogin')
    }

    const onClientLoginPress = () => {
        navigation.navigate('ClientLogin')
    }

    const onLoginDriverPress = () =>{
        navigation.navigate('LoginDriver')
    }

    const onPackageStatus = () =>{
        navigation.navigate('PackageStatus')
    }

    const onHomeDriver = () =>{
        navigation.navigate('HomeDriver')
    }

    const onHome = () =>{
        navigation.navigate('Home')
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
                <Text style={styles.headline}>Join {drivers} Delivery drivers and {clients} clients with over {totaldeliverys} successfull deliverys</Text>
                <View>
                <Image
                    style={styles.img}
                    source={require('../../../assets/Landingimg.png')}
                />
                </View>
                <View style={styles.choice}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onDriverLoginPress()}>
                        <Text style={styles.buttonTitle}>Driver Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onClientLoginPress()}>
                        <Text style={styles.buttonTitle}>Client Log in</Text>
                    </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity
                        style={styles.button}
                        onPress={() => onHomeDriver()}>
                        <Text style={styles.buttonTitle}>HomeDriver</Text>
                    </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity
                        style={styles.button}
                        onPress={() => onHome()}>
                        <Text style={styles.buttonTitle}>Home</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}