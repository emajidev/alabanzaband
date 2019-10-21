import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,ScrollView,Alert,TextInput,TouchableHighlight} from 'react-native'
import { db } from './db';

let addItem = item => {
   db.ref('/items').push({
    name: item
  })
};
class List extends Component {
      state = {
         name: ''
      };
   
   handleChange = e => {
         this.setState({
         name: e.nativeEvent.text
         });
      };
      handleSubmit = () => {
         addItem(this.state.name);
         alert('Item saved successfully');
      };
    alertItemName = (item) => {
      alert(item.name)
      };
    render() {
       return (
    
            <View style={styles.main}>
            <Text style={styles.title}>Add Item</Text>
            <TextInput style={styles.itemInput} onChange={this.handleChange} />
            <TouchableHighlight
               style={styles.button}
               underlayColor="white"
               onPress={this.handleSubmit}
            >
               <Text style={styles.buttonText}>Add</Text>
            </TouchableHighlight>
            </View>
          
       
       )
    }
 }
 export default List

 const styles = StyleSheet.create ({
   main: {
      flex: 1,
      padding: 30,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#6565fc'
    },
    title: {
      marginBottom: 20,
      fontSize: 25,
      textAlign: 'center'
    },
    itemInput: {
      height: 50,
      padding: 4,
      marginRight: 5,
      fontSize: 23,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 8,
      color: 'white'
    },
    buttonText: {
      fontSize: 18,
      color: '#111',
      alignSelf: 'center'
    },
    button: {
      height: 45,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
     container:{
        flex:1,
        width: '100%',
        backgroundColor: '#d8fff4',
        
      
     },
    TouchableOpacity: {
       padding: 10,
       marginTop: 3,
       backgroundColor: '#d8ff41',
       alignItems:'center'
    },

    songs: {
       color: '#4f2f3c',
       

       
    }
 })