import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,TextInput,FlatList,RefreshControl } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';

import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

class ContactsComponent extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };
  state = {
    search:'',
    typeOfSearch:'name',
  };
  onRefresh() {
    //Clear old data of the list
    //Call the Service to get the latest data
  }
render() {
  
 
    return (
     
      <FlatList
          data={this.props.items}
          enableEmptySections={true}
          renderItem={({item,index}) => (
            <List>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={{ uri: "https://facebook.github.io/react-native/docs/assets/favicon.png" }} />
            </Left>
            <Body>
            <Text style={styles.itemtext} >{item.name} </Text>
                <Text style={styles.itemtext} >{item.userName} </Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>ver</Text>
              </Button>
            </Right>
          </ListItem>
        </List>

          )}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          /> 
        
     
     
    );
  }
}
export default withNavigation(ContactsComponent);

const styles = StyleSheet.create ({
    container:{
       flex:1,
       width: '100%',

       
     
    },
    boxContact:{
      flexDirection:'row',
      margin:15,
      height:50,width:'100%',
      borderBottomColor:'#888',
      borderBottomWidth:1
    },
    itemtext:{
      fontSize:20,marginLeft:10,
    
    },
   TouchableOpacity: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#e3e3e3',
      height:80,
      
   },


   btnfilter:{
    width:80,
    height:30,
    margin:10,
    borderRadius:20,
   
    backgroundColor:'#e3e3e3',
    justifyContent:'center',
    alignItems:'center'
    
   },
   txtFilter:{
    color:'#a8a8a8',
   }
})