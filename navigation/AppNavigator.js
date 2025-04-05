import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/home/HomeScreen';
import DashboardScreen from '../screens/home/DashboardScreen';
import Member from "../screens/loans/Member"
import Sidebar from "../components/Sidebar"

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
/** 
 * Main App Navigator (No Drawer)
 */
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Authentication Screens */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
   
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
    <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    <Drawer.Screen name="Member" component={Member} />
    <Drawer.Screen name="Reports" component={ReportsScreen} />
    <Drawer.Screen name="Messages" component={MessagesScreen} />
  </Drawer.Navigator>
);

export default AppNavigator;
