import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreens from '../screens/Auth/LoginScreens';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import CartScreen from '../screens/Cart/CartScreen';
import ProductInfoScreen from '../screens/ProductInfo/ProductInfoScreen';
import AddAddressScreen from '../screens/Address/AddAddressScreen';
import Address from '../screens/Address/Address';
import ConfirmtionScreen from '../screens/Order/ConfirmtionScreen';
import OrderScreen from '../screens/Order/OrderScreen';
import ForgetPasswordScreen from '../screens/Auth/ForgetPasswordScreen';
import LoaderScreen from '../screens/Auth/LoaderScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
              color: '#008E97',
            },
            tabBarIcon: ({focused}) =>
              focused ? (
                <Entypo name="home" size={24} color="black" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
              color: '#008E97',
            },
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="person" size={24} color="black" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: 'Cart',
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
              color: '#008E97',
            },
            tabBarIcon: ({focused}) =>
              focused ? (
                <Entypo name="shopping-cart" size={24} color="black" />
              ) : (
                <Feather name="shopping-cart" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Loader"
          component={LoaderScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="UpdatePassword"
          component={ForgetPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add"
          component={Address}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Confirm"
          component={ConfirmtionScreen}
          options={{headerShown: false}}
        />
           <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
