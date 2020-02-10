import React from 'react'
import { Text, TextInput, View, TouchableOpacity,AsyncStorage, StyleSheet, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from "firebase/app";
import { db } from './firebase.js';
import {themes} from './conext/theme-context';
import PouchDB from 'pouchdb-react-native'
storeData = async (phone,user,theme) => {
 
  data={
    theme:themes.red,
    phone:phone,
    user:user
  }
  try {
    await AsyncStorage.setItem('@storage_Key',JSON.stringify(data))
    console.log('storage enviado',data)
  } catch (e) {
    // saving error
  }
}

let addUser = (user,numberPhone,theme) => {
    var currentUser = firebase.auth().currentUser;
    currentUser.updateProfile({
        displayName:numberPhone.toString()
    }).then(function(){
        //update succesful
        let userlogger = 'user'+currentUser.displayName
        
        this.storeData(userlogger,user,theme)
       
        db.ref('/users/'+userlogger).update({
            uid :currentUser.uid,
            user: currentUser.email,
            numberPhone:numberPhone
            })
     
        
    }).catch(function(error){
        //error 
    })
    
};

export default class FormProfile extends React.Component {
    constructor(props) {
      super(props);
      this.toggleSwitch = this.toggleSwitch.bind(this);
      this.state = {
        showPassword: true,
        iconChange:'eye',
        
      }
    }
    state = { name: '',numberPhone:'', theme:themes.red, errorMessage: null }
    
    numberPhoneHandle = e => {
      this.setState({
      numberPhone: e.nativeEvent.text
      });
   };
   
    toggleSwitch() {
      this.setState({ showPassword: !this.state.showPassword });
    }
    
    handleSignUp = () => {
        addUser(this.state.name , this.state.numberPhone,this.state.theme);
        this.props.navigation.navigate('Main')
     
        
    }
    componentDidMount(){
      this.localDB = new PouchDB('songsDB');

    }

    render() {
        return (
        
          <View style={styles.container}>
         
          <View style={styles.content} >
          <Icon 
              color ='#hsl(144, 15%, 87%)'
              name='user'
              size={100}
              />
          <Text style={{color: '#4b5b68',fontSize:25, fontStyle:'italic',letterSpacing:5, fontWeight:'bold',marginBottom:20}}>
              Perfil
            </Text>
            {this.state.errorMessage &&
              <Text style={{ color: 'red' , marginBottom:20}}>
                {this.state.errorMessage} */}
              </Text>}
            <View style={styles.borderBox}>
              <View style={styles.TextInput}>
           
              <TextInput
                autoCapitalize="none"
                placeholder="Nombre"
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                style={{ color:'#808080',fontSize:18,paddingLeft:5}}
                
              />
              </View>
              <View style={{ width:'90%', height:1, backgroundColor:'#hsl(144, 15%, 87%)'}}/>

             <View style={styles.TextInput}>
          
              <TextInput
                autoCapitalize="none"
                placeholder="numero de telef"
                onChange={this.numberPhoneHandle} 
                style={{ color:'#808080', width:'90%', fontSize:18, paddingLeft:5,}}
              />
       
             
              
             </View>
            </View>
            
         

            <TouchableOpacity style={styles.btn_accept} onPress={this.handleSignUp} >
              <Text style={{ color:'#ddd', fontSize:16, fontWeight:'bold'}}>
                Listo 
              </Text>
              <Icon 
                name='chevron-circle-right'
                color='#fff'
                size={40}
                style={{position:'absolute', right:0, margin:5}}
                
              />
            </TouchableOpacity>
          
          </View>
        </View> 
        )
      }
    }
  

    const styles = StyleSheet.create({
    
      header:{
        flex: 1,
        marginTop: StatusBar.currentHeight,
        justifyContent: 'center',
        alignItems: 'center',
      },
      content:{
        flex: 6,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        TextInput: {
          flexDirection: 'row',
          
         
          marginTop:20,
          marginBottom:20,
          width:'80%'
        },
        bg:{
          justifyContent: 'center',
          alignItems: 'center',
          width:250,
          height:50,
          marginBottom:100,
        },
        mg:{
          marginTop:2
        },
       
        borderBox:{
         
          justifyContent: 'center',
          alignItems: 'center',
          width:'80%',
          borderRadius:10,
          shadowColor: "#000", shadowOffset: { width: 2, height: 4, }, shadowOpacity: 0.2, shadowRadius: 10
         
        },
        btn_sesion:{
          backgroundColor:'#10cb42',
          marginTop:20,
          width:'80%',
          height:50,
          justifyContent:"center",
          alignItems:'center',
          
        },
        btn_facebook:{
          backgroundColor:'#235e86',
          marginTop:40,
          width:'80%',
          height:50,
          justifyContent:"center",
          alignItems:'center',
          flexDirection:'row'
      
        },
        btn_accept:{
          backgroundColor:'#5f25fe',
          marginTop:40,
          width:'80%',
          height:50,
          borderRadius:50,
          justifyContent:"center",
          alignItems:'center',
          flexDirection:'row',
          shadowColor: "#000", shadowOffset: { width: 2, height: 4, }, shadowOpacity: 0.2, shadowRadius: 10
  
        },
        btn_primary_light:{
          
          borderColor:'#5f25fe',
          borderWidth:2,
          borderRadius:50,
          marginTop:40,
          width:'80%',
          height:50,
          borderRadius:50,
          justifyContent:"center",
          alignItems:'center',
          flexDirection:'row',
          shadowColor: "#000", shadowOffset: { width: 2, height: 4, }, shadowOpacity: 0.2, shadowRadius: 10
  
        },
  });