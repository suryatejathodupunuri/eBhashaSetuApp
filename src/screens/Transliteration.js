import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const langMap = {
  asm: "Assamese",
  ben: "Bengali",
  bod: "Bodo",
  guj: "Gujarati",
  hin: "Hindi",
  kan: "Kannada",
  kok: "Konkani",
  mal: "Malayalam",
  mar: "Marathi",
  nep: "Nepali",
  ori: "Oriya",
  pan: "Punjabi",
  eng: "Roman(ENG)",
  tam: "Tamil",
  tel: "Telugu",
  urd: "Urdu",
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

  const handleSubmit = async () => {
    if (!inputLang || !outputLang || inputLang === outputLang || !fileContent) {
      Toast.show({
        text1: "Error",
        text2: "Please select different languages and enter text.",
        type: 'error',
      });
      return;
    }

    try {
      const response = await axios.post('https://transliteration.ebslab.in/api/transliterate', {
        src: inputLang,
        tar: outputLang,
        inp: fileContent,
      });
      setResponseData(response.data[0].output || "No output received");
      Toast.show({
        text1: "Success",
        text2: "Transliteration completed!",
        type: 'success',
      });
    } catch (error) {
      let errorMessage = "Server down, please try again later.";
      if (error.response) {
        errorMessage = error.response.data?.message || "API Error";
      }
      Toast.show({
        text1: "Error",
        text2: errorMessage,
        type: 'error',
      });
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
            labelField="label"
            valueField="value"
            placeholder="Input Language"
            value={inputLang}
            onChange={item => setInputLang(item.value)}
          />
          <TouchableOpacity style={styles.swapButton} onPress={swapLanguages}>
            <FontAwesome5 name="exchange-alt" size={22} color="#007bff" />
          </TouchableOpacity>
          <Dropdown
            style={styles.dropdown}
            data={Object.entries(langMap).map(([key, value]) => ({ label: value, value: key }))}
            labelField="label"
            valueField="value"
            placeholder="Output Language"
            value={outputLang}
            onChange={item => setOutputLang(item.value)}
          />
        </View>
      </View>
      
      <View style={styles.textBox}>
        <Text style={styles.label}>{langMap[inputLang] || "Input Language"}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Source text here"
          multiline
          maxLength={5000}
          value={fileContent}
          onChangeText={setFileContent}
        />
        <TouchableOpacity style={styles.translateButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Transliterate</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.textBox}>
        <Text style={styles.label}>{langMap[outputLang] || "Output Language"}</Text>
        <TextInput
          style={[styles.textInput, styles.textOutput]}
          placeholder="Transliterated text will appear here"
          multiline
          editable={false}
          value={responseData}
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
  container: { flex: 1, padding: 10, backgroundColor: '#ffffff' },
  heading: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 5 },
  languageBox: { backgroundColor: '#fff', padding: 10, borderRadius: 15, elevation: 3 },
  languageDropdownContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dropdown: { flex: 1, marginHorizontal: 5 },
  swapButton: { padding: 10 },
  textBox: { backgroundColor: '#f8f9fa', padding: 10, borderRadius: 10, marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  textInput: { minHeight: 130, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, backgroundColor: '#fff', padding: 10 },
  textOutput: { minHeight: 150 },
  translateButton: { backgroundColor: '#ff6600', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  iconContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
});

export default Transliteration;
