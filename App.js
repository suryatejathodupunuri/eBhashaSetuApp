import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Text, StatusBar, Platform, View } from 'react-native';
import Navigation from './src/navigation/Navigation';
import Navbar from './src/components/Header';
import SplashScreen from './src/screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import Transliteration from './src/screens/Transliteration';
import MainScreen from './src/screens/MainScreen';
const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} />

      {/* Show splash screen while it's visible */}
      {isSplashVisible ? (
        <SplashScreen />
      ) : (
        <>
          {/* Navbar visible after splash screen */}
          <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <Navbar />
          </View>
          
          <ScrollView contentContainerStyle={styles.mainContent}>

            {/* Add Navigation component below the text */}
            \
            <NavigationContainer>
              <MainScreen></MainScreen>
              </NavigationContainer>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    paddingTop: 20, 
    paddingHorizontal: 15,
    paddingBottom: 20, 
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default App;