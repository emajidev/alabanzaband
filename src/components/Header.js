import React from 'react';
import { StatusBar,StyleSheet, Text, View} from 'react-native';

import {ThemeContext, themes} from './conext/theme-context';

import {ThemeProvider} from 'styled-components/native'
import {Header} from './conext/themes/styled'

function HeaderFunction(){
  return (
    <ThemeContext.Consumer>
        {data =>
 
     <ThemeProvider theme={data}>
       <Header>
         <View style={{ flex:1}}>
           <Text style={navbarStyles.title}> Notificaciones</Text>
         </View>
       </Header>
     </ThemeProvider>
    }
      
      </ThemeContext.Consumer>
  
  );
}


export default HeaderFunction;

const navbarStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
    backgroundColor: '#fff',
    justifyContent:'flex-start',
    alignItems:'center',
    width:'100%',
    height:'100%'

   
  },
  header:{
    flex: .5,
    flexDirection:'row',
    backgroundColor: '#f43',
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
    textAlign:'center'
   
  },
});