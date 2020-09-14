import React from 'react';
import { Appbar } from 'react-native-paper';
import { Image, StyleSheet, View ,TouchableOpacity} from 'react-native';

export const Bar = ({ leftComponents, rightComponents, children, style }) => {
  return (
    <Appbar.Header style={[styles.container, style]}>
      {leftComponents && <View style={styles.leftPanel}>{leftComponents}</View>}
      {children && <View style={styles.midPanel}>{children}</View>}
      {rightComponents && (
        <View style={styles.rightPanel}>{rightComponents}</View>
      )}
      
    </Appbar.Header>
  );
};

export const Logo = ({ source }) => (
  <Image style={styles.navLogo} source={source} />
);

export const Action = ({ source }) =>
  source ? (
    <View>
      <View style={styles.action}>
        <Image source={source} style={styles.navIcon} />
      </View>
    </View>
  ) : (
    <Appbar.Action style={styles.action} />
  );

export const Space = ({}) => <View style={styles.space} />;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between'
  },

  navLogo: { width: 50, height: '100%' },

  leftPanel: {
    marginLeft: 13,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightPanel: {
    marginRight: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  midPanel: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  action: { height: '100%' },
  navIcon: { flex: 1, resizeMode: 'center' },

  space: {
    width: 8,
    height: '100%',
  },
});
