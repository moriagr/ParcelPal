// Header.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = () => {

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 0, marginBottom:15, width: '100%'}}>
        <Image source={require('../../../assets/ParcelPal.png')} style={{width: 220, height: 35 }} />
    </View>
  );
};

export default Header;


