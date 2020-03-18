import React from 'react';
import { StatusBar,StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import ListContacts from './ListContacts.js'
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContactsIcon from 'react-native-vector-icons/AntDesign';
import {withNavigation} from 'react-navigation';


class Contacts extends React.Component{

  render() {
  return (
    <View style={styles.container}>
        <View style={styles.header} >
         
          <View style={{ flex:1, justifyContent:'flex-start'}}>
            <Text style={styles.title}> Contactos</Text>
          </View>
          <View style={styles.iconnavbar}>
       
            <TouchableOpacity style={styles.btn_nav}>
              <Icon 
                name='person-add'
                color='#000'
                onPress={() => this.props.navigation.navigate('AddContacts')}
                size={30}
             
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_nav}>
              <Icon 
                name='group-add'
                color='#000'
                onPress={() => this.props.navigation.navigate('AddGroups')}
                size={40}
             
              />
            </TouchableOpacity>
           
          </View>
        </View>
        <View style={styles.body} >
          <ListContacts/>
        </View>
      
    </View>
  );
  }
}
export default withNavigation(Contacts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    flex: .5,
    flexDirection:'row',
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
    margin:10
   
  },
});