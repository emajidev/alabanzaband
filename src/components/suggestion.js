import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,StatusBar,Button,TextInput,TouchableHighlight} from 'react-native'
import { withNavigation } from 'react-navigation'

class suggestion extends React.Component {
   constructor(props){
      super(props)
      this.state = {date:"2016-05-15"}
    }      
  
      state = {
         colorTheme: ''
      };
   
  
    render() {

       return (
    
            <View style={styles.container}>
                <Text>Sugerencias</Text>
                <View>
            
                </View>
            </View>
          
       
       )
    }
 }
 export default withNavigation(suggestion)
 const styles = StyleSheet.create ({
      container:{
         flex:1,
         justifyContent:'flex-start',
         alignItems:'center',
         marginTop:StatusBar.currentHeight+15,
 
         
       
      },
     
  })
