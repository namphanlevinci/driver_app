import React from 'react';
import { View, SafeAreaView, StyleSheet, Text, FlatList } from 'react-native';
import { Header, Item } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';
import { scaleWidth, scaleHeight } from '@lib/isIphoneX';

const Notification = () => {
  const data = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    }
  ]
  const back = () => {
    NavigationService.goBack()
  }
  return (
    <View style={AppStyles.styles.container}>
      <Header.Back title={'Thông báo'} goback={back} />
      <View style={styles.container}>
        <View style={styles.order}>
          <FlatList
            style={styles.list}
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          
            renderItem={() => <Item.Notify />}
            
          />
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: AppStyles.colors.background,
  },
  order: {
    marginLeft: scaleWidth(2.5),
    marginRight: scaleWidth(2.5),
  },
});

export default Notification;
