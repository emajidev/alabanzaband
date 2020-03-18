import React from 'react'
import { Modal,Text, Alert,TextInput, View, TouchableOpacity,AsyncStorage,TouchableHighlight,StatusBar,StyleSheet, PanResponder } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { withNavigation } from 'react-navigation'
import Icon2 from 'react-native-vector-icons/Ionicons';
import * as firebase from "firebase/app";
import { db } from '../firebase';

let userAdminState = () => {
   db.ref('/moduser').set({

    mode:'admin'
  })
};

class ShowProfile extends React.Component {

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
    this.getAsyncStorage()
    if (user != null) {
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                      // this value to authenticate with your backend server, if
                      // you have one. Use User.getToken() instead.
      this.setState({
        email: email
      })  
                          
    }

 
   }
   async getAsyncStorage(){
    try {
      const data = await AsyncStorage.getItem('@storage_Key')
      let newData = JSON.parse(data);
      this.setState({phone:newData.phone})
    }catch(e){
      console.log("error en obtener datos async storage",e)
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
    Alert.alert('Saliendo del menu admin.');
    this.setState({modalVisible: false});
    clearInterval(this.clockCall);
    

  }
  singInAdmin(){
    this.setState({modalInactive:false});
    this.setState({modalVisible: false});
    userAdminState()
    this.props.navigation.goBack()
  }
    render() {
        
        return (
        
        <View style={[styles.modalAdminActive, this.state.inactive ? styles.inactive:styles.modalAdminInactive]}  {...this._panResponder.panHandlers}>
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
        
            <View style={styles.container} >
            <Icon2
                name='md-person'
                color='#000'
                size={50}
              />
              <Text style={{textAlign:'center',fontSize:20,margin:20}}>Datos de cuenta</Text>
            <View>
              <Text style={{textAlign:'left',fontSize:16,margin:10,color:"#888"}}>Usuario: {this.state.email}</Text>
              <Text style={{textAlign:'left',fontSize:16,margin:10,color:"#888"}}>Telefono: {this.state.phone}</Text>
              <Text style={{textAlign:'left',fontSize:16,margin:10,color:"#888"}}>Id: user{this.state.phone}</Text>
              <Text style={{textAlign:'left',fontSize:16,margin:10,color:"#888"}}>Rol musical: user{this.state.rol}</Text>


            </View>
             
             {
              
                this.state.counTouch >= 20 ? (
                  <View style={{width:'100%',height:50,backgroundColor:'#000',alignItems:'center',justifyContent:'center',flex:1}}>
                    
                  <TouchableOpacity
                  style={{width:'100%',height:'100%',alignItems:'center'}}
                  onPress={() => {
                   this.setModalVisible()
                  }}>
                  <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                  <Icon2
                    name='ios-finger-print'
                    color='#fff'
                    size={100}
                  /> 
                    <Text style={{color:"#fff",fontSize:20}}>Entrar en modo Adminitrador</Text>
                  </View>
                  </TouchableOpacity>
                  </View>
                ):(
                  <View><Text>Modo usuario</Text></View>
                )}
                
              
             
      
            </View> 
       
        </View> 
        )
      }
    }
    export default withNavigation(ShowProfile)
  
    const styles = StyleSheet.create({
      container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:StatusBar.currentHeight+15,  
        width:'100%'
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
      backgroundColor:'#fff'
     },
     modalAdminInactive:{
      width:'100%',
      height:'100%',
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#fff'
     }
    })
    
    
    
   