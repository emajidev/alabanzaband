import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput ,ActivityIndicator,Platform,AsyncStorage} from 'react-native';
import ItemComponent from '../components/ItemComponent';
import { db } from './firebase.js';
import { Notifications} from 'expo';
import * as firebase from "firebase/app";

let itemsRef = db.ref('/items');


export default class List extends React.Component {
  state = {
    text:'',
    
   
  };
  constructor(props){
    super(props);
    this.state={
      search: '',
      items: [],
      users:[],
      notiitems:[]
    }
  }

nofiticationsBd = async () => {
  try {
    const phone = await AsyncStorage.getItem('@storage_Key')
    if(phone !== null) {
      // value previously stored
        console.log("llego data",phone)
        let notifRef = db.ref('/users/'+phone+'/'+'notifications' );
        try{
          notifRef.on('value', snapshot => {
            let notidata = snapshot.val();
            if(notidata !== null){
              let notiitems = Object.values(notidata);
              this.setState({ notiitems });
              console.log("tamaño de notificaiones",notiitems.length)
              notiitems.map((item, index) => {
              console.log("id",index)
              this.sendNotificationImmediately(item.sender, item.coment);
              })
            }else{
              console.log("no hay notificaciones")
            }
          });
        }catch(e){
          console.log("notificacions error",e)
        }
       
    
    }
  } catch(e) {
    // error reading value
    console.log("error",e)
  }
  
}
songsBd(){
  itemsRef.on('value', snapshot => {
    let data = snapshot.val();
    let items = Object.values(data);
    this.setState({ items });
    console.log("base de datos", this.state.items)
  });
}

sendNotificationImmediately = async (username,coment) => {
  let notificationId = await Notifications.presentLocalNotificationAsync({
    sound: 'default',
    title: username,
    body: coment,
    android: {
      channelId: 'notifications-messages',
      vibrate: [0, 250, 250, 250],
      color: '#FF0000'
    },
  });
  console.log(notificationId); // can be saved in AsyncStorage or send to server
  };
chanelAndroid() {
  // ...
  if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('notifications-messages', {
        name: 'notifications messages',
        sound: true,
      });
    }
  
}
getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      // value previously stored
      console.log("llego data",value)
    }
  } catch(e) {
    // error reading value
    console.log("error",e)
  }
}
componentDidMount() {
    this.songsBd()
    this.nofiticationsBd();

    this.chanelAndroid();
    
    console.log("inicio session")
    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        let email=user.email
        console.log("user conectado",email)
      }
    })
  
   console.log("users array")
   ;
  }
  filterSearch(text){
    const filterItem = items.filter(function(item){
    const itemdata=  item.name.toUpperCase()
    const textData =  text.toUpperCase()
    return itemdata.indexOf(textData) > -1
 });
 this.setState({
   text:text,
   items : this.state.items.cloneWithRows(filterItem),
 })

  }
render() {
    
   
    return (
     
      <View style={styles.container}>
   
        {this.state.items.length > 0 ? (
          
          <ItemComponent items={this.state.items} />
        ) : (
          <View style={styles.cont}>
            <Text style={{margin:10}}>Buscando canciones...</Text>
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
  },
  cont:{
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  }
});