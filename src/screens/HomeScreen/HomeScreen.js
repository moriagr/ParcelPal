// HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header/Header';

const HomeScreen = ({navigation}) => {
  return (
    <View>
        <Header navigation={navigation}/>
      <Text>Welcome to the Home Screen!</Text>
    </View>
  );
};

export default HomeScreen;
