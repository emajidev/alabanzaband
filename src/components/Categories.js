import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar ,ActivityIndicator,AsyncStorage,FlatList} from 'react-native';
import NotificationComponent from './NotificationComponent';
import GroupComponent from './GroupComponent'
import { db } from './firebase.js';
import HeaderStandar from './HeaderStandar.js';
import {ThemeContext, themes} from './conext/theme-context';
import {ThemeProvider} from 'styled-components/native'
import {TouchableOpacity} from 'react-native-gesture-handler';



let user;
let newData

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,

    };
 }
 
  componentWillUpdate(){
    this.getTheme()
  }
  componentWillMount(){
    this.getTheme()
  }
   getTheme = async () => {
    try {
      user = await AsyncStorage.getItem('@storage_Key')
      newData = JSON.parse(user);
      const valueDefault = themes.light
      if ( this.state.theme !=newData.theme){
        this.setState({theme:newData.theme ? newData.theme:valueDefault})
        return true
      }
      this.setState({theme:newData.theme ? newData.theme:valueDefault})
       }
       catch(e) {
         // error reading value
         console.log(e)
      }
   }
 

   render() {

     return (
     <ThemeContext.Provider value={{...this.state.theme}}>
       {this.props.children}
      <View style={styles.header}>
         <HeaderStandar title={'CATEGORIAS'}/>
      </View>
    </ThemeContext.Provider>   
      
      )
   }
}



export default class Categories extends Component {
  state = {
    text:'',
    
   
  };
  constructor(props){
    super(props);
    
      this.state ={
        categories : ['categoria1','categoria2','categoria2','categoria3','categoria4']
    }


    
  }
  

render() {
    

    return (
     
      <View style={styles.container}>
        <View style={styles.header}>
          <Header/>   
        </View>
       < FlatList
    data={this.state.categories}
    enableEmptySections={true}
    renderItem={({item}) => (
      <TouchableOpacity >
          <Text style={styles.itemtext}>{item}</Text>
      </TouchableOpacity>  
    )}
    />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',  
 
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      
    },
  navbar:{
    flex:.3,
    justifyContent:'center',
    alignItems:'flex-start',
    flexDirection:'row',
  },
  notifications:{
    flex:5,
    /* backgroundColor:'#f34f', */
  },
  cont:{
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  }
});