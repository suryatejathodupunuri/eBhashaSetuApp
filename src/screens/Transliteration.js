import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const langMap = {
  asm: "অ - Assamese", ben: "ব - Bengali", bod: "བོད - Bodo", guj: "ગ - Gujarati", hin: "अ - Hindi",
  kan: "ಕ - Kannada", kok: "कों - Konkani", mal: "മ - Malayalam", mar: "म - Marathi", nep: "न - Nepali",
  ori: "ଓ - Oriya", pan: "ਪ - Punjabi", eng: "A - Roman(ENG)", tam: "அ - Tamil", tel: "అ - Telugu", urd: "ا - Urdu"
};

const Transliteration = () => {
  const [inputLang, setInputLang] = useState("");
  const [outputLang, setOutputLang] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [responseData, setResponseData] = useState("");
  const [showOutput, setShowOutput] = useState(false); // Controls output visibility
  const [buttonScale] = useState(new Animated.Value(1));

  const swapLanguages = () => {
    setInputLang(outputLang);
    setOutputLang(inputLang);
    setFileContent(responseData);
    setResponseData("");
  };

  const clearText = () => {
    setFileContent("");
    setResponseData("");
    setShowOutput(false); // Hide output area when text is cleared
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
      setShowOutput(true); // Show output area after successful transliteration
      Toast.show({ text1: "Success", text2: "Transliteration completed!", type: 'success' });
    } catch (error) {
      let errorMessage = error.response ? error.response.data?.message || "API Error" : "Server down, please try again later.";
      Toast.show({ text1: "Error", text2: errorMessage, type: 'error' });
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.heading}>Transliteration</Text>
      
      {/* Language Selection Box */}
      <View style={styles.languageBox}>
        <View style={styles.languageDropdownContainer}>
          <Dropdown
            style={styles.dropdown}
            data={Object.entries(langMap).map(([key, value]) => ({ label: value, value: key }))}
            labelField="label" valueField="value" placeholder="Input Language"
            value={inputLang} onChange={item => setInputLang(item.value)}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
          />
          <TouchableOpacity style={styles.swapButton} onPress={swapLanguages}>
            <FontAwesome5 name="exchange-alt" size={22} color="#007bff" />
          </TouchableOpacity>
          <Dropdown
            style={styles.dropdown}
            data={Object.entries(langMap).map(([key, value]) => ({ label: value, value: key }))}
            labelField="label" valueField="value" placeholder="Output Language"
            value={outputLang} onChange={item => setOutputLang(item.value)}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
          />
        </View>
      </View>
      
      {/* Input Text Area */}
      <View style={styles.textBox}>
        <View style={styles.textHeader}>
          <View style={{ flex: 1 }} /> {/* Spacer to push clear button to the right */}
          {fileContent !== "" && (
            <TouchableOpacity onPress={clearText}>
              <AntDesign name="closecircle" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Source text here"
          placeholderTextColor="#999"
          multiline
          maxLength={5000}
          value={fileContent}
          onChangeText={setFileContent}
        />
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.translateButton}
            onPress={() => { animateButton(); handleSubmit(); }}
          >
            <Text style={styles.buttonText}>Transliterate</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      
      {/* Output Text Area (Conditional Rendering) */}
      {showOutput && (
        <View style={styles.textBox}>
          <TextInput
            style={[styles.textInput, styles.textOutput]}
            placeholder="Transliterated text will appear here"
            placeholderTextColor="#999"
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
      )}
      
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  contentContainer: { padding: 20 },
  heading: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 10, color: '#333' },
  languageBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  languageDropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown: {
    width: '40%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  placeholderStyle: { color: '#999', fontSize: 16 },
  selectedTextStyle: { color: '#333', fontSize: 16 },
  iconStyle: { width: 20, height: 20 },
  swapButton: { padding: 12 },
  textBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textHeader: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  textInput: {
    minHeight: 130,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  textOutput: { minHeight: 150 },
  translateButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  iconContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
});

export default Transliteration;