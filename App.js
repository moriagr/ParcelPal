import React from 'react';
import { decode, encode } from 'base-64';
import { UserProvider } from './src/common/context/UserContext';
import RouterContainer from './src/RouterContainer';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva'; // Import light theme from UI Kitten

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {
    return (
        <UserProvider>
        <NavigationContainer>
            <ApplicationProvider mapping={mapping} theme={lightTheme}>
                <RouterContainer />
            </ApplicationProvider>
        </NavigationContainer>
        </UserProvider>
    );
}