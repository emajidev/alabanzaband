import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Loading from './src/components/Loading.js'
import Main from './src/components/Main.js'// create our app's navigation stack
import List from './src/components/List.js'
import AddItem from './src/components/AddItem.js'
import Home from './src/components/Home.js'
import ContentItem from './src/components/ContentItem.js'
import AddNotification from './src/components/AddNotification.js'
import NotificationComponent from './src/components/NotificationComponent.js'
import ListNotification from './src/components/ListNotification.js'
import AddContacts from './src/components/contacts/AddContacts.js'
import AddGroups from './src/components/contacts/AddGroups.js'
import CreateGroups from './src/components/contacts/CreateGroups.js'
import GroupComponent from './src/components/GroupComponent.js'
import GroupNotifications from './src/components/GroupNotifications.js'
import GroupRequest from './src/components/GroupRequest.js'
import SendNotification from './src/components/SendNotification.js'
import ContactsComponent from './src/components/contacts/ContactsComponent.js'
import ListContacts from './src/components/contacts/ListContacts.js'
import Contacts from './src/components/contacts/Contacts.js'
import LocalNotifications from './src/components/LocalNotifications.js'
import Settings from './src/components/Settings.js'
import ShowProfile from './src/components/profile/ShowProfile.js'
import AdminDashboard from './src/components/admin/AdminDashboard.js'
import Suggestion from './src/components/Suggestion.js'
import ShowSuggestion from './src/components/admin/ShowSuggestion.js'
import Categories from './src/components/Categories.js'
import Search from './src/components/Search.js'
import NewEvent from './src/components/NewEvent.js'
import Chat from './src/components/chat/Chat.js'
import ListChat from './src/components/chat/ListChat.js'
const AppNavigator = createStackNavigator(
{
  Loading:{screen:Loading},
  Main: {screen: Main},
  List:{screen:List},
  Home:{screen:Home},
  AddItem:{screen:AddItem},
  ContentItem:{screen:ContentItem},
  Categories:{screen:Categories},
  Search:{screen:Search},
  AddNotification:{screen:AddNotification},
  NotificationComponent:{screen:NotificationComponent},
  ListNotification:{screen:ListNotification},
  NewEvent:{screen:NewEvent},
  SendNotification:{screen:SendNotification},
  AddContacts:{screen:AddContacts},
  AddGroups:{screen:AddGroups},
  CreateGroups:{screen:CreateGroups},
  GroupComponent:{screen:GroupComponent},
  GroupNotifications:{screen:GroupNotifications},
  GroupRequest:{screen:GroupRequest},
  ContactsComponent:{screen:ContactsComponent},
  ListContacts:{screen:ListContacts},
  Contacts:{screen:Contacts},
  ListChat:{screen:ListChat},
  Chat:{screen:Chat},
  LocalNotifications:{screen:LocalNotifications},

  Settings:{screen:Settings},
  ShowProfile:{screen:ShowProfile},
  AdminDashboard:{screen:AdminDashboard},

  Suggestion:{screen:Suggestion},
  ShowSuggestion:{screen:ShowSuggestion}
},
{headerMode: 'none',
  initialRouteName: 'Main',
},

)

const AppNav = createAppContainer(AppNavigator);

export default AppNav;