import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Display the logo */}
      <Image
        source={require('../../assets/splash-icon.png')} // Update the path if needed
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
  },
  logo: {
    width: 150, 
    height: 150,
    resizeMode: 'contain',
  },
});

export default SplashScreen;