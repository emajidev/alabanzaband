import React, { Component,useState } from 'react';
import { View,StyleSheet,TouchableOpacity,AsyncStorage ,StatusBar,ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import { db } from './firebase.js';
import { Container, Header,SwipeRow, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

class NotificationComponent extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    type_notification:PropTypes.string.isRequired
  };
  state = {
    search:'',
    typeOfSearch:'name',
    accepted:false
  };
  constructor(props) {
    super(props);
    this.state = {
      accepted:false,
      query_key:''
    };
  }
 
  updateNotification = async(phoneTransmitter,id,status)=>{
      try {
        console.log("estado accepted" )
        const transmitter = db.ref('/users/user'+phoneTransmitter+'/'+'notificationsSent')
        transmitter.child(id).update({accepted: status});
      }catch(e){
    }               
  }
  updateNotificationReceiver = async(idCurrenUserNotif,status)=>{
    try {
      const data = await AsyncStorage.getItem('@storage_Key')
      let newData = JSON.parse(data);
      const receiver  = db.ref('/users/user'+newData.phone+'/'+'notificationsReceived')
      receiver.child(idCurrenUserNotif).update({accepted: status});
    }catch(e){
  }               
}
  change_status= (phoneTransmitter,id,status)=>{
    const itemsRef = db.ref('/users/user'+phoneTransmitter+'/'+'notificationsSent/' );
    let query = itemsRef.orderByChild('id').equalTo(id).once('value')
    query.then((snapshot)=> {
      let query_key = Object.keys(snapshot.val())[0];
      console.log("key",query_key,phoneTransmitter)
      this.updateNotification(phoneTransmitter,query_key,status)
      this.updateNotificationReceiver(id,status)
    }).catch((e)=>{
      console.log("valor no encontrado",e)
    })
  }

render() {
  
   
    return (
      <ScrollView contentContainerStyle={styles.contcontainer}>
      <Container>
      <Content>
        
        {this.props.items.map((item, index) => {
/*         console.log("notificaciones",item)
 */          return (
          <Content key={index}>
            {item.accepted =="complete" ||  item.accepted =="accepted" ||item.accepted ==true   || this.props.type_notification=='sent'? (
           <List>
           <ListItem thumbnail>
              <Body>
                <Text style={styles.itemtext} >{item.name} </Text>
              <Text style={styles.itemtext} >{item.coment} </Text>
              <Text style={styles.itemtext} >{item.accepted} </Text>
              </Body>
              <Right>
              <Button transparent>
                <Text>Ver</Text>
              </Button>
            </Right>
            </ListItem>
            </List>

            ): (
             <Content scrollEnabled={false}>
             <SwipeRow
               leftOpenValue={75}
               rightOpenValue={-75}
               left={
                 <Button success onPress={() =>this.change_status(item.phoneTransmitter,item.id,true)}>
                   <Icon active name="add" />
                 </Button>
               }
               body={
                 <View>
                   <Text>¿ Acepta la invitacion de {item.sender} ?</Text>
                 </View>
               }
               right={
                 <Button danger onPress={()=>this.change_status(item.phoneTransmitter,item.id,false)}>
                   <Icon active name="trash" />
                 </Button>
               }
             />
           </Content>

          )}
          </Content>

        )})}
           
     
      </Content>
      </Container>
      </ScrollView>
    );
  }
}
export default withNavigation(NotificationComponent);

const styles = StyleSheet.create({
    
  header:{
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content:{
    flex: 6,
    width:'100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  container: {
      width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  notifStyle:{
    borderColor:'#5f25fe',
    borderBottomWidth:1,
    borderRadius:10,
    paddingLeft:20,
    paddingBottom:30,
    marginBottom:5,
    width:'100%',
  },
  confirmation:{
    borderColor:'#10cb42',
    borderWidth:1,
    borderRadius:10,

    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
    TextInput: {
      flexDirection: 'row',
      
     
      marginTop:20,
      marginBottom:20,
      width:'80%'
    },
    bg:{
      justifyContent: 'center',
      alignItems: 'center',
      width:250,
      height:50,
      marginBottom:100,
    },
    mg:{
      marginTop:2
    },
   
    borderBox:{
     
      justifyContent: 'center',
      alignItems: 'center',
      width:'80%',
      borderRadius:10,
      shadowColor: "#000", shadowOffset: { width: 2, height: 4, }, shadowOpacity: 0.2, shadowRadius: 10
     
    },
    btn_sesion:{
      backgroundColor:'#10cb42',
      marginTop:20,
      width:'80%',
      height:50,
      justifyContent:"center",
      alignItems:'center',
      
    },
    btn_facebook:{
      backgroundColor:'#235e86',
      marginTop:40,
      width:'80%',
      height:50,
      justifyContent:"center",
      alignItems:'center',
      flexDirection:'row'
  
    },
    btn_accept:{
      backgroundColor:'#10cb42',
      width:30,
      height:30,
      borderRadius:5,
      margin:10,
      justifyContent:"center",
      alignItems:'center',
      
    },
    btn_denied:{
      
      borderColor:'#10cb42',
      borderWidth:1,
      borderRadius:50,
      width:30,
      height:30,
      borderRadius:5,
      margin:10,
      justifyContent:"center",
      alignItems:'center',
    },
});