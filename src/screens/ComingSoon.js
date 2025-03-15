import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Animated } from "react-native";

const ComingSoonScreen = () => {
  // Animation values
  const fadeAnim = new Animated.Value(0); // Initial value for opacity: 0
  const bounceAnim = new Animated.Value(0); // Initial value for bounce effect

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1, // Animate to opacity: 1
      duration: 1000, // Duration of the animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();

    // Bounce animation
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: -20, // Move up
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0, // Return to original position
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, bounceAnim]);

  return (
    <View style={styles.container}>
      {/* Maintain StatusBar settings for this screen only */}
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />

      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: fadeAnim, // Apply fade-in animation
            transform: [{ translateY: bounceAnim }], // Apply bounce animation
          },
        ]}
      >
        <Text style={styles.title}>COMING</Text>
        <Text style={styles.title}>SOON</Text>
        <Text style={styles.subtitle}>We are still working on it.</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D3B66",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    fontStyle: "italic",
    marginTop: 10,
    textAlign: "center",
  },
});

export default ComingSoonScreen;