import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from './firebase/config'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { useUserContext } from './common/context/UserContext';

import {
    LoginScreen,
    HomeScreenClient,
    RegistrationScreen,
    LandingScreen,
    HomeScreenDriver,
    MyDrivesScreen,
    PackageStatusScreen,
    AddDriveScreen,
    NewDeliveryScreen,
    EditProfileScreen,
    ChatsScreen,
    CurrentChat,
    EditDeliveryScreen,
    PickDriveScreen,
    PickPackagesScreen,
    ReviewsGivenScreen,
    ReviewsRecivedScreen,
    ChoosenDeliveriesScreen
} from './screens';


const Stack = createStackNavigator();

export default function RouterContainer() {
    const { setUser, user, loading, setLoading } = useUserContext();

    const checkAuthenticationStatus = () => {
        setLoading(true);
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const usersRef = firebase.firestore().collection("users")
                if (usersRef) {

                    usersRef
                        .doc(user.uid)
                        .get()
                        .then((document) => {
                            const userData = document.data();
                            setLoading(false);
                            setUser(userData);
                        })
                        .catch((error) => {
                            setLoading(false);
                        });
                } else {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        checkAuthenticationStatus();
    }, []);


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f2f2f2',
                    shadowColor: "gray",
                    elevation: 20,
                    // shadowColor: '#000',
                    // shadowOffset: { width: 0, height: 2 },
                    // shadowOpacity: 0.25,
                    // shadowRadius: 3.84
                },
            }}>
            {user ?
                user.role == "Driver" ? (
                    <>
                        <Stack.Screen name="HomeDriver" component={HomeScreenDriver} />
                        <Stack.Screen name="PackageStatus" component={PackageStatusScreen} />
                        <Stack.Screen name="MyDrives" component={MyDrivesScreen} />
                        <Stack.Screen 
                            name="AddDriveScreen" 
                            component={AddDriveScreen} 
                            options={{
                                title: 'Add New Drive',
                            }}
                        />
                        <Stack.Screen 
                            name="PickPackagesScreen" 
                            component={PickPackagesScreen} 
                            options={{
                                title: 'Pick Packages',
                            }}
                        />
                        <Stack.Screen name="ChatsScreen" component={ChatsScreen} />
                        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
                        <Stack.Screen name="CurrentChat" component={CurrentChat} />
                        <Stack.Screen name="ReviewsRecivedScreen" component={ReviewsRecivedScreen} />
                        <Stack.Screen name="ChoosenDeliveriesScreen" component={ChoosenDeliveriesScreen} />


                    </>
                ) : (
                    <>
                        <Stack.Screen name="HomeClient" component={HomeScreenClient} />
                        <Stack.Screen name="PackageStatus" component={PackageStatusScreen} />
                        <Stack.Screen name="MyDrives" component={MyDrivesScreen} />
                        <Stack.Screen name="ChatsScreen" component={ChatsScreen} />
                        <Stack.Screen 
                            name="NewDeliveryScreen" 
                            component={NewDeliveryScreen} 
                            options={{
                                title: 'Add New Package',
                            }}
                        />
                        <Stack.Screen name="EditDeliveryScreen" component={EditDeliveryScreen} />
                        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
                        <Stack.Screen name="CurrentChat" component={CurrentChat} />
                        <Stack.Screen name="PickDriveScreen" component={PickDriveScreen} />
                        <Stack.Screen name="ReviewsGivenScreen" component={ReviewsGivenScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Landing" component={LandingScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Registration" component={RegistrationScreen} />
                    </>
                )}
        </Stack.Navigator>
    );
}