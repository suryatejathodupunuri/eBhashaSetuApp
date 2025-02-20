import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const langMap = {
    as: "Assamese",
    bn: "Bengali",
    brx: "Bodo",
    doi: "Dogri",
    en: "English",
    gu: "Gujarati",
    hi: "Hindi",
    ks: "Kashmiri",
    kn: "Kannada",
    gom: "Konkani",
    ml: "Malayalam",
    mai: "Maithili",
    mr: "Marathi",
    ne: "Nepali",
    or: "Oriya",
    pa: "Punjabi",
    sa: "Sanskrit",
    sd: "Sindhi",
    ta: "Tamil",
    te: "Telugu",
    ur: "Urdu",
};

const Translation = () => {
  const [inputLang, setInputLang] = useState("");
  const [outputLang, setOutputLang] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [responseData, setResponseData] = useState("");

  const handleSubmit = async () => {
    if (!inputLang || !outputLang || inputLang === outputLang || !fileContent) {
      Toast.show({
        text1: "Error",
        text2: "Please ensure all fields are filled correctly.",
        type: 'error',
      });
      return;
    }

    try {
      const response = await axios.post('https://translate.ebslab.in/api/translation', {
        src: inputLang,
        tar: outputLang,
        inp: fileContent,
      });
      setResponseData(response.data[0].output);
      Toast.show({
        text1: "Success",
        text2: "Translation completed!",
        type: 'success',
      });
    } catch (error) {
      console.error("Error:", error);
      Toast.show({
        text1: "Error",
        text2: "Server down, Please try after sometime.",
        type: 'error',
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Language Translation</Text>

      <Dropdown
        style={styles.dropdown}
        data={Object.entries(langMap).map(([key, value]) => ({ label: value, value: key }))}
        labelField="label"
        valueField="value"
        placeholder="Select Source Language"
        value={inputLang}
        onChange={item => setInputLang(item.value)}
      />

      <Dropdown
        style={styles.dropdown}
        data={Object.entries(langMap).map(([key, value]) => ({ label: value, value: key }))}
        labelField="label"
        valueField="value"
        placeholder="Select Target Language"
        value={outputLang}
        onChange={item => setOutputLang(item.value)}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Enter Source text here"
        multiline
        maxLength={5000}
        value={fileContent}
        onChangeText={setFileContent}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textInput}
        placeholder="Translated text will appear here"
        multiline
        editable={false}
        value={responseData}
      />

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Translation;