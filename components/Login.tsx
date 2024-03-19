import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, Button, TextInput, KeyboardAvoidingView } from 'react-native'
import { FIREBASE_AUTH } from '../FirebaseConfig';
// import { TextInput } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const auth = FIREBASE_AUTH;


    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        }catch(error:any){
            console.log(error);
            
        }finally{
            setLoading(false);
        }
    }


    const signUp = async () => {

        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        }catch(error:any){
            console.log(error);
            
        }finally{
            setLoading(false);
        }
    }
    return (
      <View style ={styles.container}>
        
        <KeyboardAvoidingView behavior='padding'>
            <Text style = {styles.welcome}> WELCOME </Text>
            <View style={styles.gap} />

            <TextInput 
            style = {styles.input} 
            placeholder='Email' 
            autoCapitalize='none' 
            onChangeText={(text) => setEmail(text)}>  </TextInput>

            <TextInput 
            secureTextEntry = {true} 
            style = {styles.input}   
            placeholder='Password' 
            autoCapitalize='none' 
            onChangeText={(text) => setPassword(text)}>  </TextInput>

            {loading ? <ActivityIndicator size = "large" color="#0000ff"/>:
            <>
            <View style={styles.gap} />
            <Button title='Login' onPress={() => {signIn()}}/>
            <View style={styles.gap} />
            <Button color = 'grey' title='Create Account' onPress={() => {signUp()}}/>
            </>}
        </KeyboardAvoidingView>
      </View>
    );
}
const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
        flex:1,
        justifyContent: 'center',
    },
    gap: {
        height: 15,
    },
    input:{
        marginVertical: 4,
        height:50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
    welcome:{
        fontSize: 30,
        alignSelf:'center',
        marginBottom: 8,
        fontWeight: 'bold',
        color: '#000',
    }

})
export default Login;
