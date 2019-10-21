import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Presentation from './src/components/Presentation.js'
import Loading from './src/components/Loading.js'
import SignUp from './src/components/SignUp.js'
import Login from './src/components/Login.js'
import Main from './src/components/Main.js'// create our app's navigation stack
import List from './src/components/list/List.js'
import contList from './src/components/list/ContentList.js'
import Navbar from './src/components/Navbar.js'
const AppNavigator = createStackNavigator(
{
  Presentation:{screen:Presentation},
  Loading:{screen:Loading},

  SignUp:{screen:SignUp},
  Login: {screen: Login },
  Main: {screen: Main},
  List:{screen:List},
  Navbar:{screen:Navbar},
  contList:{screen:contList}
},
{headerMode: 'none',
  initialRouteName: 'Navbar',
},

)

const App = createAppContainer(AppNavigator);

export default App;