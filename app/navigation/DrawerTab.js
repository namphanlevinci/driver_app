import { Button } from '@components';
import {
  createDrawerNavigator,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import { HomeScreen, ScreenName } from '@screen';
import { signOut, logout, acceptShipping, shipperInfo } from '@slices/account';
import { AppStyles, images } from '@theme';
import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { formatId } from '@lib/formatId';

const Drawer = createDrawerNavigator();

function DrawerContent(props) {
  const { navigation } = props;
  const [isEnabled, setIsEnabled] = useState(false);
  const info = useSelector((state) => state.account.info);
  const status = useSelector((state) => state.account.acceptShipping);

  const isDrawerOpen = useIsDrawerOpen();

  useEffect(() => {
    if (isDrawerOpen) {
      dispatch(shipperInfo());
    }
  }, [isDrawerOpen]);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    changeStatus();
  };
  const dispatch = useDispatch();

  const closed = () => {
    navigation.closeDrawer();
  };

  const isLogout = () => {
    dispatch(signOut());
  };

  const changeStatus = () => {
    if (status) {
      dispatch(acceptShipping({ type: 0 }));
    } else {
      dispatch(acceptShipping({ type: 1 }));
    }
  };

  useEffect(() => {
    if (status) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [status]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.close} onPress={closed}>
          <Image source={images.icons.nav_close} />
        </TouchableOpacity>
      </View>
      <View style={styles.avatar}>
        <Image style={styles.image} source={images.icons.logo} />
      </View>
      <Text style={styles.name}>
        {info?.firstname} {info?.lastname}
      </Text>
      <Text style={styles.id}>ID: {info?.user_name}</Text>
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
      <View style={[styles.button, { bottom: 10, alignItems: 'center' }]}>
        <TouchableOpacity style={styles.logout} onPress={isLogout}>
          <Text style={styles.btn_text}>ĐĂNG XUẤT</Text>
        </TouchableOpacity>
        <View style={styles.version}>
          <Text style={styles.code}>Phiên bản: 1.0.0</Text>
        </View>
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
    // borderColor: AppStyles.colors.silver,
    // borderWidth: 1,
    backgroundColor: AppStyles.colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    // borderRadius: 120,
  },
  name: {
    fontSize: 22,
    // fontWeight: 'bold',
    fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
    borderColor: AppStyles.colors.text,
    marginTop: 10,
  },
  id: {
    fontSize: 13,
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
    bottom: 100,
  },
  code: {
    color: AppStyles.colors.silver,
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  version: {
    marginTop: 10,
  },
  logout: {
    borderColor: AppStyles.colors.red,
    borderWidth: 1.5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_text: {
    color: AppStyles.colors.red,
    paddingHorizontal: '20%',
    paddingVertical: 10,
    // fontWeight: 'bold'
    fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
  },
});

export default AccountDrawer;
