import React from 'react'
import { Modal,Text, Alert,TextInput, View, TouchableOpacity,AsyncStorage,TouchableHighlight,StatusBar,StyleSheet, PanResponder } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { withNavigation } from 'react-navigation'


import {navbarStyles} from '../../styles/Styles'
import * as firebase from "firebase/app";
import { db } from '../firebase';

let userAdminState = () => {
   db.ref('/moduser').set({

    mode:'user'
  })
};

class AdminDashboard extends React.Component {
  _isMounted = false;

  constructor(props){
    super(props);
    this.state={
      inactive:true,
    }
  }
   componentWillMount(){
     this._isMounted = true;
     if (this._isMounted){
     if(this.state.inactive){
        this.timeout = setTimeout(()=>{
          this.setState({
            inactive:true
          })
          console.log("inactivo")
          userAdminState()

        },180000)// en 3 minutos cierra la sesion d admin
      }

      this._panResponder = PanResponder.create({
        onMoveShouldSetPanResponderCapture:()=>{
        clearTimeout(this.timeout);
        this.setState((state)=>{
          if(state.inactive === false) return null;
          return{
            inactive:false
          }
        })
        // temporizador 
        this.timeout = setTimeout(()=>{
          this.setState({
            inactive:true, 
          })
          userAdminState()

        },180000)
        return false;
        },
      })
    }
   }
   componentWillUnmount(){
     this._isMounted = false;
   }
   closeAdmin(){
      userAdminState()
      this.props.navigation.goBack()
    }
    render() {
        
        return (
        
        <View  /* style={[styles.modalAdminActive, this.state.inactive ? styles.inactive:styles.modalAdminInactive]}  */ {...this._panResponder.panHandlers}>
     
          <View style={{ flex:1, justifyContent:'flex-start'}}>
        <Text style={navbarStyles.title}> Bienvenido Admin</Text>
        <TouchableOpacity style={navbarStyles.btn_nav}
          onPress={() => this.props.navigation.navigate('AddItem')}>
            <Text>Agregar cancion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navbarStyles.btn_nav}
          onPress={() => this.props.navigation.navigate('Navbar')}>
            <Text>visualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navbarStyles.btn_nav}
          onPress={() => this.props.navigation.navigate('ShowSuggestion')}>
            <Text>ver recomendaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navbarStyles.btn_nav}
          onPress={()=>this.closeAdmin()}>
            <Text>salir</Text>
        </TouchableOpacity>
      </View>
  
        </View> 
        )
      }
    }
    export default withNavigation(AdminDashboard)
  
    const styles = StyleSheet.create({
      container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:StatusBar.currentHeight+15,  
     },
     theme1:{
      flex:1,
      justifyContent:'flex-start',
      alignItems:'center',
      marginTop:StatusBar.currentHeight+15,  
        width:'100%',
        height:'100%',
        backgroundColor:'#Ff2'
     },
    
     theme2:{
      flex:1,
      justifyContent:'flex-start',
      alignItems:'center',
      marginTop:StatusBar.currentHeight+15,  
        width:'100%',
        height:'100%',
        backgroundColor:'#F23'
     },
     theme3:{
        width:50,
        height:50,
        backgroundColor:'#5ff9'
     },
     modalAdminActive:{
      flex:1,
      justifyContent:'flex-start',
      alignItems:'center',
      marginTop:StatusBar.currentHeight+15,  
      alignItems:'center',
      backgroundColor:'#5ff9'
     },
     modalAdminInactive:{
      flex:1,
      justifyContent:'flex-start',
      alignItems:'center',
      marginTop:StatusBar.currentHeight+15, 
      backgroundColor:'#F23'
     }
    })
    
    
    
   