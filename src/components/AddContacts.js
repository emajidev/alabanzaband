import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,ScrollView,AsyncStorage,TextInput,TouchableHighlight} from 'react-native'
import { db } from './firebase.js';

let addItem = async (name,phoneContact) => {
   try {
      const data = await AsyncStorage.getItem('@storage_Key')
      let newData = JSON.parse(data);
      if(newData.phone !== null) {
        // value previously stored
        db.ref('/users/'+newData.phone+'/'+'contacts').push({
         name: name,
         phoneContact:phoneContact
       })
      }
    } catch(e) {
      // error reading value
    }
    

 };
 class AddContacts extends React.Component {
       state = {
          name: '',
          phoneContact:''
       };
    
    nameContact = e => {
          this.setState({
          name: e.nativeEvent.text,
          });
        }
    phoneContact = e => {
          this.setState({
          phoneContact: e.nativeEvent.text
          });    
       };
       handleSubmit = () => {
          addItem(this.state.name , this.state.phoneContact);
          alert('Notification saved successfully');
         
       };
     alertItemName = (item) => {
       alert(item.name)
       };
     render() {
        return (
     
             <View style={styles.container}>
             <Text style={styles.title}>Añadir Contactos</Text>
             <TextInput style={styles.itemInput} 
             onChange={this.nameContact} 
             placeholder='Nombre' />
             <TextInput style={styles.itemInput} 
             onChange={this.phoneContact} 
             placeholder='Telefono' />     
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
  export default AddContacts

 const styles = StyleSheet.create ({

     container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
        
      
     },
     itemInput:{
         borderWidth:1,
         borderColor:'#000',
         borderRadius:10,
         width:'80%',
         height:40,
         margin:20,
         padding:10
     }
 })