import React from 'react'
import {StatusBar, StyleSheet, AsyncStorage, SafeAreaView, Text, View, TouchableOpacity, Button,Alert } from 'react-native'
import * as firebase from "firebase/app";
import Navbar from './Navbar.js';
import {createDrawerNavigator } from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import Categories from './Categories'
import Settings from './Settings'
import ShowProfile from './profile/ShowProfile'
import AdminDashboard from './admin/AdminDashboard'

import {ThemeContext, themes} from './conext/theme-context';

import {ThemeProvider} from 'styled-components/native'
import {Container} from './conext/themes/styled'
import { db } from './firebase';

import {DrawerItems} from 'react-navigation-drawer'


let user;
let newData
let modUser = db.ref('/moduser');


class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
      moduser:[],

    };
 }
 getModUser(){
  modUser.on('value', snapshot => {
    let data = snapshot.val();
    let moduser = Object.values(data);
    this.setState({ moduser });
    console.log("modo de usuario", this.state.moduser) 
  });
}
 componentDidMount() {
   this.getModUser();
  setTimeout(() => {
    console.log("temp")
    this.getData()
    }, 1000);
}
  componentWillUpdate(){
    this.getData()
  }
   getData = async () => {
    try {
      user = await AsyncStorage.getItem('@storage_Key')
      newData = JSON.parse(user);
      const valueDefault = themes.light
      if ( this.state.theme !=newData.theme){
        this.setState({theme:newData.theme ? newData.theme:valueDefault})
        return true
      }
      this.setState({theme:newData.theme ? newData.theme:valueDefault})
       }
       catch(e) {
         // error reading value
         console.log(e)
      }
   }
   cosa(){
     this.getData()
   }

   render() {
      const dataTheme = this.state.theme
      let modUser =  this.state.moduser
      return (
        <ThemeContext.Provider value={{...this.state.theme}}>
           {this.props.children}
           <View style={styles.container}>
                {
                  modUser =='admin' ? (
                    <AdminDashboard />
                
                  ):(
                    <Navbar />
                )}
                
           
            
           </View>
     </ThemeContext.Provider>   
      
      )
   }
}


class Main extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Inicio',
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
  

    render() {
        const { currentUser } = this.state
       
        return (
       
            <Content/>   
        )
      
    }}
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#f4f',
    flex:1,
    width:'100%',
    margin:0,
    padding:0,
    justifyContent:'center',
    alignItems:'center',
    
 },
 theme1:{
    width:50,
    height:50,
    backgroundColor:'#Ff2'
 },

 theme2:{
    width:50,
    height:50,
    backgroundColor:'#F23'
 },
 theme3:{
    width:50,
    height:50,
    backgroundColor:'#5ff9'
 },
})



class NotificationsScreen extends React.Component {
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
class Page1 extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Ajustes',
 /*    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./notif-icon.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ), */
  };

  render() {
    return (
      
        <Settings/>
    
    );
  }
}
class Page2 extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Perfil',
 /*    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./notif-icon.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ), */
  };

  render() {
    return (
      
        <ShowProfile/>
    
    );
  }
}

class Page3 extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Categorias',
 /*    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./notif-icon.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ), */
  };

  render() {
    return (
      
        <Categories/>
    
    );
  }
}


const MyDrawerNavigator = createDrawerNavigator({
  Inicio: {
    screen: Main,
  },
  Notifications: {
    screen: NotificationsScreen,
  },
  Ajustes:{
    screen:Page1,
  },
  Perfil:{
    screen:Page2,
  },
  Categorias:{
    screen:Page3,
  },

  },
  {
    contentComponent:(props) => (
      <View style={{flex:1}}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <TouchableOpacity onPress={()=>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {this.props.navigation.dispatch(DrawerActions.closeDrawer()) }},
                  {text: 'Confirm', onPress: () => {
                    AsyncStorage.removeItem('@storage_Key')
                    props.navigation.navigate('AuthLoading');
                    firebase
                    .auth()
                    .signOut()
                    .then(() => {
                      console.log('cerrar')
                      AsyncStorage.clear().then(() => console.log('Cleared'))
                    }
                      )
                    .catch(error =>console.log("error en cerrar sesion",error))
                  }},
                ],
                { cancelable: false }
              )  
            }>
              <Text style={{margin: 16,fontWeight: 'bold',color: '#f44'}}>Logout</Text>
            </TouchableOpacity>
          </SafeAreaView>
      </View>
    ),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
);


const Drawer = createAppContainer(MyDrawerNavigator);
export default Drawer