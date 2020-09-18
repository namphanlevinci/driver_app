import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Image, View, Text, TouchableOpacity, Switch } from 'react-native';
import { images, AppStyles } from '@theme';
import {
    HomeScreen,
    ScreenName,
} from '@screen';
import { Button } from '@components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@slices/account';


const Drawer = createDrawerNavigator();

function DrawerContent(props) {
    const { navigation } = props;
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const dispatch = useDispatch();
    const bottom = useSelector((state) => state.app.bottom);

    const closed = () => {
        navigation.closeDrawer()
    }

    const isLogout = () => {
        dispatch(logout());
    }



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.close}
                    onPress={closed}>
                    <Image
                        source={images.icons.nav_close}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.avatar}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
                />
            </View>
            <Text style={styles.name}>Nguyen Thanh Van</Text>
            <Text style={styles.id}>ID: 123456</Text>
            <View style={styles.row}>
                <Text style={styles.text}>Tắt/Bật trạng thái nhận đơn hàng</Text>
                <Switch
                    trackColor={{ false: AppStyles.colors.silver, true: AppStyles.colors.blue }}
                    thumbColor={AppStyles.colors.white}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={[styles.button, {bottom: 50}]}>
                <Button.Medium
                    title={'Đăng Xuất'}
                    backgroundColor={AppStyles.colors.yellow}
                    textColor={AppStyles.colors.white}
                    onPress={isLogout}
                />
            </View>
        </View>
    );
}

function AccountDrawer(props) {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name={ScreenName.Home}  >
                {(props) => <HomeScreen {...props} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.colors.background,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: '10%',
        justifyContent: 'flex-end'
    },
    close: {
        width: 35,
        height: 35,
        borderRadius: 35,
        backgroundColor: AppStyles.colors.silver,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 150,
        borderColor: AppStyles.colors.silver,
        borderWidth: 1
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 150,
    },
    name: {
        fontSize: 21,
        fontWeight: 'bold',
        borderColor: AppStyles.colors.text,
        marginTop: 10
    },
    id: {
        fontSize: 14,
        borderColor: AppStyles.colors.silver,
        marginTop: 10
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        borderColor: AppStyles.colors.silver,
        paddingRight: 10
    },
    button: {
        position: 'absolute',
        bottom: 400
    }

});


export default AccountDrawer;
