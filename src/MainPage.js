// src/MainPage.js
import React from 'react';
import { View, Text,Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react/cjs/react.production.min';


const MainPage = ({ navigation }) => {


  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };
  const handleELogin = () => {
  navigation.navigate('LoginEScreen');
  };

  const handleSignup = () => {
    navigation.navigate('SignupScreen');
  };
  const handleESignup = () => {
    navigation.navigate('SignupEScreen');
  };


  return (
    <View style={styles.container}>
       <Image
        source={require('./Logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>Go Services</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>User Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>User Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleELogin}>
        <Text style={styles.buttonText}>Employee Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleESignup}>
        <Text style={styles.buttonText}>Employee Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  button: {
    justifyContent:"center",
    alignItems:"center",
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#24d158',
    borderRadius: 20,
    width:200,
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 80, 
    height: 80, 
  },
});

export default MainPage;
