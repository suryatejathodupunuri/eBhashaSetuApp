import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, StatusBar, Platform } from 'react-native';
import logo from '../../assets/splash-icon.png';

const Header = () => {
  const [statusBarHeight, setStatusBarHeight] = useState(Platform.OS === 'android' ? StatusBar.currentHeight : 0);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <View style={[styles.navbar, { paddingTop: statusBarHeight }]}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A374D',
    height: 70,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
});

export default Header;
