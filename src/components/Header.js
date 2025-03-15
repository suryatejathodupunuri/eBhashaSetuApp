import React from 'react';
import { View, Image, StyleSheet, Platform, StatusBar } from 'react-native';
import logo from '../../assets/splash-icon.png';

const Header = () => {
  // Calculate status bar height for Android
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

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
    height: Platform.OS === 'android' ? 30 + StatusBar.currentHeight : 70, // Adjust height for Android
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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