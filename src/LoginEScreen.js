
// import React, { useState } from 'react';
// import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import {getGlobalIP} from './globalIP'

// const LoginEScreen = ( ) => {
//   const [useremail, setUseremail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation();
//   const handleLogin = async ( ) => {
//     try {
//       const ip = getGlobalIP();  // Ensure it's called correctly
//       const url = `http://${ip}/login`;

//       const response = await fetch(url, { //ip
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           useremail,
//           password,
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         alert('Login successful!');
//         // Navigate to the home screen or perform any other actions
//         // navigation.navigate('EmployeeProfile');
//         navigation.navigate('EmployeeProfile', { token: result.token }); 
//       } else {
//         alert(`Login failed: ${result.error}`);
//       }
//     } catch (error) {
//       console.error('Error during login:', error.message);
//       alert('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('./Logo.png')} // Change the path accordingly
//         style={styles.logo}
//       />
//       <Text style={styles.title}>GO Service </Text>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="User Email"
//         placeholderTextColor="white"
//         value={useremail}
//         onChangeText={(text) => setUseremail(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor="white"
//         secureTextEntry
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center', 
//     padding: 16,
//   },
//   title: {
//     fontSize: 25,
//     marginBottom: 16,
//   },
//   input: {
//     width: 250,
//     backgroundColor: '#24d158',
//     borderRadius: 10,
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
//   button: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 16,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#24d158',
//     borderRadius: 20,
//     width: 200,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   logo: {
//     width: 80, 
//     height: 80, 
//   },
// });

// export default LoginEScreen;
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity,ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getGlobalIP } from './globalIP';
import AntDesign from '@expo/vector-icons/AntDesign';

const LoginEScreen = () => {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const ip = getGlobalIP();
      const url = `http://${ip}/Elogin`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          useremail,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login successful!');
        navigation.navigate('EmployeeProfile', { token: result.token });
      } else {
        alert(`Login failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('An error occurred. Please try again later.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
     <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
      <Image
        source={require('./Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Employee Login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={useremail}
          onChangeText={setUseremail}
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
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.signupLink}
        onPress={() => navigation.navigate('SignupEScreen')}
      >
        <Text style={styles.signupText}>Need an account? Sign Up</Text>
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
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
  inputContainer: {
    width: '100%',
    marginBottom: 20,
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
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  signupLink: {
    marginTop: 20,
  },
  signupText: {
    color: '#24d158',
    fontSize: 14,
  },
});

export default LoginEScreen;