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
    backgroundColor: '#333',
    height: 65, // Fixed height ensures it does not expand initially
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 90, // Adjusted size for better fit
    height: 35,
    resizeMode: 'contain',
  },
});

export default Header;
