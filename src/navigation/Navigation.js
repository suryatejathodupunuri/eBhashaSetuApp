import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MainScreen from '../screens/MainScreen';
import Translation from '../screens/Translation';
import ComingSoon from '../screens/ComingSoon';
import Transliteration from '../screens/Transliteration';
import Translation2 from '../screens/Translation2';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainScreen" component={MainScreen} />
    <Stack.Screen name="Translation" component={Translation} />
    <Stack.Screen name="Transliteration" component={Transliteration} />
    <Stack.Screen name="Translation2" component={Translation2} />
    <Stack.Screen name="ComingSoon" component={ComingSoon} />
  </Stack.Navigator>
);

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#1A374D',
        paddingBottom: 8,
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      tabBarIcon: ({ color, size, focused }) => {
        let iconName = route.name === 'Home' ? 'home' : 'menu';
        return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
      },
      tabBarActiveTintColor: '#A2D9F7',
      tabBarInactiveTintColor: '#bbb',
    })}
  >
    <Tab.Screen name="Home" component={MainStack} />
    <Tab.Screen name="Menu" component={ComingSoon} />
  </Tab.Navigator>
);

const Navigation = () => (
  <NavigationContainer>
    <BottomTabNavigator />
  </NavigationContainer>
);

export default Navigation;
