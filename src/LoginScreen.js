// // src/LoginScreen.js
// import React, { useState } from 'react';
// import { View, Text,Image, TextInput, Button, StyleSheet ,TouchableOpacity} from 'react-native';

// const LoginScreen = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Add your authentication logic here
//     console.log('Username:', username);
//     console.log('Password:', password);
//     // Example: Check credentials and navigate to the home screen
//     // if (username === 'example' && password === 'password') {
//     //   navigation.navigate('Home');
//     // } else {
//     //   alert('Invalid credentials');
//     // }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('./Logo.png')} // Change the path accordingly
//         style={styles.logo}
//       />
//         <Text style={styles.title}>GO Service </Text>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         placeholderTextColor="white" 
//         value={username}
//         onChangeText={(text) => setUsername(text)}
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
  
//     backgroundColor:"white",
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center', // Center content horizontally
//     padding: 16,
//   },
//   title: {
    
//     fontSize: 25,
//     marginBottom: 16,
//   },
//   input: {
//     width: 250,
//     backgroundColor:"#24d158",
//     borderRadius:10,
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,


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
// });


// export default LoginScreen;

import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.6:3030/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login successful!');
        // Navigate to the home screen or perform any other actions
        navigation.navigate('ServicePage');
      } else {
        alert(`Login failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./Logo.png')} // Change the path accordingly
        style={styles.logo}
      />
      <Text style={styles.title}>GO Service </Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="white"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center content horizontally
    padding: 16,
  },
  title: {
    fontSize: 25,
    marginBottom: 16,
  },
  input: {
    width: 250,
    backgroundColor: '#24d158',
    borderRadius: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#24d158',
    borderRadius: 20,
    width: 200,
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

export default LoginScreen;
