// // App.js
// import 'react-native-gesture-handler';
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from './src/LoginScreen';
// import SignupScreen from './src/SignupScreen';
// import MainPage from './src/MainPage';


// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="MainPage">
//         <Stack.Screen name="MainPage" component={MainPage} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />
//         {/* <Stack.Screen name="ServicePage" component={ServicePage} /> */}
//         {/* Add more screens here if needed */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

// App.js
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './src/MainPage';
 import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import ServicePage from './src/ServicePage';
import SplashScreen from './src/SplashScreen'; // Add this line
import SelectLocation from './src/SelectLocation';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainPage" component={MainPage} />
       <Stack.Screen name="LoginScreen" component={LoginScreen} />
       <Stack.Screen name="Signup" component={SignupScreen} />  */}
        <Stack.Screen name="ServicePage" component={ServicePage} />
        <Stack.Screen name="SelectLocation" component={SelectLocation} />
        {/* Add more screens here if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
