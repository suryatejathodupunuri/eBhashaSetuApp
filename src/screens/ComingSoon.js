import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

const ComingSoonScreen = () => {
  return (
    <View style={styles.container}>
      {/* Maintain StatusBar settings for this screen only */}
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>COMING</Text>
        <Text style={styles.title}>SOON</Text>
        <Text style={styles.subtitle}>We are still working on it.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the screen only takes available space below the header
    backgroundColor: "#0D3B66",
    padding: 20,
    justifyContent: "center", // Centers content in remaining space
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
