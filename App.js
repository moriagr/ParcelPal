import React from 'react';
import { decode, encode } from 'base-64';
import { UserProvider } from './src/common/context/UserContext';
import RouterContainer from './src/RouterContainer';
import { NavigationContainer } from '@react-navigation/native';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {
    return (
        <UserProvider>
            <NavigationContainer>
                <RouterContainer />
            </NavigationContainer>
        </UserProvider>
    );
}