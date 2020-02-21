import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar ,ActivityIndicator,AsyncStorage,ScrollView} from 'react-native';
import NotificationComponent from './NotificationComponent';
import HeaderFunction from './Header.js'
import { db } from './firebase.js';
import HeaderStandar from './HeaderStandar.js';

import {ThemeContext, themes} from './conext/theme-context';

import {ThemeProvider} from 'styled-components/native'
import {Container,Header} from './conext/themes/styled'
import { TouchableOpacity } from 'react-native-gesture-handler';



let user;
let newData
let modUser = db.ref('/moduser');
class Child  extends React.Component {
  render(){
     return(
       <View >
          <ThemeContext.Consumer>
             {data =>
           <ThemeProvider theme={data}>
              <HeaderStandar/>
           </ThemeProvider>
        }
           
          </ThemeContext.Consumer>
       </View>
       
     )
  }
}
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
      moduser:[],

    };
 }
 getModUser(){
  modUser.on('value', snapshot => {
    let data = snapshot.val();
    let moduser = Object.values(data);
    this.setState({ moduser });
    console.log("modo de usuario", this.state.moduser) 
  });
}
 componentDidMount() {



   this.getModUser();
  setTimeout(() => {
    console.log("temp")
    this.getData()
    }, 1000);
}
  componentWillUpdate(){
    this.getData()
  }
   getData = async () => {
    try {
      user = await AsyncStorage.getItem('@storage_Key')
      newData = JSON.parse(user);
      /* console.log("obteniendo datos",newData) */
      /* console.log(" storage ",newData.theme) */
      const valueDefault = themes.light
      if ( this.state.theme !=newData.theme){
        this.setState({theme:newData.theme ? newData.theme:valueDefault})
        return true
      }
      this.setState({theme:newData.theme ? newData.theme:valueDefault})
       }
       catch(e) {
         // error reading value
         console.log(e)
      }
   }
 

   render() {
     return (
     <ThemeContext.Provider value={{...this.state.theme}}>
       {this.props.children}
      <View style={styles.header}>
         <HeaderStandar />
      </View>
     
    </ThemeContext.Provider>   
      
      )
   }
}
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
export default class ListNotification extends Component {
  state = {
    text:'',
    
   
  };
  constructor(props){
    super(props);
    this.state={
      search: '',
      notifications_recived: [],
      notifications_sent:[],

      option:'input'

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
          var id = snapshot.key;
          if(data !== null){  
            let items = Object.values(data);
            this.setState({ notifications_recived:items });
            console.log("tamaño de notificaiones",items.length)

          }else[
            console.log("no hay notificaciones")
          ]
        });
        let sent = db.ref('/users/user'+newData.phone+'/'+'notificationsSent' );
        sent.on('value', (snapshot,prevChildKey) => {
          let data = snapshot.val();
          var id = snapshot.key;
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
componentDidMount() {
   this.getData()
   console.log("estado",this.state.option)
  }

render() {
    

    return (
     
      <View style={styles.container}>
        <View style={styles.header}>
          <Content/>   
        </View>
        <View style={styles.navbar}>
          <View style={{width:'50%'}}>
          <TouchableOpacity  
          style={styles.button}
          onPress={()=>this.setState({option:'input'})}
          >
            <Text>Recibidos</Text>
          </TouchableOpacity>
          </View>
          <View style={{width:'50%'}}>
          <TouchableOpacity  
          style={styles.button}
          onPress={()=>this.setState({option:'output'})}
          >
            <Text>Enviados</Text>
          </TouchableOpacity>
          </View>
        </View>
        {(this.state.option =='input')?(
          <In_Notifications notifications={this.state.notifications_recived}/>
        ):(
          <Out_Notifications notifications={this.state.notifications_sent}/>
        )}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    marginTop:StatusBar.currentHeight,
  
 
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