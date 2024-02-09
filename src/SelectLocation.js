import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = {
  countries: {
    '1': {
      label: 'Country1',
      states: {
        '1': {
          label: 'State1',
          cities: {
            '1': { label: 'City1', towns: { '1': { label: 'Town1' }, '2': { label: 'Town2' }, '3': { label: 'Town3' } } },
            '2': { label: 'City2', towns: { '4': { label: 'Town4' }, '5': { label: 'Town5' }, '6': { label: 'Town6' } } },
            '3': { label: 'City3', towns: { '7': { label: 'Town7' }, '8': { label: 'Town8' }, '9': { label: 'Town9' } } },
          },
        },
        '2': { label: 'State2', cities: {} },
        '3': { label: 'State3', cities: {} },
      },
    },
    '2': {
      label: 'Country2',
      states: {
        '4': { label: 'State4', cities: {} },
        '5': { label: 'State5', cities: {} },
        '6': { label: 'State6', cities: {} },
      },
    },
    '3': {
      label: 'Country3',
      states: {
        '7': { label: 'State7', cities: {} },
        '8': { label: 'State8', cities: {} },
        '9': { label: 'State9', cities: {} },
      },
    },
  },
};

const SelectLocation = ({ route }) => {
  const { serviceName } = route.params;
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTown, setSelectedTown] = useState(null);
  const [isCountryFocus, setIsCountryFocus] = useState(false);
  const [isStateFocus, setIsStateFocus] = useState(false);
  const [isCityFocus, setIsCityFocus] = useState(false);
  const [isTownFocus, setIsTownFocus] = useState(false);

  const renderLabel = (label) => {
    if (label) {
      return (
        <Text style={[styles.label, { color: 'blue' }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  const sendDataToBackend = async () => {
    try {
      const selectedData = {
        serviceName,
        selectedCountry,
        selectedState,
        selectedCity,
        selectedTown,
      };

      const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedData),
      });

      if (response.ok) {
        console.log('Data sent successfully');
        // Handle successful response, e.g., show a success message
      } else {
        console.error('Failed to send data to server');
        // Handle failed response, e.g., show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle any other errors, e.g., network errors
    }
  };

  // Function to handle sending data to the backend when the "OK" button is pressed
  const handleOkButtonPress = () => {
    sendDataToBackend();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Selected Service: {serviceName}</Text>
      </View>

      <Dropdown
        style={[styles.dropdown, isCountryFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={Object.values(data.countries).map(country => ({ label: country.label, value: country.label }))}
        search
        maxHeight={300}
        placeholder={!isCountryFocus ? 'Select country' : '...'}
        searchPlaceholder="Search..."
        value={selectedCountry}
        onFocus={() => setIsCountryFocus(true)}
        onBlur={() => setIsCountryFocus(false)}
        onChange={(item) => {
          setSelectedCountry(item.value);
          setIsCountryFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isCountryFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />

      <Dropdown
        style={[styles.dropdown, isStateFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={selectedCountry ? Object.values(data.countries[selectedCountry].states).map(state => ({ label: state.label, value: state.label })) : []}
        search
        maxHeight={300}
        placeholder={!isStateFocus ? 'Select state' : '...'}
        searchPlaceholder="Search..."
        value={selectedState}
        onFocus={() => setIsStateFocus(true)}
        onBlur={() => setIsStateFocus(false)}
        onChange={(item) => {
          setSelectedState(item.value);
          setIsStateFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isStateFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />

      <Dropdown
        style={[styles.dropdown, isCityFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={selectedState ? Object.values(data.countries[selectedCountry].states[selectedState].cities).map(city => ({ label: city.label, value: city.label })) : []}
        search
        maxHeight={300}
        placeholder={!isCityFocus ? 'Select city' : '...'}
        searchPlaceholder="Search..."
        value={selectedCity}
        onFocus={() => setIsCityFocus(true)}
        onBlur={() => setIsCityFocus(false)}
        onChange={(item) => {
          setSelectedCity(item.value);
          setIsCityFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isCityFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />

      <Dropdown
        style={[styles.dropdown, isTownFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={selectedCity ? Object.values(data.countries[selectedCountry].states[selectedState].cities[selectedCity].towns).map(town => ({ label: town.label, value: town.label })) : []}
        search
        maxHeight={300}
        placeholder={!isTownFocus ? 'Select town' : '...'}
        searchPlaceholder="Search..."
        value={selectedTown}
        onFocus={() => setIsTownFocus(true)}
        onBlur={() => setIsTownFocus(false)}
        onChange={(item) => {
          setSelectedTown(item.value);
          setIsTownFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isTownFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />

      {/* OK button to trigger sending data to backend */}
      <TouchableOpacity onPress={handleOkButtonPress} style={styles.okButton}>
        <Text style={styles.okButtonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
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
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  okButton: {
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  okButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectLocation;
