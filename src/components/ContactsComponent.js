import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,TextInput } from 'react-native';
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

render() {
  
 
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          return (
              <View style={styles.boxContact} >
                <Icon 
                name='md-contact'
                color='#5f25fe'
                size={40}
                />
                <Text style={styles.itemtext} >{item.name} </Text>
                
              </View>
              
         
          );
        })}
      </View>
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
      height:50,width:'80%'
    },
    itemtext:{fontSize:20,marginLeft:5},
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