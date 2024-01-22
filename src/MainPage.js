// src/MainPage.js
import React from 'react';
import { View, Text,Image, TouchableOpacity, StyleSheet } from 'react-native';

const MainPage = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };


  return (
    <View style={styles.container}>
       <Image
        source={require('./Logo.png')} // Change the path accordingly
        style={styles.logo}
      />
      <Text style={styles.title}>Go Services</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>User Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>User Signup</Text>
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
    color: '#ffffff', // Set text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 80, // Adjust the width as needed
    height: 80, // Adjust the height as needed
  },
});

export default MainPage;
