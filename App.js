import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
//import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoginScreen, HomeScreen, RegistrationScreen, LandingScreen, PackageStatusScreen, LoginScreenDriver, HomeScreenDriver, MyDrivesScreen, MyPointsScreen} from './src/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="PackageStatus" component={PackageStatusScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="LoginDriver" component={LoginScreenDriver} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="HomeDriver" component={HomeScreenDriver} />
            <Stack.Screen name="MyDrives" component={MyDrivesScreen} />
            <Stack.Screen name="MyPoints" component={MyPointsScreen} />


          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}