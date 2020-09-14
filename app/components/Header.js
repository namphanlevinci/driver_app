import React from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as TopBar from './TopBar';
import { images, AppStyles } from '@theme';

export const Main = (props) => {
    const { notification, account} = props;
    return (
        <TopBar.Bar
            style={AppStyles.styles.topBar}
            leftComponents={
                <TouchableOpacity onPress={account} >
                    <TopBar.Action source={images.icons.nav_account} />
                </TouchableOpacity>
            }
            rightComponents={
                <>
                    <TouchableOpacity onPress={notification}>
                        <TopBar.Action source={images.icons.nav_notify} />
                    </TouchableOpacity>
                </>
            }>
            <TopBar.Logo source={images.icons.nav_logo} />
        </TopBar.Bar>
    );
};

export const Back = (props) => {
    const { goback, title } = props;
    return (
        <TopBar.Bar
            style={AppStyles.styles.topBar}
            leftComponents={
                <TouchableOpacity onPress={goback}>
                    <TopBar.Action source={images.icons.nav_back} />
                </TouchableOpacity>
            }
            rightComponents={
                <TopBar.Space />
            }>

            <Text style={styles.title}>{title}</Text>
        </TopBar.Bar>
    );
};


const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppStyles.colors.white,
    },

})
