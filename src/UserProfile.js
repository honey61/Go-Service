


import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { getGlobalIP } from './globalIP';
import { useNavigation } from '@react-navigation/native';



const UserProfile = ({ route }) => {
  const navigation = useNavigation(); // Add this line
  const { serviceName, selectedCity, selectedTown } = route.params;
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const ip = getGlobalIP();
        const url = `http://${ip}/users?selectedCategory=${serviceName}&selectedCity=${selectedCity}&selectedTown=${selectedTown}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Error fetching user data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [serviceName, selectedCity, selectedTown]);

  const makeCall = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      console.error('Phone number is not available');
    }
  };

  // const sendMessage = (phoneNumber) => {
  //   if (phoneNumber) {
  //     Linking.openURL(`sms:${phoneNumber}`);
  //   } else {
  //     console.error('Phone number is not available');
  //   }
  // };
  const sendMessage = (user) => {
    navigation.navigate('ChatScreen', {
      userId: user._id,
      username: user.username,
      phoneNumber: user.number,
      profileImage: user.profileImage,
      selectedCity: user.selectedCity,
      selectedTown: user.selectedTown,
    });
  };

  return (
    <ScrollView>
      <Text style={styles.title}>List of {serviceName} in {selectedTown}, {selectedCity}</Text>
      {userData.length > 0 ? (
        userData.map((user, index) => (
          <View key={index} style={styles.container}>
            <Image source={{ uri: `http://192.168.230.232:3030/${user.profileImage}` }} style={styles.circleImage} />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.username}</Text>
              <Text style={styles.experience}>Contact No : {user.number} </Text>
              <Text style={styles.experience}>Experience: {user.experience} years</Text>
              <Text style={styles.experience}> Address : {user.selectedCity} ,{user.selectedTown}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => makeCall(user.number)}>
                  <Text style={styles.buttonText}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.messageButton} onPress={() => sendMessage(user)}>
                  <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>No users found.</Text>
      )}
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  circleImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  experience: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#24d158',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  messageButton: {
    backgroundColor: '#0078ff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  noData: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: 'grey',
  },
});
