import React, { Component,useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,FlatList,AsyncStorage ,StatusBar,ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import { db } from './firebase.js';
import { useNavigation } from '@react-navigation/native';


  class GroupRequest extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        accepted:'waiting',
        query_key:'',
        Group_data:'',
        item:this.props.item

      };

    }
    componentDidMount(){
        console.log(" mis props",this.state.item)
    }
    query=async(key_group,id)=>{
        try {
            const data = await AsyncStorage.getItem('@storage_Key')
            var newData = JSON.parse(data);
            
            const group_data  = db.ref('/users/groups/'+key_group+'/notifications/'+id +'/members/'+newData.phone)
            group_data.on('value',(snapshot)=>{
                let data = snapshot.val()
                console.log("status de la notificacion",data)
            })
          }catch(e){
        }    
    }
    Groups_query = async(key_group,id)=>{
      try {
        const data = await AsyncStorage.getItem('@storage_Key')
        var newData = JSON.parse(data);
        
        const group_data  = db.ref('/users/groups/'+key_group+'/notifications/'+id +'/members/'+newData.phone)
        group_data.push({
            status:"accept"
        })
      }catch(e){
    }               
    }
    handleChange(status){
       
        this.setState({accepted:status})
    }
  render(){
    let item = this.props.item

    return(
      <View style={styles.notifStyle}>
    {this.state.accepted =="accepted"  ? (
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ContentItem',{item})}
            >
            <Text style={styles.itemtext}>Titulo: {item.name}</Text>
            <Text style={styles.itemtext}>Categoria: {item.category}</Text>
            <Text style={styles.itemtext}>Comentario: {item.coment}</Text>
            </TouchableOpacity>
    ) : (
    <View style={styles.confirmation}>
      <Text style={{color:'#10cb42'}}>¿ Acepta la invitacion ?</Text>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity
        onPress={()=>{
            this.Groups_query(item.key_group,item.id)
        }}
        style={styles.btn_accept}
        >
          <Text style={{color:'#fff'}}>si</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{this.handleChange("denied")}}
        style={styles.btn_denied}
        >
          <Text style={{color:'#10cb42'}}>no</Text>
        </TouchableOpacity>
      </View> 
    </View>
    )}
      </View>
    )
  }
    }
export default withNavigation(GroupRequest);

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