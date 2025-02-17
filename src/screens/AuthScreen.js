import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

// Import the image properly
import authImage from "../../assets/auth-bg.jpg";

// Get device height for better positioning
const { height, width } = Dimensions.get("window");

export default function AuthScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={() => alert("Skipped!")}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={authImage} style={styles.authImage} resizeMode="contain" />
      </View>

      {/* Login Box Section */}
      <View style={styles.loginBoxContainer}>
        <View style={styles.loginBox}>
          <Text style={styles.heading}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email / Mobile Number"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  skipButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 10, // Ensures it's above other elements
  },
  skipText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff", // Highlight with blue color
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authImage: {
    width: width * 0.9,
    height: height * 0.35,
    marginTop: 40,
  },
  loginBoxContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
  },
  loginBox: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "center",
    marginBottom: height * 0.1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 12,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#ff4d4d",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});