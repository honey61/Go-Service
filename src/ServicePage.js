// src/ServicePage.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ServicePage = ({ navigation }) => {
  const handleBoxPress = (serviceName) => {
    // Handle the box press, e.g., navigate to List.js with the service name
    navigation.navigate('SelectLocation', { serviceName });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>
          <Image source={require('./Logo.png')} style={styles.logo} /> Go service
        </Text>
      </View>
      <View style={styles.content}>
        <View>
          <Image source={require('./l.jpg')} style={styles.l} />
          <Text style={[{ fontSize: 20 }, { padding: 10 }]}>Service we Offer:</Text>
        </View>

        <TouchableOpacity style={styles.boxRow} onPress={() => handleBoxPress('Electrician')}>
          {/* Box 1 */}
          <View style={styles.box}>
            <Text style={styles.boxText}>Electrician</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxRow} onPress={() => handleBoxPress('Plumber')}>
          {/* Box 2 */}
          <View style={styles.box}>
            <Text style={styles.boxText}>Plumber</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxRow} onPress={() => handleBoxPress('Carpenter')}>
          {/* Box 3 */}
          <View style={styles.box}>
            <Text style={styles.boxText}>Carpenter</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxRow} onPress={() => handleBoxPress('Automobile')}>
          {/* Box 4 */}
          <View style={styles.box}>
            <Text style={styles.boxText}>Automobile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxRow} onPress={() => handleBoxPress('Painter')}>
          {/* Box 5 */}
          <View style={styles.box}>
            <Text style={styles.boxText}>Painter</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxRow} onPress={() => handleBoxPress('Welder')}>
          {/* Box 6 */}
          <View style={styles.box}>
            <Text style={styles.boxText}>Welder</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    backgroundColor: '#2ecc71', // Green color for the navbar
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
  },
  navbarText: {
    color: '#ffffff', // White color for the text
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  boxRow: {
    marginBottom: 16,
  },
  box: {
    width: '100%', // Adjust the width as needed
    height: 100, // Adjust the height as needed
    backgroundColor: '#2ecc71', // Green color for the box
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  boxText: {
    color: '#ffffff', // White color for the text inside the box
  },
  logo: {
    width: 25, // Adjust the width as needed
    height: 25, // Adjust the height as needed
  },
  l: {
    width: 370, // Adjust the width as needed
    height: 220, // Adjust the height as needed
  },
});

export default ServicePage;
