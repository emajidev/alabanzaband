import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput ,ActivityIndicator,Platform,AsyncStorage,NetInfo,Alert,} from 'react-native';
import ItemComponent from '../components/ItemComponent';
import { db } from './firebase.js';
import { Notifications} from 'expo';
import { withNavigation } from 'react-navigation';
import * as firebase from "firebase/app";
import {AppColors}from './global'
let itemsRef = db.ref('/items');
import chordpro from './funtion/chordpro.js';
import PouchDB from 'pouchdb-react-native'

class List extends Component {
  _isMounted = false;

  state = {
    text:'',
    
   
  };
  constructor(props){
    super(props);
    this.song_DB = new PouchDB('songs')

    this.state={
      search: '',
      items: [],
      users:[],
      songsItems:[],
      query_key:'',
      notiitems:[],
      navigation: this.props.navigation,
      date:new Date().getTime() + 10000,
    }
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
    }else{
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
    try {
      const data = await AsyncStorage.getItem('@storage_Key')
      let newData = JSON.parse(data);
      if(newData.phone !== null) {
        // value previously stored
        let itemsRef = db.ref('/users/user'+newData.phone+'/'+'notificationsSent' );
        itemsRef.on('value', (snapshot) => {
          let data = snapshot.val();
          if(data !== null){  
            let items = Object.values(data);
            items.map((item, index) => {
              if(item.id!=undefined){
/*                 console.log(item.accepted)
 */                if(item.accepted == true){
                  let phoneTransmitter= item.phoneTransmitter;
                  let phoneReceiver = item.phoneReceiver;
                  let id = item.id;
    
                  this.sendNotificationRequest( phoneReceiver, ' solicitud aceptada')
                  const received = db.ref('/users/user'+phoneReceiver+'/'+'notificationsReceived/' );
                  received.child(id).update({accepted: 'accepted'});
                  this.query_key(phoneTransmitter,phoneReceiver,id,'accepted')
                   
                }
              }
            })
          }else{
            console.log("no hay notificaciones")
        }
        });
      }
    } catch(e) {
      console.log("error notification list",e)
    }
  }
  query_key= (phoneTransmitter,phoneReceive,id,status)=>{
    const itemsRef = db.ref('/users/user'+phoneTransmitter+'/'+'notificationsSent/' );
    let query = itemsRef.orderByChild('id').equalTo(id).once('value')
    query.then((snapshot)=> {
       let query_key = Object.keys(snapshot.val())[0];

       this.updateNotificationRequest(phoneTransmitter,query_key,status)
      }).catch((e)=>{
      console.log("valor no encontrado",e)
    })
  }

  updateNotificationRequest= async(phoneTransmitter,key,status)=>{
    try {
      const transmitter = db.ref('/users/user'+phoneTransmitter+'/'+'notificationsSent')
      transmitter.child(key).update({accepted: status});    
  
    }catch(e){
    }                
  }

  initialDate(){
    let currentDate = new Date()
    let day = currentDate.getDate() <10 ? '0'+currentDate.getDate():currentDate.getDate();
    let month = (currentDate.getMonth() + 1 ) < 10 ? ('0'+(currentDate.getMonth() + 1)) :currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours() < 10? '0'+currentDate.getHours():currentDate.getHours();
    let min = currentDate.getMinutes() <10 ? '0'+currentDate.getMinutes():currentDate.getMinutes();
    let today = ((year+'-'+month+'-'+day+'T'+hours+':'+min).toString());
    let todayNewDate =  new Date(today);
    let fechaInicio = new Date(todayNewDate).getTime();
    return fechaInicio;
  }

  nofiticationsBd = async () => {
    try {
      const data = await AsyncStorage.getItem('@storage_Key')
      let newData = JSON.parse(data);
      console.log("este es mi telefono",newData.phone)
      if(newData.phone !== null) {
          let notifRef = db.ref('/users/user'+newData.phone+'/'+'notificationsReceived' );
          try{
            notifRef.on('value', snapshot => {
              let notidata = snapshot.val();
              if(notidata !== null){
                let notiitems = Object.values(notidata);
                let fechaInicio = this.initialDate()
                notiitems.map((item, index) => {
                  let fechaFin = item.time
                  let dif = fechaFin - fechaInicio
  /*              this.sendNotificationImmediately(item.sender, item.coment);
  */             /* console.log("contacto",item.phoneSender, "id",item.id) */
                  if(item.id!=undefined){
                    console.log("to sent",item.toSent)

                    if (item.toSent=='yes'){
                      let phoneReceiver= item.phoneReceiver;
                      console.log("el que rescive", item.phoneReceiver)
                      let id = item.id
                      //notificacion cuando se recibe un evento
                      this.sendNotificationImmediately(item.phoneTransmitter,item.coment);
                      const received = db.ref('/users/user'+phoneReceiver+'/'+'notificationsReceived')
                      //actualiza el estado a enviado
                      received.child(id).update({toSent: 'sended'})
                    }
                    // si el evento ya fue aceptado entonces inicia el evento programado
                    if(item.accepted == "accepted"){
                      if(dif >= 300000){
                        /* console.log("Enviado mayor a 5min") */
                        let scheduleNotification = this.scheduleNotification( item.sender, item.coment,dif);
                        scheduleNotification.then(()=>{
/*                           this.updateNotificationRequest(item.phoneReceiver,item.id,"complete")
 */                        })
                      }else{
                        /* console.log("no se envio por el tiempo") */
                      }
                    } 
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
  nofiticationsGroups = async () => {
    try {
      const data = await AsyncStorage.getItem('@storage_Key')
      let newData = JSON.parse(data);
      if(newData.phone !== null) {
          let groups = db.ref('/users/user'+newData.phone+'/'+'groups' );
          try{
            groups.on('value', snapshot => {
              let groupsData = snapshot.val();
              if(groupsData !== null){
                let groupItems = Object.values(groupsData);
               
                groupItems.map((item, index) => {
                    if (item.toSent=='yes'){
                      let key = Object.keys(snapshot.val())[index];
                      //notificacion cuando se recibe un evento
                      this.sendNotificationImmediately(item.director,"grupo");
                      //actualiza el estado a enviado
                      groups.child(key).update({toSent: 'sended'})
                    }else{
                      let ref = db.ref('/users/groups/'+item.key_group+'/notifications' );

                      ref.limitToLast(1).startAt(1).on("child_added", (snapshot) =>{
                        let newPost = snapshot.val();
                        if(newPost !=null){
                        let  post =  Object.values(newPost);
                       
                        console.log("Author: " + item.group_name);
                        console.log("Title: " + post.name);
                        this.sendNotificationImmediately(item.group_name,"Nueva notificacion");
                      }
                      })

                    }
                    // si el evento ya fue aceptado entonces inicia el evento programado
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

  updateNotification = (phoneReceiver,phoneTransmitter,id,status)=>{
      console.log("estado accepted" )
      const ref = db.ref('/users/user'+phoneReceiver+'/'+'notificationsReceived')
      ref.child(id).update({toSent: status})      
  }



  /* notificaciones programadas  */
  scheduleNotification = async (sender,comment,dif) => {

console.log("notificacion request")
  };
  /* notificaciones inmediatas   */
  sendNotificationRequest = async (sender,msg) => {
    console.log('solicitud aceptada');

    notificationId = await Notifications.presentLocalNotificationAsync(
    {
      title:sender + msg,
      android: {
        channelId: 'notifications-messages',
        vibrate: [0, 250, 250, 250],
        color: '#FF3',
      },
  });
  };
  /* notificaciones inmediatas   */
  sendNotificationImmediately = async (sender,comment) => {
    console.log("llege")

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
  query_groups_notifications(){
    ref.on("child_added", function(snapshot, prevChildKey) {
      var newPost = snapshot.val();
      console.log("Author: " + newPost.author);
      console.log("Title: " + newPost.title);
      console.log("Previous Post ID: " + prevChildKey);
    });
  }

  componentDidMount=async()=>{
    this._isMounted = true;

  /*   var letra = "Its only to [Am7]test my [F]program to [C/E]see if it [F]worksI [Dm7]hope it [F]does or [Gsus4]else Ill [G]be [C]sad."
    var output = chordpro.to_txt(letra.toString());
    console.log(output); */
    if(this._isMounted){
      this.songsBd()

 
      this.nofiticationsBd();
      this.nofiticationsGroups();
      this.notifcationRequest();
      this.chanelAndroid();
   
    
      console.log("inicio session")
      firebase.auth().onAuthStateChanged(function(user){
        if(user){
          let email=user.email
          console.log("user conectado",email)
        }
      });
    }
  }
  songsBd(){
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
/*       console.log("datos de cancaciones", items)
 */      if(items!=undefined){
        let create_local_DB = new Promise((resolve,reject)=>{
          resolve(
            this.Initial_db(),
            this.creacte_db(items)
          )
        })
        create_local_DB.then(()=>{
          this.get_localdb()
        }
        ).catch((error)=>{
          console.log("error en localdb",error)
        })
        
      }
      
      
    });
  }
  componentWillUnmount(){
      this._isMounted = false;
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
  Initial_db=async(data)=>{
    try {
      console.log("initial db")
      var response = await  this.song_DB.put({
        _id: 'songs',
        data: data
      });
    } catch (err) {
      console.log(err);
    }
  }
  creacte_db=async(data)=>{
    try {
      console.log("actualizando datos en local db")
      var doc = await  this.song_DB.get('songs');
      var response = await  this.song_DB.put({
        _id: 'songs',
        _rev: doc._rev,
        data: data
      });
    } catch (err) {
      console.log(err);
    }
  }
  update_localDB=async(data)=>{
    try {
      console.log("actualizando data")
      let doc = await this.song_DB.get('songs');
      let response = await this.song_DB.put({
        _id: 'songs',
        _rev: doc._rev,
        data: "hola"
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
/*     console.log("obtenindo datos",doc)
 */  }
render() {
    return (
      <View style={{flex:1,width:'100%',height:'100%',position:'relative'}}>
   
        {this.state.items.length > 0 ? (
          

          <ItemComponent />
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
    
    

  },
  cont:{
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  }
});