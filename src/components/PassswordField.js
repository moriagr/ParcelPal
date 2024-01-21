import React, { useState } from 'react'
import { Image, TextInput, TouchableOpacity, View, Text } from 'react-native'

export default function PasswordField({ styles, name, title, value, handleBlur, handleChange, errors }) {
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <>
            <View style={[styles.input, { direction: "ltr", flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }]}>
                <TextInput
                    style={{ width: '90%', padding: 0 }}
                    secureTextEntry={hidePassword}
                    placeholder={title}
                    placeholderTextColor="#aaaaaa"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={handleChange(name)}
                    onBlur={handleBlur(name)}
                />
                <TouchableOpacity onPress={() => setHidePassword(prev => !prev)}>
                    <Image source={hidePassword ? require('../../assets/eyeHide.png') : require('../../assets/eyeView.png')} style={{ width: 30, height: 30 }} on />
                </TouchableOpacity>
            </View>
            {errors[name] && <Text style={styles.errorText}>{errors[name]}</Text>}

        </>
    )
}