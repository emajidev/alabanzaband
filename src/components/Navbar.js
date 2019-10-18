import React from 'react';
import { StyleSheet, Text, View, Button, Alert,Platform, ScrollView} from 'react-native';
import List from './List.js'

export default class Navbar extends React.Component{

  render() {
  return (
    <View style={styles.container}>
        <View style={styles.header} >
          <View style={styles.iconMenu}>
          <Button
            title="Press me"  
           
            color="#841584"  
            />
          </View>
          <View>
            <Text style={styles.title}> Alabanza Band</Text>
          </View>
          <View style={styles.iconnavbar}>
            <Button
             
              title="A"  
              color="#841584"
            />
            <Button
             
              title="B"  
              color="#841584"
            />
            <Button
              
              title="C"  
              color="#841584"
            />
            <Button
              
              title="D"  
              color="#841584"
            />
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
  red:{
    
  },
  iconMenu:{
    width: 50, 
    height: 50,
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
    fontSize:16,
   
  },
});