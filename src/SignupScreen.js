


// // src/SignupScreen.js
// import React, { useState } from 'react';
// import { View, Text, Image, TextInput, Button, StyleSheet,ScrollView, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import {getGlobalIP} from './globalIP'


// const SignupScreen = () => {
//   const [username, setUsername] = useState('');
//   const [useremail, setUseremail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confpass, setconfpass] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigation = useNavigation();


//   const handleSignup = async () => {
//     try {
//       if (password.length < 5) {
//         alert('Password must be at least 5 characters long');
//       } else if (password === confpass) {

//        const ip = getGlobalIP();  // Ensure it's called correctly
//            const url = `http://${ip}/signup`;
     
     
  
//         const response = await fetch(url, {//  ip
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             username,
//             useremail,
//             password,
//             confpass,
//           }),
//         });
//         const responseData = await response.json();
//         if (!response.ok) {
//           if (response.status === 400) {
//             alert(responseData.error); // Show error message for missing fields
//           } else if (response.status === 422) {
//             alert(responseData.error); // Show error message for existing email
//           } else {
//             alert('Failed to create account. Please try again.');
//           }
//           return; // Stop execution if response is not OK
//         }
  
  
  
//         if (responseData.success) {
//           alert('Account created successfully!');
//           navigation.navigate('LoginScreen');
     
//         } else {
//           alert('Failed to create account. Please try again.');
//         }
//       } else {
//         alert('Passwords do not match');
//       }
//     } catch (error) {
//       console.error('Error creating account:', error.message);
//       // alert('Email already exist');
//     }
//   };
  
  
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//         <ScrollView style={styles.scrollContainer}>
//     <View style={styles.container}>
//       <Image
//         source={require('./Logo.png')} // Change the path accordingly
//         style={styles.logo}
//       />
//       <Text style={styles.title}>Signup</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         placeholderTextColor="white"
//         value={username}
//         onChangeText={(text) => setUsername(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         placeholderTextColor="white"
//         value={useremail}
//         onChangeText={(text) => setUseremail(text)}
//       />
//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.passwordInput}
//           placeholder="Password"
//           placeholderTextColor="white"
//           secureTextEntry={!showPassword}
//           value={password}
//           onChangeText={(text) => setPassword(text)}
//         />
//         <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
//           <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.passwordInput}
//           placeholder="Confirm Password"
//           placeholderTextColor="white"
//           secureTextEntry={!showPassword}
//           value={confpass}
//           onChangeText={(text) => setconfpass(text)}
//         />
//         <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
//           <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Rest of your code */}
//       <TouchableOpacity style={styles.button} onPress={handleSignup}>
//         <Text style={styles.buttonText}>Signup</Text>
//       </TouchableOpacity>
//     </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     backgroundColor: 'white',
//   },
//   container: {
//     color:"black",
//     backgroundColor:"white",
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center', // Center content horizontally
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     color:"black"
//   },
//   input: {
//     width: 250,
//     backgroundColor:"#24d158",
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//     borderRadius:20,
//     color:"white",
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
   
//   },
//   pickerContainer: {
//     height: 40,
//     width: 200,
//     marginBottom: 16,
//   },
//   picker: {
//     backgroundColor: 'white',
//     borderColor: 'white',
//     borderWidth: 1,
//   },
//   pickerItem: {
//     justifyContent: 'flex-start',
//   },
//   dropDown: {
//     backgroundColor: 'white',
//   },
//   button: {
//     justifyContent:"center",
//     alignItems:"center",
//     marginTop: 16,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#24d158',
//     borderRadius: 20,
//     width:200,
//   },
//   buttonText: {
//     color: '#ffffff', // Set text color
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   logo: {
//     width: 80, // Adjust the width as needed
//     height: 80, // Adjust the height as needed
//   },
//   passwordContainer: {
//     width:250,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   passwordInput: {
//     width:250,
//     flex: 1,
//     backgroundColor: '#24d158',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingHorizontal: 8,
//     borderRadius: 20,
//     color: 'white',
//   },
//   eyeIcon: {
//     marginLeft: -25,
//   },
// });

// export default SignupScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getGlobalIP } from './globalIP';
import AntDesign from '@expo/vector-icons/AntDesign';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [confpass, setConfpass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      if (password.length < 5) {
        alert('Password must be at least 5 characters long');
        return;
      }
      if (password !== confpass) {
        alert('Passwords do not match');
        return;
      }

      const ip = getGlobalIP();
      const response = await fetch(`http://${ip}/signup`, {
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

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        alert(responseData.error || 'Signup failed. Try again.');
        return;
      }

      alert('Account created successfully!');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={useremail}
          onChangeText={(text) => setUseremail(text.toLowerCase())} 
          keyboardType="email-address"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
            <AntDesign name={showPassword ? "eye" : "eyeo"} size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!showPassword}
          value={confpass}
          onChangeText={setConfpass}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#24d158',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#24d158',
    fontSize: 14,
  },
});

export default SignupScreen;
