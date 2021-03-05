import React from 'react';
import { useSelector } from 'react-redux';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Signin from '../container/signin/Signin';
import Signup from '../container/signup/Signup';
import Product from '../container/product/Product';
import Cart from '../container/cart/Cart';
import Order from '../container/order/Order';
import Profile from '../container/profile/Profile';

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Product'

    switch (routeName) {
        case 'Product':
            return 'Products';
        case 'Cart':
            return 'My Cart';
        case 'Order':
            return 'My Orders';
        case 'Profile':
            return 'Profile';
    }
}

const MainScreen = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="Home" component={BottomNavigation} options={({ route }) => ({
                headerTitle: getHeaderTitle(route)
            })} />
        </MainStack.Navigator>
    )
}


const AuthScreen = () => {
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen name="Signin" component={Signin} options={{
                animationEnabled: false,
                headerTitle: 'Login'
            }} />
            <AuthStack.Screen name="Signup" component={Signup} options={{
                animationEnabled: false,
                headerTitle: 'Create Account'
            }} />
        </AuthStack.Navigator>
    )
}



const BottomNavigation = () => {
    return (
        <Tab.Navigator barStyle={{ backgroundColor: '#292b2c'}}
        tabBarOptions={{
            activeTintColor: '#d9534f',
            inactiveTintColor: '#f7f7f7',
        }}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const icons = {
                Product: 'home',
                Cart: 'cart-outline',
                Order: 'cart-outline',
                Profile: 'person-circle-outline'
              };
        
              return (
                <Ionicons
                  name={icons[route.name]}
                  color={color}
                  size={size}
                />
              );
            },
          })} >
          <Tab.Screen name="Product" component={Product} />
          <Tab.Screen name="Cart" component={Cart} />
          <Tab.Screen name="Order" component={Order} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}


export default () => {
    const { users } = useSelector(state => state.users)
    return (
        <NavigationContainer>
            { users.length > 0 ? <MainScreen /> : <AuthScreen /> }
        </NavigationContainer>
    )
}