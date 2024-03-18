import 'react-native-gesture-handler';
import React, { useEffect, useState, useMemo }  from 'react'; // Import useState
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Chart from './components/Chart';
import StudentForm from './components/StudentForm';
import About from './components/About';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName= "Home">
        
        <Stack.Screen name="Home" component={Chart} />

        <Stack.Screen name="StudentForm" component={StudentForm} />
  
        <Stack.Screen name="About" component={About} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


