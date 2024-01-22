import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const SelectLocation = ({ route }) => {
  const { serviceName } = route.params;
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  // Mock data for states, cities, and towns
  const states = ['State1', 'State2', 'State3']; // Replace with your actual state data
  const cities = {
    State1: ['City1_State1', 'City2_State1', 'City3_State1'],
    State2: ['City1_State2', 'City2_State2', 'City3_State2'],
    State3: ['City1_State3', 'City2_State3', 'City3_State3'],
  };
  const towns = {
    City1_State1: ['Town1_City1_State1', 'Town2_City1_State1', 'Town3_City1_State1'],
    // Add towns for other cities and states
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleStatePress = (state) => {
    setSelectedState(state);
    setSelectedCity(null);
    openModal(cities[state]);
  };

  const handleCityPress = (city) => {
    setSelectedCity(city);
    closeModal();
  };

  const renderDropdownItem = (item, onPress) => (
    <TouchableOpacity key={item} onPress={onPress} style={styles.dropdownItem}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <View style={styles.container}>
        <Text style={styles.serviceText}>{serviceName}</Text>

        <TouchableOpacity onPress={() => openModal(states)} style={styles.dropdownButton}>
          <Text style={styles.dropdownButtonText}>Select State</Text>
        </TouchableOpacity>

        {selectedState && (
          <TouchableOpacity onPress={() => openModal(cities[selectedState])} style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonText}>Select City</Text>
          </TouchableOpacity>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContent}>
              {modalContent.map((item) =>
                renderDropdownItem(item, () => {
                  handleCityPress(item);
                })
              )}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  serviceText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dropdownButton: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    padding: 8,
    marginBottom: 16,
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});

export default SelectLocation;
