import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployeeProfile from './EmployeeProfile'; // adjust the path if needed
import ChatScreen from './ChatScreen'; // create this screen separately
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppNavigator = ({ route }) => {
  const { token } = route.params;

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Profile') {
              iconName = 'person-circle-outline';
            } else if (route.name === 'Chat') {
              iconName = 'chatbubbles-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#24d158',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Profile">
          {(props) => <EmployeeProfile {...props} route={{ params: { token } }} />}
        </Tab.Screen>
        <Tab.Screen name="Chat">
          {(props) => <ChatScreen {...props} route={{ params: { token } }} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
