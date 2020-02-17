import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Main from './Main';
import Settings from './Settings';
import ListNotification from './ListNotification';
import HomeScreen from './Screen/HomeScreen'
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'

export default class MyApp extends Component{
  render(){
    const AppNavigator =createAppContainer(AppDrawerNavigator)
    return(
      <AppNavigator/>
    )
  }
}

const AppDrawerNavigator= createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
})

  
  

