import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,TextInput ,StatusBar,ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import { db } from './firebase.js';

class NotificationComponent extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };
  state = {
    search:'',
    typeOfSearch:'name',
    accepted:false
  };
  constructor(props) {
    super(props);
    this.state = {
      accepted:false
    };
  }
  updateNotification = async(phoneSenderToRequest,id,status)=>{
      try {
        console.log("estado accepted" )
        const ref = db.ref('/users/user'+phoneSenderToRequest+'/'+'notifications')
        ref.child(id).update({accepted: status,})
        
        
      }catch(e){
      }               
    
  }

render() {
  
   
    return (
      <ScrollView contentContainerStyle={styles.contcontainer}>
      <View style={styles.content}>
       
        
        {this.props.items.map((item, index) => {
/*         console.log("notificaciones",item)
 */          return (
              <View key={index} style={styles.container}>
                {item.accepted =="complete"  ? (
                  <View style={styles.notifStyle}>
                    <Text style={styles.itemtext} >{item.name} </Text>
                   <Text style={styles.itemtext} >{item.coment} </Text>
                  </View>
                ): (
                  <View style={styles.confirmation}>
                    <Text style={{color:'#10cb42'}}>¿ Acepta la invitacion de {item.sender} ?</Text>
                    <View style={{flexDirection:'row'}}>
                      <TouchableOpacity
                      onPress={()=>this.updateNotification(item.phoneSender,item.id,true)}
                      style={styles.btn_accept}
                      >
                        <Text style={{color:'#fff'}}>si</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={()=>this.updateNotification(item.phoneSender,item.id,false)}
                      style={styles.btn_denied}
                      >
                        <Text style={{color:'#10cb42'}}>no</Text>
                      </TouchableOpacity>
                    </View>
             
                 
                  </View>
                )}
               
              </View>
         
          );
        })}
     
      </View>
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