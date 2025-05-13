

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { getGlobalIP } from './globalIP';

const SignupEScreen = () => {
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [confpass, setConfpass] = useState('');
  const [number, setUserNumber] = useState('');
  const [adharnumber, setAdharNumber] = useState('');
  const [experience, setExperience] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTown, setSelectedTown] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();

  const locationData = {
    cities: {
      uttarakhand: [
        { label: 'Dehradun', value: 'Dehradun' },
        { label: 'Haridwar', value: 'haridwar' },
      ],
      himachal: [
        { label: 'Shimla', value: 'shimla' },
        { label: 'Manali', value: 'manali' },
      ],
      california: [
        { label: 'Los Angeles', value: 'los_angeles' },
        { label: 'San Francisco', value: 'san_francisco' },
      ],
    },
    towns: {
      Dehradun: [
        { label: 'Rajpur', value: 'Rajpur' },
        { label: 'Doiwala', value: 'Doiwala' },
      ],
      Shimla: [
        { label: 'Town3', value: 'town3' },
        { label: 'Town4', value: 'town4' },
      ],
    },
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

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
      if (!selectedCategory) {
        alert('Please select a category');
        return;
      }

      const formData = new FormData();
      formData.append('username', username);
      formData.append('useremail', useremail);
      formData.append('password', password);
      formData.append('confpass', confpass);
      formData.append('number', number);
      formData.append('adharnumber', adharnumber);
      formData.append('experience', experience);
      formData.append('selectedCategory', selectedCategory);
      formData.append('selectedCity', selectedCity || '');
      formData.append('selectedTown', selectedTown || '');

      if (profileImage) {
        const filename = profileImage.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        
        formData.append('profileImage', {
          uri: profileImage,
          name: filename,
          type,
        });
      }

      console.log('Sending data:', formData);
        const ip = getGlobalIP();
        const url = `http://${ip}/Esignup`;
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!responseData.success) {
        alert(JSON.stringify(responseData));
        return;
      }

      alert('Account created successfully!');
      navigation.navigate('LoginEScreen');
    } catch (error) {
      console.error('Signup error:', error);
      alert(`Failed to create account. Error: ${error.message}`);
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

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <AntDesign name="camera" size={30} color="#666" />
                <Text style={styles.imagePlaceholderText}>Add Profile Image</Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          
          {/* Rest of the inputs remain the same */}
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

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="numeric"
            value={number}
            onChangeText={setUserNumber}
          />

          <TextInput
            style={styles.input}
            placeholder="Aadhar Number"
            keyboardType="numeric"
            value={adharnumber}
            onChangeText={setAdharNumber}
          />

          <TextInput
            style={styles.input}
            placeholder="Years of Experience"
            keyboardType="numeric"
            value={experience}
            onChangeText={setExperience}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={[
              { label: 'Electrician', value: 'Electrician' },
              { label: 'Plumber', value: 'Plumber' },
              { label: 'Carpenter', value: 'Carpenter' },
            ]}
            labelField="label"
            valueField="value"
            placeholder="Select Category"
            value={selectedCategory}
            onChange={(item) => setSelectedCategory(item.value)}
            renderLeftIcon={() => <AntDesign style={styles.icon} name="tool" size={20} color="#666" />}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={Object.values(locationData.cities).flat()}
            labelField="label"
            valueField="value"
            placeholder="Select City"
            value={selectedCity}
            onChange={(item) => {
              setSelectedCity(item.value);
              setSelectedTown(null);
            }}
            renderLeftIcon={() => <AntDesign style={styles.icon} name="home" size={20} color="#666" />}
          />

          {selectedCity && locationData.towns[selectedCity] && (
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={locationData.towns[selectedCity]}
              labelField="label"
              valueField="value"
              placeholder="Select Town"
              value={selectedTown}
              onChange={(item) => setSelectedTown(item.value)}
              renderLeftIcon={() => <AntDesign style={styles.icon} name="enviromento" size={20} color="#666" />}
            />
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginLink}
          onPress={() => navigation.navigate('LoginEScreen')}
        >
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
  inputContainer: {
    width: '100%',
  },
  imagePicker: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#24d158',
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
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
  dropdown: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 10,
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

export default SignupEScreen;