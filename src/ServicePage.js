
import React, { useState ,useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { getGlobalIP } from './globalIP';

const ServicePage = ({ navigation ,route}) => {
  const {token} = route.params;
  
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarAnim] = useState(new Animated.Value(-250)); // Sidebar starts off-screen
    const [userData, setUserData] = useState([]);
   const ip = getGlobalIP();
 

useEffect(() => {
    const fetchUserData = async () => {
      try {
       const url =`http://${ip}/user-data`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userDataFromServer = await response.json();
         //console.log("User Data from API:", JSON.stringify(userDataFromServer, null, 2)); // Detailed log
        setUserData(userDataFromServer.data || []);
      
   
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setError(error.message);
      
      }
    };
    fetchUserData();
  }, [token]);
  const services = [
    { name: 'Electrician', icon: 'tool' },
    { name: 'Plumber', icon: 'dropbox' },
    { name: 'Carpenter', icon: 'skin' },
    { name: 'Automobile', icon: 'car' },
    { name: 'Painter', icon: 'picture' },
    { name: 'Welder', icon: 'picture' },
    { name: 'Garbage collector', icon: 'delete' },
  ];

  const handleBoxPress = (serviceName) => {
    navigation.navigate('SelectLocation', { serviceName });
  };

  const toggleSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: sidebarVisible ? -250 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear auth token)
    alert('Logging out...');
    navigation.navigate('MainPage'); // Adjust based on your navigation structure
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnim }] }]}>
        <View style={styles.sidebarHeader}>
          <Image source={require('./Logo.png')} style={styles.sidebarLogo} />
          <Text style={styles.sidebarTitle}>User Profile</Text>
        </View>
        {userData.map((user ,index)=>(
        <View  key ={index} style={styles.userInfo}>
          <Text style={styles.userName}>{user.username}</Text>
          <Text style={styles.userEmail}>{user.useremail}</Text>
        </View>))}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <AntDesign name="logout" size={20} color="#fff" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar}>
            <AntDesign name="menu-fold" size={24} color="#333" />
          </TouchableOpacity>
          <Image source={require('./Logo.png')} style={styles.logo} />
          <Text style={styles.headerText}>Go Service</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image source={require('./l.jpg')} style={styles.heroImage} />
          <Text style={styles.heroTitle}>Our Professional Services</Text>
          <Text style={styles.heroSubtitle}>Choose from our expert services below</Text>
        </View>

        {/* Services Grid */}
        <View style={styles.servicesContainer}>
          {services.map((service, index) => (
            <TouchableOpacity
              key={index}
              style={styles.serviceCard}
              onPress={() => handleBoxPress(service.name)}
            >
              <AntDesign name={service.icon} size={30} color="#24d158" style={styles.serviceIcon} />
              <Text style={styles.serviceText}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Overlay when sidebar is open */}
      {sidebarVisible && (
        <TouchableOpacity style={styles.overlay} onPress={toggleSidebar} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#fff',
    zIndex: 1000,
    elevation: 5,
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  sidebarLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userInfo: {
    marginBottom: 30,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#24d158',
    padding: 12,
    borderRadius: 8,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  heroSection: {
    padding: 20,
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  servicesContainer: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  serviceIcon: {
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});

export default ServicePage;