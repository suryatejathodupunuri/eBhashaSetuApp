import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const langMap = {
  as: "অ - Assamese",  
  bn: "অ - Bengali",  
  brx: "ཀ - Bodo",  
  doi: "ड - Dogri",  
  en: "A - English",  
  gu: "અ - Gujarati",  
  hi: "अ - Hindi",  
  ks: "ک - Kashmiri",  
  kn: "ಅ - Kannada",  
  gom: "क - Konkani",  
  ml: "അ - Malayalam",  
  mai: "अ - Maithili",  
  mr: "अ - Marathi",  
  ne: "अ - Nepali",  
  or: "ଅ - Oriya",  
  pa: "ਅ - Punjabi",  
  sa: "अ - Sanskrit",  
  sd: "\u200Eا - Sindhi",
  ta: "அ - Tamil",  
  te: "అ - Telugu",  
  urd: "\u200Eا - Urdu" 
};


const Translation = () => {
  const [inputLang, setInputLang] = useState("");
  const [outputLang, setOutputLang] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [responseData, setResponseData] = useState("");
  const [showOutput, setShowOutput] = useState(false); // Controls output visibility
  const [buttonScale] = useState(new Animated.Value(1));
  const toastRef = useRef(); // Create a ref for Toast

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
    if (fileContent.length > 5000) {
      Toast.show({ text1: "Error", text2: "Character limit exceeded (max 5000).", type: 'error' });
      return;
    }
    try {
      const response = await axios.post('https://translate.ebslab.in/api/translation', {
        src: inputLang, tar: outputLang, inp: fileContent,
      });
      setResponseData(response.data[0].output || "No output received");
      setShowOutput(true); // Show output area after successful transliteration
      Toast.show({ text1: "Success", text2: "Translation completed!", type: 'success' });
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
      <Text style={styles.heading}>Translation (NMT)</Text>
      
      {/* Language Selection Box */}
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
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={styles.itemTextStyle} // Added for better text rendering
            itemContainerStyle={styles.itemContainerStyle} // Added for better dropdown items
          />
          <TouchableOpacity style={styles.swapButton} onPress={swapLanguages}>
            <FontAwesome5 name="exchange-alt" size={22} color="#1fbaec" />
          </TouchableOpacity>
          <Dropdown
            style={styles.dropdown}
            data={Object.entries(langMap).map(([key, value]) => ({ label: value, value: key }))}
            labelField="label"
            valueField="value"
            placeholder="Output Language"
            value={outputLang}
            onChange={item => setOutputLang(item.value)}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={styles.itemTextStyle} // Added for better text rendering
            itemContainerStyle={styles.itemContainerStyle} // Added for better dropdown items
          />
        </View>
      </View>
      
      {/* Input Text Area */}
      <View style={styles.textBox}>
        <View style={styles.textHeader}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Source text here"
            placeholderTextColor="#999"
            multiline
            maxLength={5000}
            value={fileContent}
            onChangeText={setFileContent}
          />
          {fileContent !== "" && (
            <TouchableOpacity onPress={clearText} style={styles.clearButton}>
              <AntDesign name="closecircle" size={20} color="#ff4444" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.charCount}>{fileContent.length}/5000</Text>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.translateButton}
            onPress={() => { animateButton(); handleSubmit(); }}
          >
            <Text style={styles.buttonText}>Translate</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      
      {/* Output Text Area (Conditional Rendering) */}
      {showOutput && (
        <View style={styles.textBox}>
          <TextInput
            style={[styles.textInput, styles.textOutput]}
            placeholder="Translated text will appear here"
            placeholderTextColor="#999"
            multiline
            editable={false}
            value={responseData}
          />
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => Clipboard.setStringAsync(responseData)}>
              <MaterialIcons name="content-copy" size={24} color="#1fbaec" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {/* Toast Component with Forwarded Ref */}
      <Toast ref={toastRef} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  contentContainer: { padding: 16, paddingTop: 10 }, // Reduced padding above the title
  heading: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#1A374D' }, // Adjusted margin
  languageBox: {
    backgroundColor: '#ffffff',
    padding: 12, // Reduced padding
    borderRadius: 12,
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
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 8, // Reduced padding
    height: 40, // Reduced height
  },
  placeholderStyle: { color: '#999', fontSize: 14 }, // Smaller font size
  selectedTextStyle: { color: '#1A374D', fontSize: 14 }, // Smaller font size
  iconStyle: { width: 20, height: 20 },
  itemTextStyle: { color: '#1A374D', fontSize: 14 }, // Smaller font size
  itemContainerStyle: { paddingVertical: 8 }, // Reduced padding
  swapButton: { padding: 8 }, // Reduced padding
  textBox: {
    backgroundColor: '#ffffff',
    padding: 12, // Reduced padding
    borderRadius: 12,
    marginTop: 12, // Reduced margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
    minHeight: 120, // Fixed height
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 10,
    fontSize: 16,
    color: '#1A374D',
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  charCount: {
    textAlign: 'right',
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  textOutput: { minHeight: 120 }, // Fixed height
  translateButton: {
    backgroundColor: '#1fbaec',
    padding: 12, // Reduced padding
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  iconContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }, // Reduced margin
});

export default Translation;



