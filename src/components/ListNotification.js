import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar ,ActivityIndicator,AsyncStorage} from 'react-native';
import NotificationComponent from './NotificationComponent';

import { db } from './firebase.js';


export default class ListNotification extends Component {
  state = {
    text:'',
    
   
  };
  constructor(props){
    super(props);
    this.state={
      search: '',
      items: [],
    }
  }
  getData = async () => {
    try {
      const phone = await AsyncStorage.getItem('@storage_Key')
      
      if(phone !== null) {
        // value previously stored
        let itemsRef = db.ref('/users/'+phone+'/'+'notifications' );
        itemsRef.on('value', snapshot => {
          let data = snapshot.val();
          if(data !== null){  
            let items = Object.values(data);
            this.setState({ items });
            console.log("tamaño de notificaiones",items.length)
          }else[
            console.log("no hay notificaciones")
          ]
        });
      }
    } catch(e) {
      // error reading value
      console.log("error notification list",e)
    }
  }
componentDidMount() {
   this.getData()
  }

render() {
    
   
    return (
     
      <View style={styles.container}>
   
        {this.state.items.length > 0 ? (
          
          <NotificationComponent items={this.state.items} />
        ) : (
          <View style={styles.cont}>
            <Text style={{margin:10}}>No hay notificationes</Text>
            <ActivityIndicator size="large" />
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