import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar ,ActivityIndicator,AsyncStorage,ScrollView} from 'react-native';
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
      const data = await AsyncStorage.getItem('@storage_Key')
      let newData = JSON.parse(data);
      if(newData.phone !== null) {
        // value previously stored
        let itemsRef = db.ref('/users/'+newData.phone+'/'+'notifications' );
        itemsRef.on('value', (snapshot,prevChildKey) => {
          let data = snapshot.val();
          var id = snapshot.key;
          if(data !== null){  
            let items = Object.values(data);
            this.setState({ items });
            console.log("tamaño de notificaiones",items.length)
            console.log("unique id " + id);

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
        <Text>Notificaciones</Text>
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