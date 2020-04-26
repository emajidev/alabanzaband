import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,ScrollView,Alert,TextInput,TouchableHighlight} from 'react-native'
import { db } from './firebase.js';

let addItem = (name,category,lyrics) => {
   let postSong = db.ref('/songs')
   postSong.push({
    name: name,
    category:category,
    lyrics:lyrics,
    likes:0,
    visits:0
  })
  .then((snapshot) => {
   //buzon de envio 
   postSong.child(snapshot.key).update({ "id": snapshot.key })

});
};
class AddItem extends React.Component {
      state = {
         name: '',
         category:'',
         lyrics:''
      };
   
      nameHandle = e => {
         this.setState({
         name: e.nativeEvent.text
         });
      };
      categoryHandle = e => {
         this.setState({
         category: e.nativeEvent.text
         });
      };
      lyricsHandle = e => {
         this.setState({
         lyrics: e.nativeEvent.text
         });
      };
      handleSubmit = () => {
         addItem(this.state.name,this.state.category,this.state.lyrics);
         alert('Se ha añadido una cancion');
      };
    alertItemName = (item) => {
      alert(item.name)
      };
    render() {
       return (
    
            <View style={styles.main}>
            <Text style={styles.title}>Agregar una cancion</Text>
            <TextInput style={styles.itemInput} onChange={this.nameHandle} placeholder={'Titulo'}/>
            <TextInput style={styles.itemInput} onChange={this.categoryHandle} placeholder={'Categoria'}/>
            <TextInput style={styles.itemInputArea} onChange={this.lyricsHandle} placeholder={'cancion'}/>
            <TouchableHighlight
               style={styles.button}
               underlayColor="white"
               onPress={this.handleSubmit}
            >
               <Text style={styles.buttonText}>Agregar</Text>
            </TouchableHighlight>
            </View>
          
       
       )
    }
 }
 export default AddItem

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