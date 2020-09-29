import React from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as TopBar from './TopBar';
import { images, AppStyles } from '@theme';

export const Main = (props) => {
    const { notification, account } = props;
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

export const BackOrder = (props) => {
    const { goback, title, time, status } = props;
    return (
        <TopBar.Bar
            style={AppStyles.styles.topBar}
            leftComponents={
                <TouchableOpacity onPress={goback}>
                    <TopBar.Action source={images.icons.nav_back} />
                </TouchableOpacity>
            }
            rightComponents={
                <View style={styles.status}>
                    <Text style={styles.colors}>{status}</Text>
                </View>
            }>
            <View style={styles.content}>
                <Text style={styles.title}>Đơn hàng #{title}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>

        </TopBar.Bar>
    );
};


const styles = StyleSheet.create({
    title: {
        fontSize: 16.5,
        fontWeight: 'bold',
        color: AppStyles.colors.white,
    },
    time: {
        fontSize: 14,
        color: AppStyles.colors.white,
    },
    content: {
        marginRight: -45,
        alignItems: 'center'
    },
    status:{
        height: 25,
        borderRadius: 20,
        backgroundColor: AppStyles.colors.blue,
        alignItems:'center',
        justifyContent: 'center'
    },
    colors: {
        padding: 5,
        color: AppStyles.colors.white,
        fontSize: 12,
    }

})
