import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const langMap = { /* Language Mapping */
  asm: "Assamese", ben: "Bengali", bod: "Bodo", guj: "Gujarati", hin: "Hindi",
  kan: "Kannada", kok: "Konkani", mal: "Malayalam", mar: "Marathi", nep: "Nepali",
  ori: "Oriya", pan: "Punjabi", eng: "Roman(ENG)", tam: "Tamil", tel: "Telugu", urd: "Urdu"
};

const Transliteration = () => {
  const [inputLang, setInputLang] = useState("");
  const [outputLang, setOutputLang] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [responseData, setResponseData] = useState("");

  const swapLanguages = () => {
    setInputLang(outputLang);
    setOutputLang(inputLang);
    setFileContent(responseData);
    setResponseData("");
  };

  const clearText = () => {
    setFileContent("");
    setResponseData("");
  };

  const handleSubmit = async () => {
    if (!inputLang || !outputLang || inputLang === outputLang || !fileContent) {
      Toast.show({ text1: "Error", text2: "Please select different languages and enter text.", type: 'error' });
      return;
    }
    try {
      const response = await axios.post('https://transliteration.ebslab.in/api/transliterate', {
        src: inputLang, tar: outputLang, inp: fileContent,
      });
      setResponseData(response.data[0].output || "No output received");
      Toast.show({ text1: "Success", text2: "Transliteration completed!", type: 'success' });
    } catch (error) {
      let errorMessage = error.response ? error.response.data?.message || "API Error" : "Server down, please try again later.";
      Toast.show({ text1: "Error", text2: errorMessage, type: 'error' });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Transliteration</Text>
      
      <View style={styles.languageBox}>
        <View style={styles.languageDropdownContainer}>
          <Dropdown
            style={styles.dropdown}
            data={Object.entries(langMap).map(([key, value]) => ({ label: value, value: key }))}
            labelField="label" valueField="value" placeholder="Input Language"
            value={inputLang} onChange={item => setInputLang(item.value)}
          />
          <TouchableOpacity style={styles.swapButton} onPress={swapLanguages}>
            <FontAwesome5 name="exchange-alt" size={22} color="#007bff" />
          </TouchableOpacity>
          <Dropdown
            style={styles.dropdown}
            data={Object.entries(langMap).map(([key, value]) => ({ label: value, value: key }))}
            labelField="label" valueField="value" placeholder="Output Language"
            value={outputLang} onChange={item => setOutputLang(item.value)}
          />
        </View>
      </View>
      
      <View style={styles.textBox}>
        <View style={styles.textHeader}>
          <Text style={styles.label}>{langMap[inputLang] || "Input Language"}</Text>
          {fileContent !== "" && (
            <TouchableOpacity onPress={clearText}>
              <AntDesign name="closecircle" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>
        <TextInput
          style={styles.textInput} placeholder="Enter Source text here" multiline maxLength={5000}
          value={fileContent} onChangeText={setFileContent}
        />
        <TouchableOpacity style={styles.translateButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Transliterate</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.textBox}>
        <Text style={styles.label}>{langMap[outputLang] || "Output Language"}</Text>
        <TextInput
          style={[styles.textInput, styles.textOutput]} placeholder="Transliterated text will appear here"
          multiline editable={false} value={responseData}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => Clipboard.setStringAsync(responseData)}>
            <MaterialIcons name="content-copy" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#ffffff' },
  heading: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 3 },
  languageBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  languageDropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5, // Add some vertical padding
    paddingHorizontal: 10, // Add horizontal padding for spacing
    backgroundColor: '#f5f5f5', // Light background for better visibility
    borderRadius: 10, // Smooth rounded corners
    borderWidth: 1, // Border for structure
    borderColor: '#ccc', // Subtle border color
    shadowColor: '#000', // Shadow for depth effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Elevation for Android shadow
  },
  dropdown: {
    width: '40%',
  },
  swapButton: { padding: 12 },
  textBox: { backgroundColor: '#f8f9fa', padding: 15, borderRadius: 10 },
  textHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  textInput: { minHeight: 130, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, backgroundColor: '#fff', padding: 10 },
  textOutput: { minHeight: 150 },
  translateButton: { backgroundColor: '#ff6600', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  iconContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
});

export default Transliteration;
