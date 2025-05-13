
// import 'react-native-gesture-handler';
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import MainPage from './src/MainPage';
//  import LoginScreen from './src/LoginScreen';
//  import LoginEScreen from './src/LoginEScreen';
// import SignupScreen from './src/SignupScreen';
// import ServicePage from './src/ServicePage';
// import SplashScreen from './src/SplashScreen'; 
// import SelectLocation from './src/SelectLocation';
// import UserProfile from './src/UserProfile';
// import EmployeeProfile from './src/EmployeeProfile';
// import SignupEScreen from './src/SignupEScreen';
// import ChatScreen from './src/ChatScreen';
// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="SplashScreen">
//         <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
     
// <Stack.Screen name="MainPage" component={MainPage} />
// console.log('LoginScreen Screen');
// <Stack.Screen name="LoginScreen" component={LoginScreen} />
// console.log('LoginEScreen Screen');
// <Stack.Screen name="LoginEScreen" component={LoginEScreen} />
// console.log('SignupScreen Screen');
// <Stack.Screen name="SignupScreen" component={SignupScreen} />
// console.log('ServicePage Screen');
// <Stack.Screen name="ServicePage" component={ServicePage} />
// console.log('SelectLocation Screen');
// <Stack.Screen name="SelectLocation" component={SelectLocation} />
// console.log('SignupEScreen Screen');
// <Stack.Screen name="SignupEScreen" component={SignupEScreen} />
// console.log('UserProfile Screen');
// <Stack.Screen name="UserProfile" component={UserProfile} />
//          {/* <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'Chat' }} /> */}
        
//         <Stack.Screen name = "EmployeeProfile" component= {EmployeeProfile} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './src/MainPage';
 import LoginScreen from './src/LoginScreen';
 import LoginEScreen from './src/LoginEScreen';
import SignupScreen from './src/SignupScreen';
import ServicePage from './src/ServicePage';
import SplashScreen from './src/SplashScreen'; 
import SelectLocation from './src/SelectLocation';
import UserProfile from './src/UserProfile';
import EmployeeProfile from './src/EmployeeProfile';
import SignupEScreen from './src/SignupEScreen';
import ChatScreen from './src/ChatScreen';
import ChatProfile from './src/ChatProfile';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainPage" component={MainPage} />
       <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="LoginEScreen" component={LoginEScreen} />
       <Stack.Screen name="SignupScreen" component={SignupScreen} /> 
        <Stack.Screen name="ServicePage" component={ServicePage} />
        <Stack.Screen name="SelectLocation" component={SelectLocation} />
         <Stack.Screen name="SignupEScreen" component={SignupEScreen} /> 
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name = "EmployeeProfile" component= {EmployeeProfile} />
        <Stack.Screen name = "ChatScreen" component= {ChatScreen} />
        <Stack.Screen name = "ChatProfile" component= {ChatProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
