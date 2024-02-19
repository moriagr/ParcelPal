import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import inputStyles from '../inputStyles';

const FloatingLabelInput = ({ label, value, setValue, style = null, ...props }) => {

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.label}>
                {label}
            </Text>
            <TextInput
                style={[inputStyles.input, { marginLeft: 0 }]}
                onChangeText={text => setValue(text)}
                value={value}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // paddingTop: 18,
        padding: 0,
        margin: 0,
        width: "100%"
    },
    label: {
        position: 'absolute',
        left: -10,
        zIndex: 2,
        fontSize: 16,
        color: '#aaa',
    },
    //   labelFocused: {
    //     top: -18,
    //     fontSize: 12,
    //     color: '#000',
    //   },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: 16,
        paddingVertical: 8,
    },
});

export default FloatingLabelInput;
