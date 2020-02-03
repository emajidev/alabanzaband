import React from 'react';
import { StatusBar,StyleSheet, Text, View, Button, TouchableOpacity,AsyncStorage} from 'react-native';
import List from './List.js'
import Icon from 'react-native-vector-icons/Feather';
import ContactsIcon from 'react-native-vector-icons/AntDesign';
import {withNavigation} from 'react-navigation';
import * as firebase from "firebase/app";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import {ThemeContext, themes} from './conext/theme-context';

import {ThemeProvider} from 'styled-components/native'
import {Container,Header} from './conext/themes/styled'


class Navbar extends React.Component{

  constructor(props) {
    super(props);
  }
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };
  removeStoreData = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key')
      /* console.log("storage clear") */
      this.props.navigation.navigate('AuthLoading')
      
    }
    catch(e) {
    
      console.log("error en remover ",e)
    }
   
  }
  
  singOut = () =>{
    firebase
    .auth()
    .signOut()
    .then(() => {this.removeStoreData();console.log('cerrar')})
    .catch(error => this.setState({ errorMessage: error.message }))
    

    
  }
  render() {
  return (
 
    <View style={navbarStyles.container} >
    <ThemeContext.Consumer>
        {data =>
      <ThemeProvider theme={data}>
       
        <Header>
          <View style={navbarStyles.iconMenu}>
          <TouchableOpacity style={navbarStyles.btn_nav}
          onPress={() => this.props.navigation.openDrawer()}
          >
            
              <Icon 
                name='menu'
                color='#5f25fe'
                size={30}
            
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex:1}}>
            <Text style={navbarStyles.title}> ALABANZABAND</Text>
          </View>
          <View style={navbarStyles.iconnavbar}>
{/*       
            <TouchableOpacity style={navbarStyles.btn_nav}>
              <ContactsIcon 
                name='contacts'
                color='#5f25fe'
                onPress={() => this.props.navigation.navigate('Contacts')}
                size={25}
            
              />
            </TouchableOpacity> */}
            <TouchableOpacity style={navbarStyles.btn_nav}>
              <Icon 
                name='bell'
                color='#5f25fe'
                onPress={() => this.props.navigation.navigate('ListNotification')}
                size={25}
            
              />
            </TouchableOpacity>
    {/*         <TouchableOpacity style={navbarStyles.btn_nav}
            onPress={() => this.props.navigation.navigate('Suggestion')}>
              <Icon 
                name='music'
                color='#5f25fe'
                size={25}
              />
              <Icon 
                name='plus'
                color='#5f25fe'
                size={10}
              />
            </TouchableOpacity> */}
    {/*         <Menu style={navbarStyles.btn_nav}
              ref={this.setMenuRef}
              button={
              <TouchableOpacity onPress={this.showMenu}>
                <Icon 
                name='user'
                color='#5f25fe'
                size={25}
              />
              </TouchableOpacity>}
            >
              <MenuItem onPress={this.hideMenu}>Perfil</MenuItem>
              <MenuItem onPress={this.singOut}>Cerrar sesión </MenuItem>
              <MenuDivider />
            </Menu> */}
          </View>
        </Header>
        <View >
          <List/>
        </View>
      
        
      </ThemeProvider>
    }
      
      </ThemeContext.Consumer>
  </View>
  );
  }
}
export default withNavigation(Navbar);

const navbarStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
    backgroundColor: '#fff',
    justifyContent:'flex-start',
    alignItems:'center'

   
  },
  header:{
    flex: .5,
    flexDirection:'row',
    backgroundColor: '#f43',
    justifyContent:'space-around',
    alignItems:'center' , 
   
  }, 
  btn_nav:{
    margin:8
  },
 
  iconMenu:{
    width: 50, 
    height: 50,
    justifyContent:'center',
    alignItems:'center'
  },

  iconnavbar:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  body:{
    flex: 5,
    backgroundColor: '#fff',
  },
 
  title: {
    color: '#777',
    fontSize:20,
    textAlign:'center'
   
  },
});