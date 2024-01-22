


// src/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [confpass, setconfpass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();


  const handleSignup = async () => {
    try {
      if (password.length < 5) {
        alert('Password must be at least 5 characters long');
      } else if (password === confpass) {
        const response = await fetch('http://192.168.1.6:3030/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            useremail,
            password,
            confpass,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
  
        if (result.success) {
          alert('Account created successfully!');
          navigation.navigate('LoginScreen');
     
        } else {
          alert('Failed to create account. Please try again.');
        }
      } else {
        alert('Passwords do not match');
      }
    } catch (error) {
      console.error('Error creating account:', error.message);
      alert('Email already exist');
    }
  };
  
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./Logo.png')} // Change the path accordingly
        style={styles.logo}
      />
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="white"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="white"
        value={useremail}
        onChangeText={(text) => setUseremail(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
          <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          placeholderTextColor="white"
          secureTextEntry={!showPassword}
          value={confpass}
          onChangeText={(text) => setconfpass(text)}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
          <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>

      {/* Rest of your code */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color:"black",
    backgroundColor:"white",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center content horizontally
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color:"black"
  },
  input: {
    width: 250,
    backgroundColor:"#24d158",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius:20,
    color:"white",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
   
  },
  pickerContainer: {
    height: 40,
    width: 200,
    marginBottom: 16,
  },
  picker: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
  },
  pickerItem: {
    justifyContent: 'flex-start',
  },
  dropDown: {
    backgroundColor: 'white',
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
  passwordContainer: {
    width:250,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  passwordInput: {
    width:250,
    flex: 1,
    backgroundColor: '#24d158',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 20,
    color: 'white',
  },
  eyeIcon: {
    marginLeft: -25,
  },
});

export default SignupScreen;
