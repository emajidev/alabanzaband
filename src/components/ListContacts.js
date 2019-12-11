import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar ,AsyncStorage} from 'react-native';
import ContactsComponent from './ContactsComponent';

import { db } from './firebase.js';


export default class ListContacts extends Component {
  state = {
    text:'',
    
   
  };
  constructor(props){
    super(props);
    this.state={
      items: [],
    }
  }
  getData = async () => {
    try {
      const phone = await AsyncStorage.getItem('@storage_Key')
     
      
      if(phone !== null) {
        // value previously stored
        let itemsRef = db.ref('/users/'+phone+'/'+'contacts' );
        itemsRef.on('value', snapshot => {
          try{
            let data = snapshot.val();
            let items = Object.values(data);
            this.setState({ items });
          }catch(e){
            console.log("error en list constactos",e)
          }
         
          
        });
      }
    } catch(e) {
      // error reading value
      console.log("error en list constactos",e)
    }
  }
componentDidMount() {
    this.getData()
   
  }

render() {
    
   
    return (
     
      <View style={styles.container}>
   
        {this.state.items.length > 0 ? (
          
          <ContactsComponent items={this.state.items} />
        ) : (
          <View style={styles.cont}>
            <Text style={{margin:10}}>No hay contactos</Text>
           
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop:StatusBar.currentHeight+15,

  },
  cont:{
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  }
});