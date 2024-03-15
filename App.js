import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import BarChart from './Chart';
import React, { useEffect, useState } from 'react'; // Import useState
import StudentForm from './StudentForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  // Use state
 
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="StudentForm" component={StudentFormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
function HomeScreen({ navigation }) {
  const [existingData, setExistingData] = useState(null); 
  const dummydata=[
    {name:"John",marks:"45"},
    {name:"Aryan",marks:"49"}
  ]
  const fetchData = async () => {
    // try {
      const data = await AsyncStorage.getItem('studentData');
      setExistingData(data ? JSON.parse(data) : dummydata);
      // console.log('Existing Data:', existingData);
    // } catch (error) {
      // console.error('Error retrieving data:', error);
    // }
  };
  const clearLocalStorage = async () => {
    try {
      await AsyncStorage.removeItem('studentData');
      setExistingData([]); // Update state to reflect the cleared data
      console.log('Local storage data cleared.');
    } catch (error) {
      console.error('Error clearing local storage:', error);
    }
  };
    

  useEffect(() => {
    // console.log("we sre fetching ht data ")
    fetchData();
  }, [existingData]);
  
  return (
    <View style={styles.container}>
      
      {existingData? <BarChart data={existingData} round={100} unit="€" />:""}
      <Button title="Clear Local Storage" onPress={clearLocalStorage} />
      <Button title="Go to Student Form" onPress={() => navigation.navigate('StudentForm')} />
    </View>
  );

}
function StudentFormScreen() {
  return <StudentForm />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});