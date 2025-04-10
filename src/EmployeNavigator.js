// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import EmployeeProfile from './EmployeeProfile'; // Your existing profile screen
// import ListOfChats from './ListOfChats'; // Create this component for chats list

// const Tab = createBottomTabNavigator();

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;
//             if (route.name === 'Profile') {
//               iconName = 'person-circle-outline';
//             } else if (route.name === 'Chats') {
//               iconName = 'chatbubbles-outline';
//             }
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: '#007AFF',
//           tabBarInactiveTintColor: 'gray',
//           tabBarStyle: {
//             backgroundColor: '#ffffff',
//             height: 60,
//             paddingBottom: 5,
//           },
//           headerShown: false,
//         })}
//       >
//         <Tab.Screen name="Profile" component={EmployeeProfile} />
//         <Tab.Screen name="Chats" component={ListOfChats} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;
