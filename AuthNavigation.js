import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Presentation from './src/components/Presentation.js'
import Loading from './src/components/Loading.js'
import SignUp from './src/components/SignUp.js'
import Login from './src/components/Login.js'
import FormProfile from './src/components/FormProfile'
import Director from './src/components/kindProfile/Director'
import Performer from './src/components/kindProfile/Performer'

const AuthNavigation = createStackNavigator(
{
  Presentation:{screen:Presentation},
  Loading:{screen:Loading},
  SignUp:{screen:SignUp},
  Login: {screen: Login },
  FormProfile:{screen:FormProfile},
  Performer:{screen:Performer},
  Director:{screen:Director}
},
{headerMode: 'none',
  initialRouteName: 'Presentation',
},

)

const Auth = createAppContainer(AuthNavigation);

export default Auth;