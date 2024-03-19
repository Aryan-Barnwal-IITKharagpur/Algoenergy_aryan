import 'react-native-gesture-handler';
import React, { useEffect, useState, useMemo }  from 'react'; // Import useState
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Chart from './components/Chart';
import StudentForm from './components/StudentForm';
import About from './components/About';
import Login from './components/Login';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      
        console.log('user', user);
        setUser(user);
      });
    }, []);

  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName= "Login">

        {user? 
        (
            <Stack.Screen name="Home" component={Chart} />
        ):
        (
            <Stack.Screen name="Login" component={Login} />
        )}
        
        <Stack.Screen name="StudentForm" component={StudentForm} />
        <Stack.Screen name="About" component={About} />

        
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


