import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,StatusBar,AsyncStorage,TextInput,TouchableHighlight} from 'react-native'
import {ThemeContext, themes} from './conext/theme-context';
import {withNavigation} from 'react-navigation';
import ItemComponent from '../components/ItemComponent';


class Search extends React.Component {
    render(){
       return(
         
            <ItemComponent search_mode={true}/>
      
         
       )
    }
 }
 export default withNavigation(Search)
 const styles = StyleSheet.create ({
      container:{
         flex:1,
         justifyContent:'flex-start',
         alignItems:'center',
         marginTop:15,  
      },

  })
