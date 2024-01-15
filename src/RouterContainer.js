import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, RegistrationScreen, LandingScreen } from './screens';
import firebase from './firebase/config'
import { useUserContext } from './common/context/UserContext';

const Stack = createStackNavigator();

export default function RouterContainer() {
    const { setUser, user, loading, setLoading } = useUserContext();

    const checkAuthenticationStatus = () => {
        setLoading(true);
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('✌️user --->', user);
                const usersRef = firebase.firestore().collection("users")
                // .where("role", "==", (user?.role === "Client" ? "Driver" : "Client"));
                console.log('✌️usersRef --->', usersRef);
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
        <Stack.Navigator>
            {user ? (
                <Stack.Screen name="Home">
                    {props => <HomeScreen {...props} extraData={user} setUser={setUser} />}
                </Stack.Screen>
            ) : (
                <>
                    <Stack.Screen name="Landing" component={LandingScreen} />
                    <Stack.Screen name="ClientLogin" component={LoginScreen} initialParams={{ role: 'Client' }} />
                    <Stack.Screen name="DriverLogin" component={LoginScreen} initialParams={{ role: 'Driver' }} />
                    <Stack.Screen name="ClientRegistration" component={RegistrationScreen} initialParams={{ role: 'Client' }} />
                    <Stack.Screen name="DriverRegistration" component={RegistrationScreen} initialParams={{ role: 'Driver' }} />
                </>
            )}
        </Stack.Navigator>
    );
}