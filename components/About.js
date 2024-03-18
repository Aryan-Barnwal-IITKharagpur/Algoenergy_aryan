import { useState } from 'react';
import React from 'react';
import { StyleSheet, View, Text, Switch, Linking } from 'react-native';

export default function About({  route  }) {

   
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    
    <View style={ isDarkMode ? styles.darkModeContainer : styles.container}> 

      <View style={styles.switchContainer}>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      <Text style={isDarkMode ? styles.darkModeText : styles.text}>This project is made by Aryan Barnwal</Text>

      <Text style = { {color: 'blue', fontSize: 15}}
          onPress={() => Linking.openURL('https://www.linkedin.com/in/aryan-barnwal-915a321b9/')}>
        LINKEDIN
      </Text>

      <Text style = { {color: 'blue', fontSize: 15}}
          onPress={() => Linking.openURL('https://github.com/Aryan-Barnwal-IITKharagpur')}>
        GITHUB
      </Text>

      <Text style = { {color: 'blue', fontSize: 15}}
          onPress={() => Linking.openURL('https://www.instagram.com/aryanbarnwal394/')}>
        INSTAGRAM
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Default background color
  },
  darkModeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Dark mode background color
  },
  text: {
    fontSize: 20,
    color: '#000', // Default text color
  },
  darkModeText: {
    fontSize: 20,
    color: '#fff', // Dark mode text color
  },
  switchContainer: {
    position: 'absolute',
    top: 0,
    right: 16,
  },
  link: {

    color: 'blue',
    fontFamily: 15,
  },
  
  darkModeLink:{
    color: 'blue',
    fontFamily: 15,
  }
});