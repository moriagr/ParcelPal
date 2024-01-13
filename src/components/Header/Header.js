// Header.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({navigation}) => {

    const toggleDrawer = () => {
        navigation.toggleDrawer();
    };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <Image source={require('../../../assets/ParcelPal.png')} style={{width: 220, height: 35 }} />
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon name="menu" size={35} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;


