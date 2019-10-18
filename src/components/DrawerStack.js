import React from 'react';
import {View, TouchableOpacity, Text, Button} from 'react-native'
import {createAppContainer,} from 'react-navigation'
import { createDrawerNavigator, DrawerSidebar } from 'react-navigation-drawer';
import Sidebar from './Sidebar.js'

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Text>holaaa</Text>
    ),
  };
  Drawer = () =>{
    this.props.navigation.openDrawer();
  }
  render() {
    return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Button
      onPress={() => this.props.navigation.openDrawer()}
      title="Open drawer"
    />
    </View>
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Text>holaaa</Text>
    ),
  };

  render() {
    return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Button
      onPress={() => this.props.navigation.goBack()}
      title="Go back home"
    />
    </View>
    );
  }
}



const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
},{
  drawerPosition:"left",
  drawerBackgroundColor:'red',
  drawerType:'slide',
  drawerWidth:200,
  initialRouteName:'Home'
}
  
);
  const MyApp = createAppContainer(MyDrawerNavigator);

  export default MyApp;