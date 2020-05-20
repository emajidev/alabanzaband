import React, { Component } from 'react';
import { View, StyleSheet,StatusBar ,ActivityIndicator,AsyncStorage,ScrollView} from 'react-native';
import NotificationComponent from './NotificationComponent';
import GroupComponent from './GroupComponent'
import { db } from './firebase.js';

import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';


let user;
let newData

function In_Notifications(props) {
  const notifications = props.notifications;
  return(
    <View style={styles.notifications}> 
    {notifications.length > 0 ? (
    <NotificationComponent items={notifications} type_notification={'resive'} />
    ) : (
      <View style={styles.cont}>
        <Text style={{margin:10}}>No hay notificationes</Text>
        <ActivityIndicator size="large" />
      </View>
    )}
    </View>
  )
}
function Out_Notifications(props) {
  const notifications = props.notifications;
  return(
    <View style={styles.notifications}> 
  
    {notifications.length > 0 ? (
    <NotificationComponent items={notifications} type_notification={'sent'}/>
    ) : (
      <View style={styles.cont}>
        <Text style={{margin:10}}>No hay notificationes</Text>
        <ActivityIndicator size="large" />
      </View>
    )}
    </View>
  )
}
function Groups(props) {
  const notifications = props.notifications;
  return(
    <View style={styles.notifications}> 
  
    {notifications.length > 0 ? (
    <GroupComponent items={notifications} type_notification={'groups'}/>
    ) : (
      <View style={styles.cont}>
        <Text style={{margin:10}}>No hay notificationes</Text>
        <ActivityIndicator size="large" />
      </View>
    )}
    </View>
  )
}
export default class ListNotification extends Component {
  state = {
    text:'',
    
   
  };
  constructor(props){
    super(props);
    this.state={
      search: '',
      groups:[],
      notifications_recived: [],
      notifications_sent:[],

      option:'recived'

    }
  }
  getData = async () => {
    try {
      const data = await AsyncStorage.getItem('@storage_Key')
      let newData = JSON.parse(data);
      if(newData.phone !== null) {
        // value previously stored
        let recive = db.ref('/users/user'+newData.phone+'/'+'notificationsReceived' );
        recive.on('value', (snapshot,prevChildKey) => {
          let data = snapshot.val();
          if(data !== null){  
            let items = Object.values(data);
            this.setState({ notifications_recived:items });
            console.log("tamaño de notificaiones",items.length)

          }else[
            console.log("no hay notificaciones")
          ]
        });
        let groups = db.ref('/users/user'+newData.phone+'/'+'groups' );
        groups.on('value', (snapshot,prevChildKey) => {
          let data = snapshot.val();
          if(data !== null){  
            let items = Object.values(data);
            this.setState({ groups:items });
            console.log("tamaño de notificaiones",items.length)

          }else[
            console.log("no hay notificaciones")
          ]
        });
        let sent = db.ref('/users/user'+newData.phone+'/'+'notificationsSent' );
        sent.on('value', (snapshot,prevChildKey) => {
          let data = snapshot.val();
          if(data !== null){  
            let items = Object.values(data);
            this.setState({ notifications_sent:items });
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
  Groups_query = async(key_group)=>{
    try {
      const group_data  = db.ref('/users/groups/'+key_group)
      group_data.on('value',(snapshot) =>{
        let data = snapshot.val();
        if(data !== null){ 
            let group_query = Object.values(data);
            console.log("data groups",data.director)
/*             this.props.navigation.navigate('GroupNotifications',{DataGroup:group_query})
 */        }else{
            console.log("no hay grupos")
          }
      })
    }catch(e){
  }               
  }
componentDidMount() {
   this.Groups_query()
   this.getData()
   console.log("estado",this.state.option)
  }

render() {
    

    return (
      <Container>
      <Tabs>
        <Tab heading={ <TabHeading><Icon name="ios-arrow-down" /><Text>Reicibidos</Text></TabHeading>}>
          <In_Notifications notifications={this.state.notifications_recived}/>
        </Tab>
        <Tab heading={ <TabHeading><Icon name="ios-arrow-up" /><Text>Enviados</Text></TabHeading>}>
          <Out_Notifications notifications={this.state.notifications_sent}/>
        </Tab>
        <Tab heading={ <TabHeading><Icon name="md-contacts" /><Text>Grupos</Text></TabHeading>}>
          <Groups notifications={this.state.groups}/>
        </Tab>
      </Tabs>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',  
 
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      
    },
  navbar:{
    flex:.3,
    justifyContent:'center',
    alignItems:'flex-start',
    flexDirection:'row',
  },
  notifications:{
    flex:5,
    /* backgroundColor:'#f34f', */
  },
  cont:{
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  }
});