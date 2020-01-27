import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput ,ActivityIndicator,Platform,AsyncStorage, BackHandler,
  ToastAndroid,
  Alert,} from 'react-native';
import ItemComponent from '../components/ItemComponent';
import { db } from './firebase.js';
import { Notifications} from 'expo';
import { withNavigation } from 'react-navigation';
import * as firebase from "firebase/app";
import {AppColors}from './global'
let itemsRef = db.ref('/items');

import chordpro from './funtion/chordpro.js';


class List extends Component {
  state = {
    text:'',
    
   
  };
  constructor(props){
    super(props);

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
        /* console.log("llego data",newData.phone) */
         // notificaiones que estan en la bd
        let notifRef = db.ref('/users/'+newData.phone+'/'+'notifications' );
        try{
          notifRef.on('value', snapshot => {
            let notidata = snapshot.val();
            if(notidata !== null){
              let notiitems = Object.values(notidata);
              this.setState({ notiitems });
              /* console.log("tamaño de notificaiones",notiitems.length) */
              // itera la lista de notificaciones extraidas de la bd firebase //
              var currentDate = new Date()
              var day = currentDate.getDate() <10 ? '0'+currentDate.getDate():currentDate.getDate();
              var month = (currentDate.getMonth() + 1 ) < 10 ? ('0'+(currentDate.getMonth() + 1)) :currentDate.getMonth() + 1;
              var year = currentDate.getFullYear()
              var hours=currentDate.getHours() < 10? '0'+currentDate.getHours():currentDate.getHours();
              var min = currentDate.getMinutes() <10 ? '0'+currentDate.getMinutes():currentDate.getMinutes();
              var today = ((year+'-'+month+'-'+day+'T'+hours+':'+min).toString());
              var todayNewDate =  new Date(today)
              let fechaInicio= new Date(todayNewDate).getTime()

              notiitems.map((item, index) => {
                  
                
                let fechaFin = item.time
                let dif = fechaFin - fechaInicio
/*                 this.sendNotificationImmediately(item.sender, item.coment);
 */                
                console.log("diferencia",dif );
                if(dif >= 300000){
                  /* send notification  */
                  console.log("Enviado mayor a 5min")
                  this.scheduleNotification( item.sender, item.coment,dif);
                }else{
                  console.log("no se envio por el tiempo")
                }
       
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
scheduleNotification = async (sender,comment,dif) => {
  /* let fechaInicio = new Date('2020-01-06T20:20').getTime() */
/*    1578356779815       1578356933562
      1578356779815       1578342000000 */


 

 notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "Enviado por :" +sender,
      body: comment,
      android: {
        channelId: 'notifications-messages',
        vibrate: [0, 250, 250, 250],
        color: '#FF0000'
      }
    },
    {
     
      time:new Date().getTime()+ dif ,
    },
  );
  

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
  var letra = "Its only to [Am7]test my [F]program to [C/E]see if it [F]worksI [Dm7]hope it [F]does or [Gsus4]else Ill [G]be [C]sad."
  var output = chordpro.to_txt(letra.toString());
  console.log(output);
  Alert.alert(output)
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

/* componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
} */

/* handleBackButton() {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);

    return true;
} */
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