//This is an example code for React Native Swipe Down  to Refresh ListView Using RefreshControl//
import React, { Component } from 'react';
//import react in our code.

import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Alert,
  RefreshControl,
  Platform,AsyncStorage,NetInfo
} from 'react-native';
//import all the components we are going to use.
import ItemComponent from '../components/ItemComponent';
import { db } from './firebase.js';
import { Notifications} from 'expo';
import { withNavigation } from 'react-navigation';
import * as firebase from "firebase/app";
import {AppColors}from './global'
let itemsRef = db.ref('/items');
import chordpro from './funtion/chordpro.js';
import PouchDB from 'pouchdb-react-native'
export default class Project extends Component {
  constructor(props) {
    super(props);
    //True to show the loader
    this.song_DB = new PouchDB('songs')
    this.state={
      search: '',
      items: [],
      users:[],
      notiitems:[],
      songsItems:[],
      navigation: this.props.navigation,
      date:new Date().getTime() + 10000,
      refreshing: true
    }
  
    //Running the getData Service for the first time
    this.GetData();
  }
  CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          Alert.alert("You are online!");
        } else {
          Alert.alert("You are offline!");
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
    }
  };

  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );

    if (isConnected === false) {
      Alert.alert("You are offline!");
    } else {
      Alert.alert("You are online!");
    }
  };
notifcationRequest = async () => {
  console.log("respuesta de notificacion")
  
}


nofiticationsBd = async () => {

 
 
  try {
    const data = await AsyncStorage.getItem('@storage_Key')
    let newData = JSON.parse(data);
    if(newData.phone !== null) {
        /* console.log("llego data",newData.phone) */
         // notificaiones que estan en la bd
        let notifRef = db.ref('/users/'+newData.phone+'/'+'notifications' );
        /* console.log("referencia",notifRef) */
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
                

/*              this.sendNotificationImmediately(item.sender, item.coment);
 */             /* console.log("contacto",item.phoneSender, "id",item.id) */
               
                if (item.toSent=='yes'){
                  if(item.id!=undefined){
                   
                    let promese = this.sendNotificationImmediately(item.sender,item.coment)
                    promese.then(()=>{
                      this.updateNotification(item.phoneSender,item.id,"no")
                    })
                  }      
                }
                /* console.log("diferencia",dif ); */
                if(dif >= 300000){
                  /* send notification  */
                  /* console.log("Enviado mayor a 5min") */
                  this.scheduleNotification( item.sender, item.coment,dif);
                }else{
                  /* console.log("no se envio por el tiempo") */
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
updateNotification = async(phoneSenderToRequest,id,status)=>{
  try {
    console.log("estado accepted" )
    const ref = db.ref('/users/user'+phoneSenderToRequest+'/'+'notifications')
    ref.child(id).update({toSent: status,})
    
    
  }catch(e){
  }               

}
songsBd(){
  itemsRef.on('value', snapshot => {
    let data = snapshot.val();
    let items = Object.values(data);
  
    
    console.log("tamaño de canciones online",items.length)
    console.log("tamaño de canciones localdb",this.state.items.length)
 
    this.setState({ items });
    this.update_localDB(this.state.items)
   

    /* console.log("base de datos", this.state.items) */
  });
}
/* notificaciones programadas  */
scheduleNotification = async (sender,comment,dif) => {

 notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "Enviado por :" +sender,
      body: comment,
      android: {
        channelId: 'notifications-messages',
        vibrate: [0, 250, 250, 250],
      }
    },
    {
      time:new Date().getTime()+ dif ,
    },
  );
  

};
/* notificaciones inmediatas   */
sendNotificationRequest = async (sender,msg,toSent,read) => {
  "respuesta de notificaciones"
  /* 
  notificationId = await Notifications.presentLocalNotificationAsync(
   {
     title:sender + msg,
     
     android: {
       channelId: 'notifications-messages',
       vibrate: [0, 250, 250, 250],
       color: '#FF3',
     },
 });
 /* console.log(notificationId); */ // can be saved in AsyncStorage or send to server */
};
/* notificaciones inmediatas   */
sendNotificationImmediately = async (sender,comment) => {
   notificationId = await Notifications.presentLocalNotificationAsync(
    {
      title:sender+ " ha enviado",
      body: comment,
      android: {
        channelId: 'notifications-messages',
        vibrate: [0, 250, 250, 250],
        color: '#FF3',
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
update_localDB=async(data)=>{


  try {
    let doc = await this.song_DB.get('songs');
    let response = await this.song_DB.put({
      _id: 'songs',
      _rev: doc._rev,
      data: data
    });
  } catch (err) {
    console.log(err);
  }
  
  
}
get_localdb=async(name)=>{


  try {
    var doc = await this.song_DB.get('songs');
  } catch (err) {
    console.log(err);
  }
  this.setState({
    songsItems:doc,
    refreshing: false,
    //Setting the data source for the list to render
    dataSource: this.state.songsItems.data
  });
  console.log("local db",this.state.songsItems);  
  
}
componentDidMount() {
 
  

/*   var letra = "Its only to [Am7]test my [F]program to [C/E]see if it [F]worksI [Dm7]hope it [F]does or [Gsus4]else Ill [G]be [C]sad."
  var output = chordpro.to_txt(letra.toString());
  console.log(output); */
  console.log("respuesta de notificaciones")


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
  GetData = () => {
    //Service to get the data from the server to render
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          refreshing: false,
          //Setting the data source for the list to render
          dataSource: this.state.songsItems.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ListViewItemSeparator = () => {
    return (
      //returning the listview item saparator view
      <View
        style={{
          height: 0.2,
          width: '90%',
          backgroundColor: '#808080',
        }}
      />
    );
  };
  onRefresh() {
    //Clear old data of the list
    this.setState({ dataSource: [] });
    //Call the Service to get the latest data
    this.get_localdb("songs")
  }
  render() {
  
    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{ flex: 1,  backgroundColor: "#C2185B", paddingTop: 20 }}>
        <Text> HErereree!</Text>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //Returning the ListView
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          enableEmptySections={true}
          renderItem={({item}) => (
            <Text
              style={styles.rowViewContainer}
              onPress={() => alert(item.id)}>
              {item.name}
            </Text>
          )}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
  },
  rowViewContainer: {
    fontSize: 20,
    padding: 10,
  },
});
