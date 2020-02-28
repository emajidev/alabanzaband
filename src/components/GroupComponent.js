import React, { Component,useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,FlatList,AsyncStorage ,StatusBar,ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import { db } from './firebase.js';
import NotificationComponent from './NotificationComponent';

class GroupComponent extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      accepted:false,
      query_key:'',
      Group_data:''
    };
  }

Groups_query = async(key_group)=>{
    try {
      const group_data  = db.ref('/users/groups/'+key_group)
      group_data.on('value',(snapshot) =>{
        let data = snapshot.val();
        if(data !== null){ 
          let notifications = Object.values(data.notifications);

            console.log("data groups",data.notifications)
            this.props.navigation.navigate('GroupNotifications',{DataGroup:notifications})
        }else{
            console.log("no hay grupos")
          }
      })
    }catch(e){
  }               
  }
render() {
  
   
    return (
      <View style={styles.content}>
          <View style={styles.container}>
                  <FlatList
                  data={this.props.items}
                  enableEmptySections={true}
                  renderItem={({item}) => (
                    <TouchableOpacity
                    onPress={()=>this.Groups_query(item.key_group)}
                    >
                        <Text style={styles.itemtext}>{item.director}</Text>
                        <Text style={styles.itemtext}>{item.key_group}</Text>
                        <Text>Banda: {item.group_name}</Text>
                    </TouchableOpacity>
               
                    
                    )}
                    /> 
                  
              </View>
            </View>
            )
        }
     
  
  }

export default withNavigation(GroupComponent);

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