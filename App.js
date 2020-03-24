import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthNavigation from './AuthNavigation'
import AppNavigator from './AppNavigator'
import AuthLoadingScreen from './src/components/AuthLoadingScreen'
import { UserProvider } from "./src/components/UserContext";
import React, { Component } from 'react'

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.



const AppContainer = createAppContainer(
  
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppNavigator,
      Auth: AuthNavigation,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
const App  = () => {
  return (
  <UserProvider>
    <AppContainer />
  </UserProvider>);
}
export default App