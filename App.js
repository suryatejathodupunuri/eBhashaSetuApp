import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform, View } from 'react-native';
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Ensure the system's status bar is visible */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      
      {isSplashVisible ? (
        <SplashScreen />
      ) : (
        <>
          {/* Header Component */}
          <Header />

          {/* Bottom Tab Navigation */}
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
