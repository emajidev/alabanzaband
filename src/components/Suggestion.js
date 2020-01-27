import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,StatusBar,Button,TextInput,TouchableHighlight} from 'react-native'
import { withNavigation } from 'react-navigation'

import { db } from './firebase';

let addSuggestion= (name,comment) => {
   db.ref('/suggestion').push({
    name: name,
    comment:comment,
  })
};
class Suggestion extends React.Component {
      state = {
         name: '',
         comment:'',
   
      };
   
      nameHandle = e => {
         this.setState({
         name: e.nativeEvent.text
         });
      };
      categoryHandle = e => {
         this.setState({
         comment: e.nativeEvent.text
         });
      };
  
      handleSubmit = () => {
         addSuggestion(this.state.name,this.state.comment);
         alert('Se ha añadido una sugerencia');
      };
    alertItemName = (item) => {
      alert(item.name)
      };
    render() {
       return (
    
            <View style={styles.main}>
            <Text style={styles.title}>Agregar una sugerencia</Text>
            <TextInput style={styles.itemInput} onChange={this.nameHandle} placeholder={'Titulo'}/>
            <TextInput style={styles.itemInput} onChange={this.categoryHandle} placeholder={'sugerencia'}/>
            <TouchableHighlight
               style={styles.button}
               underlayColor="white"
               onPress={this.handleSubmit}
            >
               <Text style={styles.buttonText}>Enviar</Text>
            </TouchableHighlight>
            </View>
          
       
       )
    }
 }
 export default Suggestion

 const styles = StyleSheet.create ({
   main: {
      flex: 1,
      padding: 30,
      flexDirection: 'column',
      justifyContent: 'center',
     
    },
    title: {
      marginBottom: 20,
      fontSize: 25,
      textAlign: 'center'
    },
    itemInput: {
      height: 50,
      padding: 4,
      margin:5,
      fontSize: 16,
      borderWidth: 1,
      borderRadius: 8,
      color: 'white'
    },
    itemInputArea:{
      height: 150,
      padding: 4,
      margin:5,
      fontSize: 16,
      borderWidth: 1,
  
      borderRadius: 8,
      color: 'white'
    },
    buttonText: {
      fontSize: 18,
      color: '#111',
      alignSelf: 'center'
    },
    button: {
      borderColor:'#5f25fe',
      borderWidth:2,
      borderRadius:50,
      marginTop:40,
      width:'80%',
      height:50,
      borderRadius:50,
      justifyContent:"center",
      alignItems:'center',
      flexDirection:'row',
      shadowColor: "#000", shadowOffset: { width: 2, height: 4, }, shadowOpacity: 0.2, shadowRadius: 10
    },

 })