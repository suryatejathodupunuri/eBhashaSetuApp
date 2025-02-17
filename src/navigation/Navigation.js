// src/navigation/Navigation.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MainScreen from '../screens/MainScreen'; // Adjust the path to where MainPage.js is located
import Transliteration from '../screens/Transliteration';
const Navigation = () => {
  return (
    <View style={styles.container}>
      <Transliteration></Transliteration>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Navigation;