

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
        { label: 'Haridwar', value: 'Haridwar' },
        { label: 'Rishikesh', value: 'Rishikesh' },
      ],
      himachal: [
        { label: 'Shimla', value: 'Shimla' },
        { label: 'Manali', value: 'manali' },
      ],
      california: [
        { label: 'Los Angeles', value: 'los_angeles' },
        { label: 'San Francisco', value: 'san_francisco' },
      ],
    },
    towns: {
      Dehradun: [
      { label: 'Akhandwali Bhilang', value: 'Akhandwali Bhilang' },
{ label: 'Amwala Karanpur', value: 'Amwala Karanpur' },
{ label: 'Amwala Manjhala', value: 'Amwala Manjhala' },
{ label: 'Amwala Tarala', value: 'Amwala Tarala' },
{ label: 'Amwala Uparla', value: 'Amwala Uparla' },
{ label: 'Arcadia Grant', value: 'Arcadia Grant' },
{ label: 'Asarori', value: 'Asarori' },
{ label: 'Ashkrodi Range', value: 'Ashkrodi Range' },
{ label: 'Asthal', value: 'Asthal' },
{ label: 'Badripur', value: 'Badripur' },
{ label: 'Bagradhauran', value: 'Bagradhauran' },
{ label: 'Bagral Gaon', value: 'Bagral Gaon' },
{ label: 'Bajhet', value: 'Bajhet' },
{ label: 'Balawala', value: 'Balawala' },
{ label: 'Bandawali', value: 'Bandawali' },
{ label: 'Banjarewala Mafi', value: 'Banjarewala Mafi' },
{ label: 'Banvtha', value: 'Banvtha' },
{ label: 'Barasi Grant', value: 'Barasi Grant' },
{ label: 'Bhagwant Pur', value: 'Bhagwant Pur' },
{ label: 'Bhaiswargaon', value: 'Bhaiswargaon' },
{ label: 'Bhandar Gaon', value: 'Bhandar Gaon' },
{ label: 'Bhandariwala', value: 'Bhandariwala' },
{ label: 'Bhitar Wali', value: 'Bhitar Wali' },
{ label: 'Bhopalpani Grant', value: 'Bhopalpani Grant' },
{ label: 'Bilas Pur Kandali', value: 'Bilas Pur Kandali' },
{ label: 'Bisht Gaon', value: 'Bisht Gaon' },
{ label: 'Brahman Gaon', value: 'Brahman Gaon' },
{ label: 'Chakbanjarewala', value: 'Chakbanjarewala' },
{ label: 'Chaktonwala Grant', value: 'Chaktonwala Grant' },
{ label: 'Chalang', value: 'Chalang' },
{ label: 'Chamasari', value: 'Chamasari' },
{ label: 'Chandrabani', value: 'Chandrabani' },
{ label: 'Chandrothi', value: 'Chandrothi' },
{ label: 'Chandrvani Grant', value: 'Chandrvani Grant' },
{ label: 'Chandrwani Khalsa', value: 'Chandrwani Khalsa' },
{ label: 'Chhamroli', value: 'Chhamroli' },
{ label: 'Daiswala', value: 'Daiswala' },
{ label: 'Danda Dhoran', value: 'Danda Dhoran' },
{ label: 'Danda Khudanewala', value: 'Danda Khudanewala' },
{ label: 'Danda Lakhaur', value: 'Danda Lakhaur' },
{ label: 'Danda Nooriwala', value: 'Danda Nooriwala' },
{ label: 'Danion Ka Danda', value: 'Danion Ka Danda' },
{ label: 'Dhanaula', value: 'Dhanaula' },
{ label: 'Doiwala', value: 'Doiwala' },
{ label: 'Doom Gaon', value: 'Doom Gaon' },
{ label: 'Dudhali', value: 'Dudhali' },
{ label: 'Dumal Gaon', value: 'Dumal Gaon' },
{ label: 'Dwara', value: 'Dwara' },
{ label: 'Fuleta', value: 'Fuleta' },
{ label: 'Gajiawala', value: 'Gajiawala' },
{ label: 'Galajwari', value: 'Galajwari' },
{ label: 'Gangole Pandit Wari', value: 'Gangole Pandit Wari' },
{ label: 'Ghanghora', value: 'Ghanghora' },
{ label: 'Ghissar Pari', value: 'Ghissar Pari' },
{ label: 'Gopiwala', value: 'Gopiwala' },
{ label: 'Gujrami', value: 'Gujrami' },
{ label: 'Gujrara Mansingh', value: 'Gujrara Mansingh' },
{ label: 'Guniyal Gaon', value: 'Guniyal Gaon' },
{ label: 'Hansuwala', value: 'Hansuwala' },
{ label: 'Harbans Wala', value: 'Harbans Wala' },
{ label: 'Harbhaj Wala', value: 'Harbhaj Wala' },
{ label: 'Haripur', value: 'Haripur' },
{ label: 'Hariyawala Khurd', value: 'Hariyawala Khurd' },
{ label: 'Harrawala', value: 'Harrawala' },
{ label: 'Haryawala', value: 'Haryawala' },
{ label: 'Hatwalgaon', value: 'Hatwalgaon' },
{ label: 'Jagatkhana', value: 'Jagatkhana' },
{ label: 'Jamniwala', value: 'Jamniwala' },
{ label: 'Jamoliwala', value: 'Jamoliwala' },
{ label: 'Johari', value: 'Johari' },
{ label: 'Kairwan Karanpur', value: 'Kairwan Karanpur' },
{ label: 'Kalagaon', value: 'Kalagaon' },
{ label: 'Kalimati', value: 'Kalimati' },
{ label: 'Karliguard', value: 'Karliguard' },
{ label: 'Khala Gaon', value: 'Khala Gaon' },
{ label: 'Khemadoj', value: 'Khemadoj' },
{ label: 'Kheragopiwala', value: 'Kheragopiwala' },
{ label: 'Kheri Mansingh', value: 'Kheri Mansingh' },
{ label: 'Khuranwa', value: 'Khuranwa' },
{ label: 'Kirsali', value: 'Kirsali' },
{ label: 'Kirsali Gaon', value: 'Kirsali Gaon' },
{ label: 'Kishan Pur', value: 'Kishan Pur' },
{ label: 'Kiwara', value: 'Kiwara' },
{ label: 'Kulhan Karanpur', value: 'Kulhan Karanpur' },
{ label: 'Kulhan Mansingh', value: 'Kulhan Mansingh' },
{ label: 'Kuthal Gaon', value: 'Kuthal Gaon' },
{ label: 'Kuwan Wala', value: 'Kuwan Wala' },
{ label: 'Kyar Kuli Bhatta', value: 'Kyar Kuli Bhatta' },
{ label: 'Lachhi Wala', value: 'Lachhi Wala' },
{ label: 'Lachhiwala Range', value: 'Lachhiwala Range' },
{ label: 'Ladpur', value: 'Ladpur' },
{ label: 'Majari Mafi', value: 'Majari Mafi' },
{ label: 'Majhara', value: 'Majhara' },
{ label: 'Makka Wala', value: 'Makka Wala' },
{ label: 'Malsi', value: 'Malsi' },
{ label: 'Malukawala', value: 'Malukawala' },
{ label: 'Mangaluwala', value: 'Mangaluwala' },
{ label: 'Marautha', value: 'Marautha' },
{ label: 'Markham Grant', value: 'Markham Grant' },
{ label: 'Missar Wala Kala', value: 'Missar Wala Kala' },
{ label: 'Missar Wala Khurd', value: 'Missar Wala Khurd' },
{ label: 'Mitt Behti', value: 'Mitt Behti' },
{ label: 'Miyanwala', value: 'Miyanwala' },
{ label: 'Mohabbey Wala', value: 'Mohabbey Wala' },
{ label: 'Mohammadpur Barkali', value: 'Mohammadpur Barkali' },
{ label: 'Mohkam Pur Kala', value: 'Mohkam Pur Kala' },
{ label: 'Mohkam Pur Khurd', value: 'Mohkam Pur Khurd' },
{ label: 'Motharo Wala', value: 'Motharo Wala' },
{ label: 'Motidhar', value: 'Motidhar' },
{ label: 'Mussorie Range', value: 'Mussorie Range' },
{ label: 'Mussorie Range (P-2)', value: 'Mussorie Range (P-2)' },
{ label: 'Nagal Bulandawala', value: 'Nagal Bulandawala' },
{ label: 'Nagal Jwalapur', value: 'Nagal Jwalapur' },
{ label: 'Nagalhat Nala', value: 'Nagalhat Nala' },
{ label: 'Nakraunda', value: 'Nakraunda' },
{ label: 'Naliwala', value: 'Naliwala' },
{ label: 'Nanur Khera', value: 'Nanur Khera' },
{ label: 'Nawada', value: 'Nawada' },
{ label: 'Paw Wala Soda', value: 'Paw Wala Soda' },
{ label: 'Phanduwala', value: 'Phanduwala' },
{ label: 'Pitthuwala', value: 'Pitthuwala' },
{ label: 'Punkal Gaon', value: 'Punkal Gaon' },
{ label: 'Purohit Wala', value: 'Purohit Wala' },
{ label: 'Pustari', value: 'Pustari' },
{ label: 'Raipur Range', value: 'Raipur Range' },
{ label: 'Ramgarh Range', value: 'Ramgarh Range' },
{ label: 'Randharwala', value: 'Randharwala' },
{ label: 'Reniwala', value: 'Reniwala' },
{ label: 'Rikhauli', value: 'Rikhauli' },
{ label: 'Salan Gaon', value: 'Salan Gaon' },
{ label: 'Saloniwala', value: 'Saloniwala' },
{ label: 'Sarauna', value: 'Sarauna' },
{ label: 'Sarkhet', value: 'Sarkhet' },
{ label: 'Saundhauwali Mansingh', value: 'Saundhauwali Mansingh' },
{ label: 'Sera goan', value: 'Sera goan' },
{ label: 'Seraki', value: 'Seraki' },
{ label: 'Shahpur Santore', value: 'Shahpur Santore' },
{ label: 'Shewala Kala', value: 'Shewala Kala' },
{ label: 'Shewala Khurd', value: 'Shewala Khurd' },
{ label: 'Sigli', value: 'Sigli' },
{ label: 'Silla', value: 'Silla' },
{ label: 'Simiyari', value: 'Simiyari' },
{ label: 'Simlas Grant', value: 'Simlas Grant' },
{ label: 'Sinaula', value: 'Sinaula' },
{ label: 'Sindhauwali Dhauran', value: 'Sindhauwali Dhauran' },
{ label: 'Sodasaroli', value: 'Sodasaroli' },
{ label: 'Sunderwala', value: 'Sunderwala' },
{ label: 'Tarla Nagal', value: 'Tarla Nagal' },
{ label: 'Thano Range', value: 'Thano Range' },
{ label: 'Thewa', value: 'Thewa' },
{ label: 'Tibbanala Pani', value: 'Tibbanala Pani' },
{ label: 'Timilimansingh', value: 'Timilimansingh' },
{ label: 'Utari Gaon', value: 'Utari Gaon' },
{ label: 'Vijepur Gopiwala', value: 'Vijepur Gopiwala' },
{ label: 'Vijepur Hathibarkala', value: 'Vijepur Hathibarkala' }

      ],
      Rishikesh: [
        { label: 'Athhoorwala', value: 'Athhoorwala' },
{ label: 'Baderana Majhala', value: 'Baderana Majhala' },
{ label: 'Baderha Kalan', value: 'Baderha Kalan' },
{ label: 'Baderna Khurd', value: 'Baderna Khurd' },
{ label: 'Badogal', value: 'Badogal' },
{ label: 'Badowala', value: 'Badowala' },
{ label: 'Bagi', value: 'Bagi' },
{ label: 'Bairagada', value: 'Bairagada' },
{ label: 'Baksar Wala', value: 'Baksar Wala' },
{ label: 'Bangai', value: 'Bangai' },
{ label: 'Barkot Mafi', value: 'Barkot Mafi' },
{ label: 'Barkot Range', value: 'Barkot Range' },
{ label: 'Baruwala Grant', value: 'Baruwala Grant' },
{ label: 'Bhaglana', value: 'Bhaglana' },
{ label: 'Bhaniya Wala', value: 'Bhaniya Wala' },
{ label: 'Bhattowala', value: 'Bhattowala' },
{ label: 'Bhogpur', value: 'Bhogpur' },
{ label: 'Bibiwala', value: 'Bibiwala' },
{ label: 'Birpur Khurd', value: 'Birpur Khurd' },
{ label: 'Bishan Garh', value: 'Bishan Garh' },
{ label: 'Chak Jogi Wala', value: 'Chak Jogi Wala' },
{ label: 'Chakbarkot', value: 'Chakbarkot' },
{ label: 'Chauki', value: 'Chauki' },
{ label: 'Dharkot', value: 'Dharkot' },
{ label: 'Fagsi', value: 'Fagsi' },
{ label: 'Falsuwa', value: 'Falsuwa' },
{ label: 'Farti', value: 'Farti' },
{ label: 'Fatehpur Danda', value: 'Fatehpur Danda' },
{ label: 'Gadool', value: 'Gadool' },
{ label: 'Garhimay Chak', value: 'Garhimay Chak' },
{ label: 'Ghandol', value: 'Ghandol' },
{ label: 'Gohri Mafi', value: 'Gohri Mafi' },
{ label: 'Govind Wala', value: 'Govind Wala' },
{ label: 'Haldwari', value: 'Haldwari' },
{ label: 'Hrishikesh', value: 'Hrishikesh' },
{ label: 'Jakar', value: 'Jakar' },
{ label: 'Jauligrant', value: 'Jauligrant' },
{ label: 'Jeevan Wala', value: 'Jeevan Wala' },
{ label: 'Jogiwala Mafi', value: 'Jogiwala Mafi' },
{ label: 'Kairwan Malkot', value: 'Kairwan Malkot' },
{ label: 'Kaknawamaychak Talai', value: 'Kaknawamaychak Talai' },
{ label: 'Kaluwala', value: 'Kaluwala' },
{ label: 'Kandogal', value: 'Kandogal' },
{ label: 'Kanhar Wala', value: 'Kanhar Wala' },
{ label: 'Kasron Range', value: 'Kasron Range' },
{ label: 'Katkot Kalan', value: 'Katkot Kalan' },
{ label: 'Katkot Khurd', value: 'Katkot Khurd' },
{ label: 'Kaudasi', value: 'Kaudasi' },
{ label: 'Khairi Kalan', value: 'Khairi Kalan' },
{ label: 'Khairi Khurd', value: 'Khairi Khurd' },
{ label: 'Khaldhar', value: 'Khaldhar' },
{ label: 'Khandraiwala', value: 'Khandraiwala' },
{ label: 'Kotala', value: 'Kotala' },
{ label: 'Kotimay Chak', value: 'Kotimay Chak' },
{ label: 'Kudhal', value: 'Kudhal' },
{ label: 'Kuthar', value: 'Kuthar' },
{ label: 'Landwakot', value: 'Landwakot' },
{ label: 'Listrabad', value: 'Listrabad' },
{ label: 'Mauja Rani Pokhari', value: 'Mauja Rani Pokhari' },
{ label: 'Mazri Grant', value: 'Mazri Grant' },
{ label: 'Motichur Range', value: 'Motichur Range' },
{ label: 'Nahi Kalan', value: 'Nahi Kalan' },
{ label: 'Nahikhurd', value: 'Nahikhurd' },
{ label: 'Naurtuwala', value: 'Naurtuwala' },
{ label: 'Pali', value: 'Pali' },
{ label: 'Playd', value: 'Playd' },
{ label: 'Rainapur Grant', value: 'Rainapur Grant' },
{ label: 'Raithwan Gaon', value: 'Raithwan Gaon' },
{ label: 'Raiwala', value: 'Raiwala' },
{ label: 'Rakhwal Gaon', value: 'Rakhwal Gaon' },
{ label: 'Ramnagar Danda', value: 'Ramnagar Danda' },
{ label: 'Rani Pokhari Grant', value: 'Rani Pokhari Grant' },
{ label: 'Sahab Nagar', value: 'Sahab Nagar' },
{ label: 'Sangaon', value: 'Sangaon' },
{ label: 'Sangatiya Walakala', value: 'Sangatiya Walakala' },
{ label: 'Sangatiya Walakhurd', value: 'Sangatiya Walakhurd' },
{ label: 'Sarangdharwala', value: 'Sarangdharwala' },
{ label: 'Sataili Gairwal', value: 'Sataili Gairwal' },
{ label: 'Shiddar Wala', value: 'Shiddar Wala' },
{ label: 'Shyampur', value: 'Shyampur' },
{ label: 'Simiyanah', value: 'Simiyanah' },
{ label: 'Sindhwal Gaon', value: 'Sindhwal Gaon' },
{ label: 'Siron', value: 'Siron' },
{ label: 'Talai', value: 'Talai' },
{ label: 'Tamoli Garh', value: 'Tamoli Garh' },
{ label: 'Thakurpur', value: 'Thakurpur' },
{ label: 'Thano', value: 'Thano' },
{ label: 'Thano Range', value: 'Thano Range' }

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