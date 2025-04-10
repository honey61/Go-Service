


import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

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

const SelectLocation = ({ route }) => {
  const { serviceName } = route.params;
  const navigation = useNavigation();

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTown, setSelectedTown] = useState(null);

  const handleSubmit = () => {
    if (!selectedCity || !selectedTown) {
      alert('Please select both city and town before submitting.');
      return;
    }

    // Navigate to UserProfile and pass selected details
    navigation.navigate('UserProfile', {
      serviceName,
      selectedCity,
      selectedTown,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Service: {serviceName}</Text>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={Object.values(locationData.cities).flat()}
        labelField="label"
        valueField="value"
        placeholder="Select city"
        value={selectedCity}
        onChange={(item) => {
          setSelectedCity(item.value);
          setSelectedTown(null);
        }}
        renderLeftIcon={() => <AntDesign style={styles.icon} name="home" size={20} />}
      />

      {selectedCity && locationData.towns[selectedCity] && (
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={locationData.towns[selectedCity]}
          labelField="label"
          valueField="value"
          placeholder="Select town"
          value={selectedTown}
          onChange={(item) => setSelectedTown(item.value)}
          renderLeftIcon={() => <AntDesign style={styles.icon} name="enviromento" size={20} />}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 66,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#24d158',
    borderRadius: 20,
    width: 200,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
