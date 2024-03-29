import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,TextInput } from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';


class SuggestionComponent extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

render() {
  
 
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
        
          return (
              <View key={index}>
                <Text style={styles.itemtext} >{item.name} </Text>
                <Text style={styles.itemtext} >{item.comment} </Text>
              </View>
         
          );
        })}
      </View>
    );
  }
}
export default withNavigation(SuggestionComponent);

const styles = StyleSheet.create ({
    container:{
       flex:1,
       width: '100%',
       backgroundColor: '#d8fff4',
       
     
    },
   TouchableOpacity: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#e3e3e3',
      height:80,
      
   },

   songs: {
      color: '#4f2f3c',
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