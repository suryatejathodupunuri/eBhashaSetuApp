import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import Navigation from './src/navigation/Navigation';
import Header from './src/components/Header';

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar Configuration */}
      <StatusBar
        backgroundColor="#1A374D" // Match your header color
        barStyle="light-content"   // Light text for dark background
        translucent={false}        // Ensure it's not translucent
      />
      {isSplashVisible ? (
        <SplashScreen onFinish={() => setIsSplashVisible(false)} />
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
    backgroundColor: '#F5F7FA', // Match your app's background color
  },
});

export default App;