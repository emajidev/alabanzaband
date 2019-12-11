import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Presentation from './src/components/Presentation.js'
import Loading from './src/components/Loading.js'
import SignUp from './src/components/SignUp.js'
import Login from './src/components/Login.js'
import FormProfile from './src/components/FormProfile.js'
import Main from './src/components/Main.js'// create our app's navigation stack
import List from './src/components/List.js'
import AddItem from './src/components/AddItem.js'
import Navbar from './src/components/Navbar.js'
import ContentItem from './src/components/ContentItem.js'
import AddNotification from './src/components/AddNotification.js'
import NotificationComponent from './src/components/NotificationComponent.js'
import ListNotification from './src/components/ListNotification.js'
import AddContacts from './src/components/AddContacts.js'
import SendNotification from './src/components/SendNotification.js'
import ContactsComponent from './src/components/ContactsComponent.js'
import ListContacts from './src/components/ListContacts.js'
import Contacts from './src/components/Contacts.js'
import LocalNotifications from './src/components/LocalNotifications.js'


const AppNavigator = createStackNavigator(
{
  Presentation:{screen:Presentation},
  Loading:{screen:Loading},

  SignUp:{screen:SignUp},
  Login: {screen: Login },
  FormProfile:{screen:FormProfile},
  Main: {screen: Main},
  List:{screen:List},
  Navbar:{screen:Navbar},
  AddItem:{screen:AddItem},
  ContentItem:{screen:ContentItem},
  
  AddNotification:{screen:AddNotification},
  NotificationComponent:{screen:NotificationComponent},
  ListNotification:{screen:ListNotification},

  SendNotification:{screen:SendNotification},
  AddContacts:{screen:AddContacts},
  ContactsComponent:{screen:ContactsComponent},
  ListContacts:{screen:ListContacts},
  Contacts:{screen:Contacts},

  LocalNotifications:{screen:LocalNotifications}

},
{headerMode: 'none',
  initialRouteName: 'Presentation',
},

)

const App = createAppContainer(AppNavigator);

export default App;