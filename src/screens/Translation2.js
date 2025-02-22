import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const langMap = {
  hin: "Hindi",
  lod: "Lodhi",
  urd: "Urdu",
};

const Translation2 = () => {
  const [inputLang, setInputLang] = useState("");
  const [outputLang, setOutputLang] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [responseData, setResponseData] = useState("");

  const swapLanguages = () => {
    setInputLang(outputLang);
    setOutputLang(inputLang);
    setFileContent(responseData); // Move output text to input field
    setResponseData(""); // Clear output field
  };

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
      const response = await axios.post('https://smt.ebslab.in/api/smttranslate', {
        src: inputLang,
        tar: outputLang,
        inp: fileContent,
      });
      setResponseData(response.data[0].output.text);
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
      <Text style={styles.heading}>Translation(SMT)</Text>
      
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
          <TouchableOpacity onPress={swapLanguages}>
            <FontAwesome5 name="exchange-alt" size={24} color="#007bff" />
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
          <Text style={styles.buttonText}>Translate</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.textBox}>
        <Text style={styles.label}>{langMap[outputLang] || "Output Language"}</Text>
        <TextInput
          style={[styles.textInput, styles.textOutput]}
          placeholder="Translated text will appear here"
          multiline
          editable={false}
          value={responseData}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <MaterialIcons name="content-copy" size={20} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  languageBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 20,
  },
  languageDropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown: {
    width: '40%',
  },
  textBox: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    minHeight: 130,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  textOutput: {
    minHeight: 150, // Increased height for better readability
  },
  translateButton: {
    backgroundColor: '#ff6600',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

export default Translation2;