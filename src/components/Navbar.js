import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import List from './List.js'
import Icon from 'react-native-vector-icons/Feather';

export default class Navbar extends React.Component{

  render() {
  return (
    <View style={styles.container}>
        <View style={styles.header} >
          <View style={styles.iconMenu}>
            
          <TouchableOpacity style={styles.btn_nav}>
              <Icon 
                name='menu'
                color='#5f25fe'
                size={25}
             
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex:1, justifyContent:'flex-start'}}>
            <Text style={styles.title}> ALABANZABAND</Text>
          </View>
          <View style={styles.iconnavbar}>
          <TouchableOpacity style={styles.btn_nav}>
              <Icon 
                name='search'
                color='#5f25fe'
                size={20}
             
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_nav}>
              <Icon 
                name='comment'
                color='#5f25fe'
                size={20}
             
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_nav}>
              <Icon 
                name='bell'
                color='#5f25fe'
                size={20}
             
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_nav}>
              <Icon 
                name='user'
                color='#5f25fe'
                size={20}
             
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body} >
          <List/>
        </View>
      
    </View>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',


   
  },
  header:{
    flex: .5,
    flexDirection:'row',
    backgroundColor: '#eee',
    justifyContent:'space-around',
    alignItems:'center' , 
   
  }, 
  btn_nav:{
    margin:8
  },
  iconMenu:{
    width: 50, 
    height: 50,
    justifyContent:'center',
    alignItems:'center'
  },

  iconnavbar:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  body:{
    flex: 5,
    backgroundColor: '#fff',
  },
 
  title: {
    color: '#777',
    fontSize:20,
   
  },
});