import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput ,ActivityIndicator,Platform} from 'react-native';
import ItemComponent from '../components/ItemComponent';
import { db } from './firebase.js';
import { Notifications} from 'expo';
import * as firebase from "firebase/app";

let itemsRef = db.ref('/items');
let usersRef = db.ref('/users');
let phone = '04169029089'
let notifRef = db.ref('user'+phone+'/'+'notifications' );

export default class List extends React.Component {
  state = {
    text:'',
    
   
  };
  constructor(props){
    super(props);
    this.state={
      search: '',
      items: [],
      notiitems:[]
    }
  }

nofiticationsBd(){
  notifRef.on('value', snapshot => {
    let notidata = snapshot.val();
    let notiitems = Object.values(notidata);
    this.setState({ notiitems });
    console.log("tamaño de notificaiones",notiitems.length)
    notiitems.map((item, index) => {
      console.log("id",index)
      this.sendNotificationImmediately();
    })
  });
}
songsBd(){
  itemsRef.on('value', snapshot => {
    let data = snapshot.val();
    let items = Object.values(data);
    this.setState({ items });
    console.log("base de datos", this.state.items)
  });
}
sendNotificationImmediately = async () => {
  let notificationId = await Notifications.presentLocalNotificationAsync({
    sound: 'default',
    title: 'This is crazy',
    body: 'Your mind will blow after reading this',
    android: {
      channelId: 'chat-messages',
      vibrate: [0, 250, 250, 250],
      color: '#FF0000'
    },
  });
  console.log(notificationId); // can be saved in AsyncStorage or send to server
  };
chanelAndroid() {
  // ...
  if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('chat-messages', {
        name: 'Chat messages',
        sound: true,
      });
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