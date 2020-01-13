import React from 'react'
import {StatusBar, StyleSheet, AsyncStorage, Image, Text, View, TouchableOpacity, Button } from 'react-native'
import * as firebase from "firebase/app";
import Navbar from './Navbar.js';
import List from './List.js';
import DrawerStack from './DrawerStack'
import NavDrawer from './NavDrawer'
import Icon from 'react-native-vector-icons/FontAwesome';
import {createDrawerNavigator } from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import Settings from './Settings'
import ShowProfile from './profile/ShowProfile'

import {ThemeContext, themes} from './conext/theme-context';

import {ThemeProvider} from 'styled-components/native'
import {Container} from './conext/themes/styled'

import { db } from './firebase.js';

let user;
let newData
let modUser = db.ref('/moduser');

class Child  extends React.Component {
  render(){
     return(
       <View>
          <ThemeContext.Consumer>
             {data =>
           <ThemeProvider theme={data}>
              <Navbar/>
           </ThemeProvider>
        }
           
          </ThemeContext.Consumer>
       </View>
       
     )
  }
}
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
      modUser: [],

    };
 }
 getModUser(){
  modUser.on('value', snapshot => {
    let data = snapshot.val();
    let modUser = Object.values(data);
    this.setState({ modUser });
    console.log("modo de usuario", this.state.modUser) 
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
      /* console.log("obteniendo datos",newData) */
      /* console.log(" storage ",newData.theme) */
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
/*       console.log("state despues del renderizado",dataTheme)
 */      return (
        <ThemeContext.Provider value={{...this.state.theme}}>
           {this.props.children}
           <View style={styles.container}>
               <Text>Alertar notificaciones</Text>
               <Text style={{backgroundColor:this.state.theme.bg}}>tema</Text>
                <TouchableOpacity 
                title="tema"
                onPress={ () => this.cosa()}

                >
                  <Text>btn</Text>
                </TouchableOpacity>
              <View>
                 <Child />
              </View>
            
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
          
   /*        <View style={styles.container}>
            <Text>pantalla principal</Text>
            <Button
              onPress={() => this.props.navigation.openDrawer()}
              title="Go to notifications"
            />
            
          </View> */
          
       
          <Content/>
    
   
         
            
       
        )
      
    }}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:StatusBar.currentHeight+15,  
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
  }

},{
  initialRouteName:'Inicio',
  drawerPosition:'left',
  drawerType:'slide',
  statusBarAnimation:'slide'
}
);

const Drawer = createAppContainer(MyDrawerNavigator);
export default Drawer