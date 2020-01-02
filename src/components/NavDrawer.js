import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
class MyHomeScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Inicio',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../img/bg.jpg')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ),
    };
  
    render() {
      return (
        <View>
        <Button
          onPress={() => this.props.navigation.navigate('Main')}
          title="Go to notifications"
        />
        </View>
      );
    }
  }
  
class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Notifications',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../img/bg.jpg')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ),
    };
  
    render() {
      return (
        <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Notifications"
        />
      );
    }
  }
class Settings extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Settings',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../img/bg.jpg')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      ),
    };
  
    render() {
      return (
        <Button
          onPress={() => this.props.navigation.navigate('Settings')}

          title="Settings"
        />
      );
    }
  }  
  const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });
  
  const MyDrawerNavigator = createDrawerNavigator({
    Inicio: {
      screen: MyHomeScreen,
    },
    Notifications: {
      screen: MyNotificationsScreen,
    },
    Settings:{
      screen:Settings
    }
  });
  
  const MyApp = createAppContainer(MyDrawerNavigator);

  export default MyApp