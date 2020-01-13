import React from 'react'
import { Modal,Text, Alert,TextInput, View, TouchableOpacity,AsyncStorage,TouchableHighlight,StatusBar,StyleSheet, PanResponder } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import * as firebase from "firebase/app";


import { db } from '../firebase';

let userAdminState = () => {
   db.ref('/moduser').set({

    mode:'admin'
  })
};

export default class ShowProfile extends React.Component {

  constructor(props){
    super(props);
    this.state={
      email: '',
      phone:'',
      inactive:true,
      modalVisible:false,
      modalInactive:true,
      timer:0,
      counTouch:0
    }

  }
  
   componentDidMount(){
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      phone = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                      // this value to authenticate with your backend server, if
                      // you have one. Use User.getToken() instead.
      this.setState({
        email: email,
        phone: phone,
        
      })  
                          
    }

 
   }
   handleBackButton = () => {

    console.log('boton trasero')
}
   componentWillMount(){

     if(this.state.inactive){
      this.timeout = setTimeout(()=>{
        this.setState({
          inactive:true
        })
        console.log("inactivo")
      },5000)
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
   
     
       this.timeout = setTimeout(()=>{
         this.setState({
           inactive:true,
          
         })
         console.log("inactivo")
         this.setState({
          counTouch:0
        })
       },5000)
       return false;
      },
      onStartShouldSetPanResponderCapture:()=>{
        this.setState({
          counTouch:this.state.counTouch+1
        })
        console.log("touch coun",this.state.counTouch)
      }

      
    })
   

   }
  componentWillUnmount(){
    clearTimeout(this.timeout);

  }

  
  setModalVisible() {
    this.setState({timer:30})
    clearInterval(this.clockCall)  
    clearTimeout(this.timeoutModal)
    this.startTimer()
    this.setState({modalVisible: true});
    this.timeoutModal =  setTimeout(()=>{
      // cerrar modal admin //
      this.setState({modalVisible: false});
      console.log("cerrar modal",this.state.modalInactive)
      

    },31000)
  
    
  }
  startTimer = () => {
    this.clockCall = setInterval(() => {
    this.decrementClock();
    }, 1000);
    }
  decrementClock = () => {

    if(this.state.timer === 0) {
      clearTimeout(this.timeoutModal)
      clearInterval(this.clockCall)
    }
    this.setState((prevstate) => ({ timer: prevstate.timer-1 }));
    };

  modalActivity(){

      if(this.state.modalVisible){
        if(this.state.modalInactive){
          this.timeoutModal =  setTimeout(()=>{
            // cerrar modal admin //
            this.setState({modalVisible: false});
            console.log("cerrar modal",this.state.modalInactive)
          },10000)
         
        }
        if(!this.state.modalInactive){
          this.setState({modalInactive: false});
          clearTimeout(this.timeoutModal)
          console.log("modal actividad",this.state.modalInactive)
          return true
        }
      }
    
  
  }
  closeModal(){
    Alert.alert('Modal has been closed.');
    this.setState({modalVisible: false});
    clearInterval(this.clockCall);
    

  }
  singInAdmin(){
    this.setState({modalInactive:false});
    userAdminState()
  }
    render() {
        
        return (
        
        <View  style={[styles.modalAdminActive, this.state.inactive ? styles.inactive:styles.modalAdminInactive]}  {...this._panResponder.panHandlers}>
        <Modal
         style={{with:'100%',height:'100%'}}
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.closeModal()

          }}>
          <View >
              <Text>{this.state.timer}</Text>
              <Text>Administrador </Text>
              
              <TouchableHighlight
                onPress={() => {
                  this.singInAdmin()
                }}>
                <Text>Ingresar </Text>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => {
                  this.closeModal()
                  
                }}>
                <Text>Salir de Admin</Text>
              </TouchableHighlight>
         
          </View>
        </Modal>
            <Text >Perfil</Text>
            <Icon 
                name='user'
                color='#5f25fe'
                size={25}
              />
            <View  >
              <Text>{this.state.email}</Text>
              <Text>{this.state.phone}</Text>
             
              <Text>Estado de inactividad {this.state.inactive + ""}</Text>
              {
                this.state.counTouch >= 20 ? (
                  <TouchableHighlight
                  onPress={() => {
                   this.setModalVisible()
                  }}>
                  <Text>Entrar en modo Adminitrador</Text>
                  </TouchableHighlight>
                ):(
                  <View><Text>Modo usuario</Text></View>
                )}
                
              
             
      
            </View> 
       
        </View> 
        )
      }
    }
  
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
      width:'100%',
      height:'100%',
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#5ff9'
     },
     modalAdminInactive:{
      width:'100%',
      height:'100%',
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#F23'
     }
    })
    
    
    
   