import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StudentForm({ route  }) {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const [name, setName] = useState('');
  const [marks, setMarks] = useState('');

  const handleSubmit = async() => {
    // You can handle form submission logic here
    
    console.log('Name:', name);
    console.log('Marks:', marks);
    try {
        // Retrieve existing data from AsyncStorage
        const existingData = await AsyncStorage.getItem('studentData');
        const parsedData = existingData ? JSON.parse(existingData) : [];
  
        // Add the new form data
        let dist = parsedData.length;
        dist = dist +1;
        console.log("length is ",dist);
        const newData = [...parsedData, { name, marks, dist}];
        
        // Save the updated data back to AsyncStorage
        await AsyncStorage.setItem('studentData', JSON.stringify(newData));
  
        console.log('Data stored successfully:', newData);
        setName('');
        setMarks('');
      } catch (error) {
        console.error('Error storing data:', error);
      }
      const existingData2 = await AsyncStorage.getItem('studentData');
      console.log(existingData2);

  };

  return (
    <View style={isDarkMode ? styles.darkModeContainer : styles.container}>
      
       <View style={styles.switchContainer}>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
      
      <Text style={isDarkMode ? styles.darkModeLabel : styles.label}>NAME:</Text>
      <TextInput
        style={isDarkMode ? styles.darkModeInput : styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter your name"
        placeholderTextColor={isDarkMode ? '#fff' : 'gray'} // Set placeholder color based on dark mode
        color={isDarkMode ? '#fff' : '#000'} // Set text color based on dark mode
      />

      <Text style={isDarkMode ? styles.darkModeLabel : styles.label}>MARKS:</Text>
      <TextInput
        style={isDarkMode ? styles.darkModeInput : styles.input}
        value={marks}
        onChangeText={(text) => setMarks(text)}
        placeholder="Enter your marks"
        placeholderTextColor={isDarkMode ? '#fff' : 'gray'} // Set placeholder color based on dark mode
        color={isDarkMode ? '#fff' : '#000'} // Set text color based on dark mode
        keyboardType="numeric"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#fff', // Background color for the form container
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      fontWeight: 'bold',
      color: '#000', 
    },
    darkModeContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#000', // Background color for the form darkModeContainer
    },
    darkModeLabel: {
      color: '#fff',
      fontSize: 16,
      marginBottom: 8,
      fontWeight: 'bold',

    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
      borderRadius: 5,
    },

    darkModeInput: {
      height: 40,
      borderColor: 'white',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
      borderRadius: 5,
    },
    switchContainer: {
    position: 'absolute',
    top: 0,
    right: 16,
  },
  });
