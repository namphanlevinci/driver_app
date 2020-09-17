import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight } from '@lib/isIphoneX';
import { AppStyles } from '@theme';

export const Small = (props) => {
    const {
        onPress,
        title,
        backgroundColor,
        textColor
    } = props;
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.small, { backgroundColor: backgroundColor }]}>
                <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const Medium = (props) => {
    const {
        onPress,
        title,
        backgroundColor,
        textColor
    } = props;
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.medium, { backgroundColor: backgroundColor }]}>
                <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const Large = (props) => {
    const {
        onPress,
        title,
        backgroundColor,
        textColor
    } = props;
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.large, { backgroundColor: backgroundColor }]}>
                <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const SmallRadius = (props) => {
    const {
        onPress,
        title,
        backgroundColor,
        textColor
    } = props;
    return (
        <TouchableOpacity style={styles.container_top} onPress={onPress}>
            <View style={[styles.smallRadius, { backgroundColor: backgroundColor }]}>
                <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const LargeRadius = (props) => {
    const {
        onPress,
        title,
        backgroundColor,
        textColor
    } = props;
    return (
        <TouchableOpacity style={styles.container_bottom} onPress={onPress}>
            <View style={[styles.largeRadius, { backgroundColor: backgroundColor }]}>
                <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container_top: {
        margin: '1%',
        width: '28.5%'
    },
    container_bottom: {
        margin: '1%',
        width: '90%'
    },
    small: {
        width: scaleWidth(35),
        height: scaleWidth(13),
        borderRadius: 29,
        backgroundColor: AppStyles.colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    medium: {
        width: scaleWidth(50),
        height: scaleWidth(13),
        borderRadius: 29,
        backgroundColor: AppStyles.colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    large: {
        width: scaleWidth(85),
        height: scaleWidth(13),
        borderRadius: 29,
        backgroundColor: AppStyles.colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: AppStyles.colors.text
    },

    smallRadius: {
        // width: '25%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    largeRadius: {
        // width: '90%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
