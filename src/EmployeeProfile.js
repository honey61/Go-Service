
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

const EmployeeProfile = ({ route }) => {
  const { token } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://192.168.230.232:3030/Employeeuser-data', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userDataFromServer = await response.json();
        console.log("User Data from API:", JSON.stringify(userDataFromServer, null, 2)); // Detailed log
        setUserData(userDataFromServer.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [token]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (index, field, text) => {
    const updatedUserData = [...userData];
    updatedUserData[index][field] = text;
    setUserData(updatedUserData);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const userToUpdate = userData[0];
      const response = await fetch('http://192.168.230.232:3030/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userToUpdate),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to update profile: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating profile.');
    }
  };

  if (loading) return <View style={styles.container}><Text>Loading...</Text></View>;
  if (error) return <View style={styles.container}><Text>Error: {error}</Text></View>;

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Employee Profile</Text>
          <TouchableOpacity 
            style={[styles.editButton, isEditing && styles.saveButton]} 
            onPress={isEditing ? handleSave : handleEdit}
          >
            <Ionicons 
              name={isEditing ? 'save-outline' : 'pencil-outline'} 
              size={20} 
              color="#fff" 
            />
            <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        {userData.map((user, index) => (
          <View key={index} style={styles.profileCard}>
            <View style={styles.imageContainer}>
              {user.profileImage ? (
            <Image 
            source={{ uri: `http://192.168.230.232:3030/${user.profileImage}` }} 
            style={styles.image} 
            resizeMode="cover"
          />
          
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="person" size={50} color="#666" />
                  <Text style={styles.placeholderText}>No Image</Text>
                </View>
              )}
            </View>

            <View style={styles.infoContainer}>
              <ProfileField
                label="Username"
                value={user.username}
                field="username"
                index={index}
                isEditing={isEditing}
                handleChange={handleChange}
              />
              <ProfileField
                label="Email"
                value={user.useremail}
                field="useremail"
                index={index}
                isEditing={isEditing}
                handleChange={handleChange}
              />
              <ProfileField
                label="Phone Number"
                value={user.number}
                field="number"
                index={index}
                isEditing={isEditing}
                handleChange={handleChange}
              />
              <ProfileField
                label="Aadhar Number"
                value={user.adharnumber}
                field="adharnumber"
                index={index}
                isEditing={isEditing}
                handleChange={handleChange}
              />
              <ProfileField
                label="Experience"
                value={user.experience}
                field="experience"
                index={index}
                isEditing={isEditing}
                handleChange={handleChange}
              />
               <ProfileField
                label="Catogory"
                value={user.selectedCategory}
                field="username"
                index={index}
                isEditing={isEditing}
                handleChange={handleChange}
              />
               <ProfileField
                label="City"
                value={user.selectedCity}
                field="username"
                index={index}
                isEditing={isEditing}
                handleChange={handleChange}
              />
               <ProfileField
                label="Town"
                value={user.selectedTown}
                field="username"
                index={index}
                isEditing={isEditing}
                handleChange={handleChange}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const ProfileField = ({ label, value, field, index, isEditing, handleChange }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    {isEditing ? (
      <TextInput
        style={styles.input}
        value={value || ''}
        onChangeText={(text) => handleChange(index, field, text)}
      />
    ) : (
      <Text style={styles.value}>{value || 'N/A'}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#24d158',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
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
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  placeholderText: {
    color: '#666',
    marginTop: 5,
  },
  infoContainer: {
    paddingHorizontal: 8,
  },
  fieldContainer: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
  },
});

export default EmployeeProfile;