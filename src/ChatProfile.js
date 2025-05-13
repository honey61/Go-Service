// ChatProfile.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ChatProfile = ({ route }) => {
  // Extract user data from navigation params
  const { user } = route.params;
  const { username, phoneNumber, profileImage, selectedCity, selectedTown,adharnumber,
experience,selectedCategory  } = user;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={[styles.profileImage, styles.defaultImage]}>
            <Text style={styles.defaultImageText}>{username.charAt(0).toUpperCase()}</Text>
          </View>
        )}
        
        <Text style={styles.username}>{username}</Text>
        
        <View style={styles.infoContainer}> 
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone Number:</Text>
            <Text style={styles.infoValue}>{phoneNumber || 'Not provided'}</Text>
          </View>

           <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Adhar Number:</Text>
            <Text style={styles.infoValue}>{adharnumber || 'Not provided'}</Text>
          </View>
          
            <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Experience:</Text>
            <Text style={styles.infoValue}>{experience|| 'Not provided'}</Text>
          </View>

         <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Category:</Text>
            <Text style={styles.infoValue}>{selectedCategory|| 'Not provided'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoValue}>
              {selectedCity}{selectedTown ? `, ${selectedTown}` : ''}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  defaultImage: {
    backgroundColor: '#4a76a8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultImageText: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  infoContainer: {
    marginTop: 10,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default ChatProfile;