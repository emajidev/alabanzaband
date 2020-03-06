
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar ,ActivityIndicator,AsyncStorage,ScrollView} from 'react-native';
import NotificationComponent from './NotificationComponent';
import GroupComponent from './GroupComponent'
import { db } from './firebase.js';
import HeaderStandar from './HeaderStandar.js';
import {ThemeContext, themes} from './conext/theme-context';
import {ThemeProvider} from 'styled-components/native'
import {TouchableOpacity} from 'react-native-gesture-handler';

export class HeaderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,

    };
 }
 
  componentWillUpdate(){
    this.getTheme()
  }
   getTheme = async () => {
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
 

   render() {

     return (
     <ThemeContext.Provider value={{...this.state.theme}}>
       {this.props.children}
      <View >
         <HeaderStandar title={'EVENTOS'}/>
      </View>
    </ThemeContext.Provider>   
      
      )
   }
}