import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthNavigation from './AuthNavigation'
import AppNavigator from './AppNavigator'
import AuthLoadingScreen from './src/components/AuthLoadingScreen'
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.




export default createAppContainer(
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