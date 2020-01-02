import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput ,ActivityIndicator,Platform,AsyncStorage, BackHandler,
  ToastAndroid,} from 'react-native';
import ItemComponent from '../components/ItemComponent';
import { db } from './firebase.js';
import { Notifications} from 'expo';
import { withNavigation } from 'react-navigation';
import * as firebase from "firebase/app";
import {AppColors}from './global'
let itemsRef = db.ref('/items');


class List extends Component {
  state = {
    text:'',
    
   
  };
  constructor(props){
    super(props);
    console.log("variable global",AppColors.componentDidMount)

    this.getNavigationParams = this.getNavigationParams.bind(this)
    this.state={
      search: '',
      items: [],
      users:[],
      notiitems:[],
      navigation: this.props.navigation,
      date:new Date().getTime() + 10000,
    }
  }

nofiticationsBd = async () => {
  try {
    const data = await AsyncStorage.getItem('@storage_Key')
    let newData = JSON.parse(data);
    if(newData.phone !== null) {
      // value previously stored
        /* console.log("llego data",newData.phone) */
        let notifRef = db.ref('/users/'+newData.phone+'/'+'notifications' );
        try{
          notifRef.on('value', snapshot => {
            let notidata = snapshot.val();
            if(notidata !== null){
              let notiitems = Object.values(notidata);
              this.setState({ notiitems });
              /* console.log("tamaño de notificaiones",notiitems.length) */
              notiitems.map((item, index) => {
              console.log("id",index)
              this.sendNotificationImmediately(item.sender, item.coment);
              this.scheduleNotification(this.state.date);
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
    /* console.log("base de datos", this.state.items) */
  });
}
/* notificaciones programadas  */
scheduleNotification = async (datecurrent) => {
  let notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "notificacion programada",
      body: 'Wow, I can show up even when app is closed',
      android: {
        channelId: 'notifications-messages',
        vibrate: [0, 250, 250, 250],
        color: '#FF0000'
      }
    },
    {
      repeat: 'minute',
      time: new Date().getTime() + 10000,
    },
  );
  /* console.log(notificationId); */
};
/* notificaciones inmediatas  */
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
  /* console.log(notificationId); */ // can be saved in AsyncStorage or send to server
  };
chanelAndroid=() => {
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
      /* console.log("llego data",value) */
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
   ;
  }
getNavigationParams=() => {
  const {navegar} =this.props.navigation.getParam('name', 'Peter');


    
    return console.log("parametros de nav",navegar)
  }
componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

handleBackButton() {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);

    return true;
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
          
          <ItemComponent items={this.state.items}  />
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
export default withNavigation(List);

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