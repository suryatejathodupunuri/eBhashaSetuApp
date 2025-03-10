import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const MainScreen = ({ navigation }) => {
  const tools = [
    { name: 'Translation (NMT)', screen: 'Translation' },
    { name: 'Translation (SMT)', screen: 'Translation2' },
    { name: 'Transliteration', screen: 'Transliteration' },
    { name: 'Content Creation', screen: 'ComingSoon' },
    { name: 'Speech-to-Text', screen: 'ComingSoon' },
    { name: 'Subtitling', screen: 'ComingSoon' },
    { name: 'Localization', screen: 'ComingSoon' },
    { name: 'Transcription', screen: 'ComingSoon' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Our Tools</Text>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {tools.map((tool, index) => (
          <TouchableOpacity key={index} style={styles.tile} activeOpacity={0.7} onPress={() => navigation.navigate(tool.screen)}>
            <Text style={styles.label}>{tool.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A374D',
    textAlign: 'center',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 80,
  },
  tile: {
    width: '48%',
    height: 140,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A2D9F7',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A374D',
    textAlign: 'center',
  },
});

export default MainScreen;
