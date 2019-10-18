import React from 'react'
import { StyleSheet, Platform, Image, Text, View, TouchableOpacity, Button } from 'react-native'
import * as firebase from "firebase/app";
import Navbar from './Navbar.js';
import DrawerStack from './DrawerStack'
import NavDrawer from './NavDrawer'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

class Main extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Home',
    /*   drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./chats-icon.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ), */
    };
    state = { currentUser: null }  
    constructor(pros){
      super(pros)
    }
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }
    Logout = () =>{
      firebase
        .auth()
        .signOut()
        .then(() => this.props.navigation.navigate('Login'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        const { currentUser } = this.state
        return (
          
          <View style={styles.container}>
            <Text>pantalla principal</Text>
            <Button
              onPress={() => this.props.navigation.openDrawer()}
              title="Go to notifications"
            />
          </View>
          
          
         
            
       
        )
      
    }}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
 /*    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./notif-icon.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ), */
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}
const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Main,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
},{
  initialRouteName:'Home',
  drawerPosition:'left',
  drawerType:'slide',
  statusBarAnimation:'slide'
}
);

const Drawer = createAppContainer(MyDrawerNavigator);
export default Drawer