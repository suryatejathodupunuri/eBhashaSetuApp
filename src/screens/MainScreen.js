import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const MainScreen = () => {
  const tools = [
    'Translation',
    'Transliteration',
    'Content Creation',
    'Text-to-Speech',
    'Speech-to-Text',
    'Subtitling',
    'Localization',
    'Transcription',
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Our Tools</Text>

      {/* Scrollable Grid Container */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {tools.map((tool, index) => (
          <TouchableOpacity key={index} style={[styles.square, { backgroundColor: '#A2D9F7' }]}>
            <Text style={styles.label}>{tool}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'space-between', // Ensures content takes full height leaving space for footer
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 60, // Adding bottom padding to ensure space for footer
  },
  square: {
    width: '48%', // Slightly less than half to account for spacing
    height: 150,  // Increased height of each tile
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  footer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
  },
});

export default MainScreen;
