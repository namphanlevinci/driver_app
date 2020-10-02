import { Button } from '@components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen, ScreenName } from '@screen';
import { signOut } from '@slices/account';
import { AppStyles, images } from '@theme';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();

function DrawerContent(props) {
  const { navigation } = props;
  const [isEnabled, setIsEnabled] = useState(false);
  const info = useSelector((state) => state.account.info);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const dispatch = useDispatch();

  const closed = () => {
    navigation.closeDrawer();
  };

  const isLogout = () => {

    dispatch(signOut());
    // dispatch(orderList());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.close} onPress={closed}>
          <Image source={images.icons.nav_close} />
        </TouchableOpacity>
      </View>
      <View style={styles.avatar}>
        <Image
          style={styles.image}
          source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
        />
      </View>
      {/* <Text style={styles.name}>{info?.firstname} {info?.lastname}</Text> */}
      <Text style={styles.name}>LEVINCI</Text>
      <Text style={styles.id}>ID: 007</Text>
      <View style={styles.row}>
        <Text style={styles.text}>Tắt/Bật trạng thái nhận đơn hàng</Text>
        <Switch
          trackColor={{
            false: AppStyles.colors.silver,
            true: AppStyles.colors.blue,
          }}
          thumbColor={AppStyles.colors.white}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={[styles.button, { bottom: 50 }]}>
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
      <Drawer.Screen name={ScreenName.Home}>
        {(props) => <HomeScreen {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.white,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '10%',
    justifyContent: 'flex-end',
  },
  close: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: AppStyles.colors.silver,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderColor: AppStyles.colors.silver,
    borderWidth: 1,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    borderColor: AppStyles.colors.text,
    marginTop: 10,
  },
  id: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    borderColor: AppStyles.colors.silver,
    marginTop: 10,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    borderColor: AppStyles.colors.silver,
    paddingRight: 10,
  },
  button: {
    position: 'absolute',
    bottom: 400,
  },
});

export default AccountDrawer;
