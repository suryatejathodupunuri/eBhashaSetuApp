import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const SplashScreen = ({ onFinish }) => {
  const videoRef = useRef(null);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../../assets/splashscreen.mp4')} // Ensure this file exists
        style={styles.video}
        resizeMode="cover"
        shouldPlay
        isLooping={false} // Set to true if you want looping effect
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            onFinish(); // Hide splash when video ends
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Background color in case the video doesn't fill the screen
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
