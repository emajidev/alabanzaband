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
                <Text style={{textAlign:'center',fontSize:20, marginBottom:50}}>Seleciona un Tema</Text>
                
                <TouchableOpacity style={styles.light} 
                  onPress={ () => this.selectTheme(themes.light)}
                  />
                <TouchableOpacity style={styles.darck} 
                  onPress={ () => this.selectTheme(themes.dark)}
                  />
                  <TouchableOpacity style={styles.theme1} 
                  onPress={ () => this.selectTheme(themes.yellow)}
                  />
                   <TouchableOpacity style={styles.theme2} 
                  onPress={ () => this.selectTheme(themes.red)}
                  />
                   <TouchableOpacity style={styles.theme3} 
                  onPress={ () => this.selectTheme(themes.ice)}
                  />
                  <TouchableOpacity style={styles.theme4} 
                  onPress={ () => this.selectTheme(themes.ping)}
                  />
                   <TouchableOpacity style={styles.theme5} 
                  onPress={ () => this.selectTheme(themes.green)}
                  /> 
                  <TouchableOpacity style={styles.theme6} 
                  onPress={ () => this.selectTheme(themes.turquesa)}
                  />  
                  <TouchableOpacity style={styles.theme7} 
                  onPress={ () => this.selectTheme(themes.celestial)}
                  />  
                  <TouchableOpacity style={styles.theme8} 
                  onPress={ () => this.selectTheme(themes.creativo)}
                  /> 
                  <TouchableOpacity style={styles.theme9} 
                  onPress={ () => this.selectTheme(themes.tinto)}
                  />
                  <TouchableOpacity style={styles.theme10} 
                  onPress={ () => this.selectTheme(themes.armonia)}
                  />      
         
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
         marginTop:15,  
      },
      light:{
         width:50,
         height:50,
         backgroundColor: '#eeeeee',
       },
      darck:{
         width:50,
         height:50,
         backgroundColor:'#222222'
      },
      theme1:{
         width:50,
         height:50,
         backgroundColor:'#ef5'
      },

      theme2:{
         width:50,
         height:50,
         backgroundColor:'#f43'
      },
      theme3:{
         width:50,
         height:50,
         backgroundColor:'#56f'
      },
      theme4:{
         width:50,
         height:50,
         backgroundColor:'#E884D9'
      },
      theme5:{
         width:50,
         height:50,
         backgroundColor:'#4BB354'
      },
      theme6:{
         width:50,
         height:50,
         backgroundColor:'#2CB3B1'
      },
      theme7:{
         width:50,
         height:50,
         backgroundColor:'#0085B8'
      },
      theme8:{
         width:50,
         height:50,
         backgroundColor:'#7400B8'
      },
      theme9:{
         width:50,
         height:50,
         backgroundColor:'#B80026'
      },
      theme10:{
         width:50,
         height:50,
         backgroundColor:'#FFB81A'
      },
  })
