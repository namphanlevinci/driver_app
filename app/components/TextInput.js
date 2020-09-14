import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { images, AppStyles } from '@theme';
import { scaleWidth, scaleHeight } from '@lib/isIphoneX';

export const Signin = (props) => {
    const { placeholder = 'Form: ', value, onChangeText, secureTextEntry } = props;
    return (
        <View style={styles.textInput}>
            <TextInput
                style={styles.padding}
                autoCapitalize="none"
                placeholderTextColor={AppStyles.colors.silver}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
            />

        </View>
    );
};

export const Signup = (props) => {
    const { placeholder = 'Form: ', value, onChangeText, secureTextEntry } = props;
    return (
        <View style={styles.textInput}>
            <TextInput
                style={styles.padding}
                autoCapitalize="none"
                placeholderTextColor={AppStyles.colors.silver}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        width: scaleWidth(85),
        height: scaleWidth(12),
        borderRadius: 8,
        backgroundColor: AppStyles.colors.white,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    padding: {
        marginLeft: 12,
        fontSize: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppStyles.colors.white,
    },

})
