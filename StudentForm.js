// StudentForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// Replace the existing import statement
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentForm = () => {
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
        const newData = [...parsedData, { name, marks }];
        
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


    // Add your logic to save or process the form data
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Marks:</Text>
      <TextInput
        style={styles.input}
        value={marks}
        onChangeText={(text) => setMarks(text)}
        placeholder="Enter your marks"
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
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
    },
  });
export default StudentForm;
