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


class HeaderStandar extends React.Component{

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
         
          <View style={{ flex:1}}>
            <Text style={{color:data.text,textAlign:'center',fontSize:20}}> {this.props.title} </Text>
          </View>
        
        </Header>
      </ThemeProvider>
    }
      </ThemeContext.Consumer>
  </View>
  );
  }
}
export default withNavigation(HeaderStandar);

const navbarStyles = StyleSheet.create({
  container: {
 

   
  },
  header:{
    width:'100%',
    height:'100%',
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