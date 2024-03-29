import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Loading from "./src/components/Loading.js";
import Main from "./src/components/Main.js"; // create our app's navigation stack
import ListSong from "./src/components/ListSong.js";
import ListNotification from "./src/components/ListNotification";
import AddItem from "./src/components/AddItem.js";
import Home from "./src/components/Home.js";
import ContentItem from "./src/components/ContentItem.js";
import AddNotification from "./src/components/AddNotification.js";
import NotificationComponent from "./src/components/NotificationComponent.js";
import AddContacts from "./src/components/contacts/AddContacts.js";
import AddGroups from "./src/components/contacts/AddGroups.js";
import CreateGroups from "./src/components/contacts/CreateGroups.js";
import GroupComponent from "./src/components/GroupComponent.js";
import GroupNotifications from "./src/components/GroupNotifications.js";
import GroupRequest from "./src/components/GroupRequest.js";
import SendNotification from "./src/components/SendNotification.js";
import ContactsComponent from "./src/components/contacts/ContactsComponent.js";
import ListContacts from "./src/components/contacts/ListContacts.js";
import Contacts from "./src/components/contacts/Contacts.js";
import LocalNotifications from "./src/components/LocalNotifications.js";
import ShowProfile from "./src/components/profile/ShowProfile.js";
import AdminDashboard from "./src/components/admin/AdminDashboard.js";
import Suggestion from "./src/components/Suggestion.js";
import ShowSuggestion from "./src/components/admin/ShowSuggestion.js";
import Searcher from "./src/components/searcher/Searcher.js";
import NewEvent from "./src/components/NewEvent.js";
import Chat from "./src/components/chat/Chat.js";
import ListChat from "./src/components/chat/ListChat.js";
import ViewerNotification from "./src/components/notifications/ViewerNotification";
import CommentViewer from "./src/components/comments/CommentViewer";
import YourProfile from "./src/components/profile/YourProfile"
import ExternalProfile from "./src/components/profile/ExternalProfile"
import MenuBand from "./src/components/Band/MenuBand"
import CreateBand from "./src/components/Band/CreateBand"
import JoinBand from "./src/components/Band/JoinBand"
import BandProfile from "./src/components/Band/BandProfile";
import Settings from "./src/components/sidebar/Settings";
import ScheduleEvents from "./src/components/scheduledEvents/ScheduleEvents";

const AppNavigator = createStackNavigator(
  {
    Loading: { screen: Loading },
    Main: { screen: Main },
    ListSong: { screen: ListSong },
    ListNotification: { screen: ListNotification },
    Home: { screen: Home },
    AddItem: { screen: AddItem },
    ContentItem: { screen: ContentItem },
    Searcher: { screen: Searcher },
    AddNotification: { screen: AddNotification },
    NotificationComponent: { screen: NotificationComponent },
    ViewerNotification: { screen: ViewerNotification },
    NewEvent: { screen: NewEvent },
    SendNotification: { screen: SendNotification },
    AddContacts: { screen: AddContacts },
    AddGroups: { screen: AddGroups },
    CreateGroups: { screen: CreateGroups },
    GroupComponent: { screen: GroupComponent },
    GroupNotifications: { screen: GroupNotifications },
    GroupRequest: { screen: GroupRequest },
    ContactsComponent: { screen: ContactsComponent },
    ListContacts: { screen: ListContacts },
    Contacts: { screen: Contacts },
    ListChat: { screen: ListChat },
    Chat: { screen: Chat },
    LocalNotifications: { screen: LocalNotifications },
    CommentViewer: { screen: CommentViewer },
    ShowProfile: { screen: ShowProfile },
    AdminDashboard: { screen: AdminDashboard },
    Suggestion: { screen: Suggestion },
    ShowSuggestion: { screen: ShowSuggestion },
    Settings: { screen: Settings },
    YourProfile:{screen:YourProfile},
    ExternalProfile:{screen:ExternalProfile},
    MenuBand:{screen:MenuBand},
    CreateBand:{screen:CreateBand},
    JoinBand:{screen:JoinBand},
    BandProfile:{screen:BandProfile},
    ScheduleEvents:{screen:ScheduleEvents}
  },
  { headerMode: "none", initialRouteName: "Main" }
);

const AppNav = createAppContainer(AppNavigator);

export default AppNav;
