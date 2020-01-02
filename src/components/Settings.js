import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,StatusBar,AsyncStorage,TextInput,TouchableHighlight} from 'react-native'
import {ThemeContext, themes} from './conext/theme-context';
import {withNavigation} from 'react-navigation';


class Content extends React.Component {

   constructor(props){
      super(props)
      this.selectTheme = this.selectTheme.bind(this);

      this.state = {
         dataStorage:{},
         theme: themes.light,
   
      }
      
    }      
   
   selectTheme= async (theme)=>{
      try {
         const data = await AsyncStorage.getItem('@storage_Key')
         let newData = JSON.parse(data);
         console.log(" storage obtenido",newData)
         const valueDefault = themes.light
         let newDataStorage = {
            theme:theme?theme:valueDefault,
            phone:newData.phone,
            user:newData.user,
            
         }
         try {
            await AsyncStorage.setItem('@storage_Key',JSON.stringify(newDataStorage))
            console.log("tema subido", newDataStorage)
         } catch (e) {
            // saving error
         }
        
      } catch(e) {
         // error reading value
         console.log(e)
      }
      
   }
    render() {
      
       return (
       
            <View style={styles.container}>
                <Text>Alertar notificaciones</Text>
                <Text >tema</Text>
                <View>
                   
                  <TouchableOpacity style={styles.theme1} 
                  onPress={ () => this.selectTheme(themes.yellow)}
                  />
                   <TouchableOpacity style={styles.theme2} 
                  onPress={ () => this.selectTheme(themes.red)}
                  />
                   <TouchableOpacity style={styles.theme3} 
                  onPress={ () => this.selectTheme(themes.ice)}
                  />
                </View>
         
            </View>

       
       )
    }
 }

   class Settings extends React.Component {
    render(){
       return(
         
            <Content/>
      
         
       )
    }
 }
 export default withNavigation(Settings)
 const styles = StyleSheet.create ({
      container:{
         flex:1,
         justifyContent:'flex-start',
         alignItems:'center',
         marginTop:StatusBar.currentHeight+15,  
      },
      theme1:{
         width:50,
         height:50,
         backgroundColor:'#FF3'
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
