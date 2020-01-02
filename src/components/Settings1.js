import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,StatusBar,AsyncStorage,TextInput,TouchableHighlight} from 'react-native'
import {ThemeContext, themes} from './conext/theme-context';


class Content extends React.Component {

   constructor(props){
      super(props)
      this.selectTheme = this.selectTheme.bind(this);

      this.state = {
         dataStorage:{},
         theme: themes.light,
   
      }
 
    }      

   async componentDidMount(){
   await this.getData()
 
   

}     
   getData = async (theme) => {
      try {
         const data = await AsyncStorage.getItem('@storage_Key') 
         let newData = JSON.parse(data);
         if (newData == undefined){
            let newDataStorage = {
               theme:theme,
               phone:newData.phone,
               user:newData.user,
               
            }
            this.setState({dataStorage:newDataStorage})
            console.log(" settings",newDataStorage)
         }else{
            console.log(" storage",newData)
         let newDataStorage = {
            theme: themes.light,
            phone:newData.phone,
            user:newData.user,
            
         }
         
         
         this.setState({dataStorage:newDataStorage})
         console.log(" settings",newDataStorage)
         }
         
      } catch(e) {
         // error reading value
         console.log(e)
      }
   }
   storeData = async () => {
      
      try {
         await AsyncStorage.setItem('@storage_Key',JSON.stringify(this.state.dataStorage))
         console.log("cambio de tema")
      } catch (e) {
         // saving error
      }
   }
   selectTheme=(theme)=>{
      this.setState({theme:theme})
      this.storeData()
      this.getData(theme)
   }
    render() {

       return (
       
            <View style={styles.container}>
                <Text>Alertar notificaciones</Text>
                <Text >tema</Text>
                <View>
                   
                  <TouchableOpacity style={styles.theme1} 
                  onPress={ () => this.selectTheme(themes.spring)}
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

 export default class Settings extends React.Component {
    render(){
       return(
         
            <Content/>
      
         
       )
    }
 }
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
