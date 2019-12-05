import React from 'react';
import { StatusBar,StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import List from './List.js'
import Icon from 'react-native-vector-icons/Feather';
import ContactsIcon from 'react-native-vector-icons/AntDesign';
import {withNavigation} from 'react-navigation';


class Navbar extends React.Component{

  render() {
  return (
    <View style={styles.container}>
        <View style={styles.header} >
          <View style={styles.iconMenu}>
            
          <TouchableOpacity style={styles.btn_nav}
          onPress={() => this.props.navigation.openDrawer()}
          >
            
              <Icon 
                name='menu'
                color='#5f25fe'
                size={30}
             
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex:1, justifyContent:'flex-start'}}>
            <Text style={styles.title}> ALABANZABAND</Text>
          </View>
          <View style={styles.iconnavbar}>
       
            <TouchableOpacity style={styles.btn_nav}>
              <ContactsIcon 
                name='contacts'
                color='#5f25fe'
                onPress={() => this.props.navigation.navigate('Contacts')}
                size={25}
             
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_nav}>
              <Icon 
                name='bell'
                color='#5f25fe'
                onPress={() => this.props.navigation.navigate('ListNotification')}
                size={25}
             
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_nav}
            onPress={() => this.props.navigation.navigate('AddItem')}>
              <Icon 
                name='music'
                color='#5f25fe'
                size={25}
              />
                 <Icon 
                name='plus'
                color='#5f25fe'
                size={10}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_nav}>
              <Icon 
                name='user'
                color='#5f25fe'
                size={25}
               
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
export default withNavigation(Navbar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
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