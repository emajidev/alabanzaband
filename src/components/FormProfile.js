import React from 'react'
import { Text, TextInput, View, TouchableOpacity,AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/Styles'
import * as firebase from "firebase/app";
import { db } from './firebase.js';

storeData = async (phone,user) => {
  data={
    phone:phone,
    user:user
  }
  try {
    await AsyncStorage.setItem('@storage_Key',JSON.stringify(data))
    
  } catch (e) {
    // saving error
  }
}

let addUser = (user,numberPhone) => {
    var currentUser = firebase.auth().currentUser;
    currentUser.updateProfile({
        displayName:numberPhone.toString()
    }).then(function(){
        //update succesful
        let userlogger = 'user'+currentUser.displayName
        this.storeData(userlogger,user)
        console.log("displayName",numberPhone)
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
    state = { name: '',numberPhone:'', errorMessage: null }
    
    numberPhoneHandle = e => {
      this.setState({
      numberPhone: e.nativeEvent.text
      });
   };
   
    toggleSwitch() {
      this.setState({ showPassword: !this.state.showPassword });
    }
    
    handleSignUp = () => {
        addUser(this.state.name , this.state.numberPhone);
        this.props.navigation.navigate('Main')
        
    }
 

    render() {
        return (
        
          <View style={styles.container}>
         
          <View style={styles.content} >
          <Icon 
              color ='#d9e3dd'
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
  
