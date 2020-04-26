import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,TextInput ,FlatList,  RefreshControl,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconLike from 'react-native-vector-icons/AntDesign';
import md5 from 'md5';
import {withNavigationFocus } from 'react-navigation'

import { withGlobalContext } from '../UserContext';
import { db } from "../firebase";
import * as firebase from "firebase/app";
class FlatListChat extends Component{
    render(){
        const filtered = this.props.events
        return(
        <View style={{flex:1,width:'100%',height:'100%',position:'relative'}}>
          <FlatList
          data={filtered}
          enableEmptySections={true}
          renderItem={({item,index}) => (
                
                  <TouchableOpacity 
                  style={styles.listChat}
                  onPress={() => this.props.navigation.navigate('Chat',{item})}>
                  <View style={{paddingLeft:15, flexDirection:'row', alignItems:'center'}}>
                  {/* <Text style={{fontSize:18,paddingRight:10}}>{index+1}</Text> */}
                    <View style={{width:'15%'}}>
                    </View>
                    <View style={{width:'60%'}}>
                      <Text style={{fontSize:18}}>{item.director} epale</Text>
                    </View>
                    
                  </View>
                  
                  </TouchableOpacity>   
              
          )}
          /> 
        </View>
        )
    }
}

class ListChat extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [''] };
      }
    getDataChats = async()=>{
        const yourEmail = this.props.global.account
        console.log("yourEmail2",yourEmail)
        try {
          const events  = db.ref('/users/user'+yourEmail+'/events')
          events.on('value',(snapshot) =>{
            let data = Object.values(snapshot.val());

            if(data !== null){ 

                this.setState({events:data})
                
            }else{
                console.log("no hay eventos")
              }
          })
        }catch(e){
      }               
    }
    componentDidMount(){
        this.getDataChats()
    }
render() {
                    console.log("chat data",this.state.events)

    return (
      <View style={{flex:1,width:'100%',height:'100%',position:'relative'}}>
        {this.state.events != ''  ? (
          <FlatListChat events={this.state.events} navigation={this.props.navigation}/>

        ) : (
          <View style={styles.cont}>
            <Text style={{margin:10}}>Buscando...</Text>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    );
  }
}
export default withNavigationFocus(withGlobalContext(ListChat));


const styles = StyleSheet.create ({
    container:{
       flex:1,
       width: '100%',
       backgroundColor: '#d8fff4',
       
     
    },
  
   listChat: {
      width:'100%',
      height:80,
      borderBottomColor:'#000',
      borderBottomWidth:1,
      justifyContent:'center'
   },
})