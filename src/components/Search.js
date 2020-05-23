import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,StatusBar,AsyncStorage,TextInput,TouchableHighlight} from 'react-native'
import {withNavigation} from 'react-navigation';
import ItemComponent from '../components/ItemComponent';



class Search extends React.Component {
   constructor(props) {
      super(props);
      this.state={
        modalVisible: false,
        optionCategory:'all',
        items: this.props.navigation.state.params.items
   
      }
    }
    render(){
       console.log("datos",this.props.items)
       return(
         
            <ItemComponent  items={this.state.items} search_mode={true}/>
      
         
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
