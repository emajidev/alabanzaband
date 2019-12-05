import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar ,ActivityIndicator} from 'react-native';
import ContactsComponent from './ContactsComponent';

import { db } from './firebase.js';
let phone = '04169029089'
let itemsRef = db.ref('user'+phone+'/'+'contacts' );

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

componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
      
    });
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