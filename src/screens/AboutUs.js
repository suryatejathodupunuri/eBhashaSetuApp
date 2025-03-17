import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.text}>
        eBhasha Setu is a technology startup incubated at IIIT Hyderabad. For 9 years, we have been working in the
        field of language computing, developing platforms for all your medium and language transformation needs.
      </Text>
      <Text style={styles.text}>
        We are passionate about breaking down language barriers and fostering effective communication across diverse
        cultures. By harnessing the power of AI alongside human expertise, we create a seamless bridge between
        languages.
      </Text>

      <Text style={styles.subtitle}>Our Vision</Text>
      <Text style={styles.text}>Democratizing Internet - Knowledge for All</Text>

      <Text style={styles.subtitle}>Our Mission</Text>
      <Text style={styles.text}>
        Build AI/ML technology services & tools to empower professionals to perform language processing tasks.
      </Text>

      <Text style={styles.subtitle}>Our Goals</Text>
      <Text style={styles.text}>- Improve Accuracy</Text>
      <Text style={styles.text}>- Enhance Productivity</Text>
      <Text style={styles.text}>- Reduce Cognitive Load</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1fbaec',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1fc17a',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 10,
  },
});

export default AboutUs;
