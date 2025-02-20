import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';

const Stack = createStackNavigator();

const Navigation = () => {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main Screen" component={MainScreen} />
        </Stack.Navigator>
    );
};

export default Navigation;
