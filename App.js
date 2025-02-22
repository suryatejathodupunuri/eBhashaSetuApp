import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import Navigation from './src/navigation/Navigation';
import Header from './src/components/Header';

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Ensure status bar always has correct style
    StatusBar.setBarStyle('light-content'); // Change to 'dark-content' if needed
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#333" barStyle="light-content" translucent={false} />
      
      {isSplashVisible ? (
        <SplashScreen />
      ) : (
        <>
          <Header />
          <Navigation />
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
});

export default App;
