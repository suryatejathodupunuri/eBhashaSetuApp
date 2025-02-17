import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// Import the logo from your assets folder
import logo from '../../assets/splash-icon.png'; // Update with the correct path

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'center', // Centers the logo horizontally
    alignItems: 'center', // Vertically centers the logo
    paddingVertical: 10, // Padding for top and bottom
    backgroundColor: '#333', // Navbar background color
    height: 50, // Reduced height of navbar
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80, // Adjust logo size if needed
    height: 30,
    resizeMode: 'contain',
  },
});

export default Navbar;
