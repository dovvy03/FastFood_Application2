import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../HomeScreen';
import WelcomeScreen from '../WelcomeScreen';
import LoginScreen from '../LoginScreen';
import SignUpScreen from '../SignUpScreen';
import MenuScreen from '../MenuScreen';
import ChiTietOder from '../ChiTietOder';
import ProductDetailsScreen from '../ProductDetailsScreen';
import CartScreen from '../CartScreen';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import ComboScreen from '../ComboScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    let cartItems = await AsyncStorage.getItem('cart');
    cartItems = cartItems ? JSON.parse(cartItems) : [];
    setCartItems(cartItems);
    calculateTotalPrice(cartItems);
  };

  const addToCartItem = async item => {
    let cartItems = await AsyncStorage.getItem('cart');
    cartItems = cartItems ? JSON.parse(cartItems) : [];
    let isExist = cartItems.findIndex(cart => cart.id === item.id);
    if (isExist === -1) {
      cartItems.push(item);
    } else {
      cartItems[isExist].quantity += item.quantity;
    }
    calculateTotalPrice(cartItems);
    setCartItems(cartItems);
    await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
  };

  const deleteCartItem = async id => {
    let cartItems = await AsyncStorage.getItem('cart');
    cartItems = cartItems ? JSON.parse(cartItems) : [];
    cartItems = cartItems.filter(item => item.id !== id);
    setCartItems(cartItems);
    calculateTotalPrice(cartItems);
    await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
  };

  const calculateTotalPrice = cartItems => {
    let totalSum = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    totalSum = totalSum.toFixed(2);
    setTotalPrice(totalSum);
  };
  const updateQuantity = async updatedItems => {
    await AsyncStorage.setItem('cart', JSON.stringify(updatedItems));
    loadCartItems();
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Welcome"
          options={{headerShown: false}}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{headerShown: false}}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Menu"
          options={{headerShown: false}}
          component={MenuScreen}
        />
        <Stack.Screen
          name="Oder"
          options={{headerShown: false}}
          component={ChiTietOder}
        />
        <Stack.Screen
          name="Combo"
          options={{headerShown: false}}
          component={ComboScreen}
        />
        <Stack.Screen name="PRODUCT_DETAILS">
          {props => (
            <ProductDetailsScreen
              {...props}
              cartItems={cartItems}
              setCartItems={setCartItems}
              addToCartItem={addToCartItem}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {props => (
            <CartScreen
              {...props}
              cartItems={cartItems}
              deleteCartItem={deleteCartItem}
              updateQuantity={updateQuantity}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
