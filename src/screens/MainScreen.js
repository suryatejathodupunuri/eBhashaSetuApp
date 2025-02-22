import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const MainScreen = ({ navigation }) => {
  const tools = [
    { name: 'Translation', screen: 'Translation' },
    { name: 'Transliteration', screen: null },
    { name: 'Content Creation', screen: null },
    { name: 'Text-to-Speech', screen: null },
    { name: 'Speech-to-Text', screen: null },
    { name: 'Subtitling', screen: null },
    { name: 'Localization', screen: null },
    { name: 'Transcription', screen: null },
  ];

  const handlePress = (tool) => {
    if (tool.screen) {
      navigation.navigate(tool.screen); // Navigate to Translation.js
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Our Tools</Text>
      
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {tools.map((tool, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tile}
            onPress={() => handlePress(tool)}
          >
            <Text style={styles.label}>{tool.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#333333', textAlign: 'center', marginBottom: 20 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: 80 },
  tile: { width: '48%', height: 140, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#A2D9F7', marginBottom: 15 },
  label: { fontSize: 18, fontWeight: 'bold', color: '#333333', textAlign: 'center' },
});

export default MainScreen;
