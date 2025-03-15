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
          <TouchableOpacity
            key={index}
            style={styles.tile}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(tool.screen)}
          >
            <View style={styles.tileContent}>
              <Text style={styles.label}>{tool.name}</Text>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>➔</Text> {/* Replace with an icon if needed */}
              </View>
            </View>
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
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A374D',
    textAlign: 'center',
    marginBottom: 24,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 80,
  },
  tile: {
    width: '48%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  tileContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A374D',
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#1fbaec',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default MainScreen;