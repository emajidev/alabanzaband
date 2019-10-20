import React from 'react'
import { StyleSheet,ImageBackground, Text, TextInput, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/Styles'
import * as firebase from "firebase/app";


export default class SignUp extends React.Component {
    constructor(props) {
      super(props);
      this.toggleSwitch = this.toggleSwitch.bind(this);
      this.state = {
        showPassword: true,
        iconChange:'eye'
      }
    }
    toggleSwitch() {
      this.setState({ showPassword: !this.state.showPassword });
    }
    state = { email: '', password: '', errorMessage: null }
    handleSignUp = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }
    handleSignUpFacebook = () => {
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

    }

    render() {
        return (
        
          <View style={styles.container}>
         
          <View style={styles.content} >
          <Text style={{color: '#4b5b68',fontSize:25, fontStyle:'italic',letterSpacing:5, fontWeight:'bold',marginBottom:20}}>
              Ingresar
            </Text>
            {this.state.errorMessage &&
              <Text style={{ color: 'red' , marginBottom:20}}>
                datos invalidos{/*  {this.state.errorMessage} */}
              </Text>}
            <View style={styles.borderBox}>
              <View style={styles.TextInput}>
              <Icon 
              color ='#d9e3dd'
              name='user'
              size={25}
              />
              <TextInput
                autoCapitalize="none"
                placeholder="Correo electrónico"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                style={{ color:'#808080',fontSize:18,paddingLeft:5}}
                
              />
              </View>
              <View style={{ width:'90%', height:1, backgroundColor:'#hsl(144, 15%, 87%)'}}/>

              <View style={styles.TextInput}>
              <Icon 
              color ='#d9e3dd'
              name='lock'
              size={25}
              />
              <TextInput
                textAlign={'center'}
                secureTextEntry={this.state.showPassword}
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                style={{ color:'#808080', width:'90%', fontSize:18, paddingLeft:5,}}
              />
              <TouchableOpacity onPress={this.toggleSwitch}  value={!this.state.showPassword}>
                <Icon name={this.state.showPassword ? "eye-slash" : "eye"} style={{ color:'#ddd'}} size={25}/>
              </TouchableOpacity>
             
              
             </View>
            </View>
            
         

            <TouchableOpacity style={styles.btn_accept} onPress={this.handleSignUp} >
              <Text style={{ color:'#ddd', fontSize:16, fontWeight:'bold'}}>
                Registrarse 
              </Text>
              <Icon 
                name='chevron-circle-right'
                color='#fff'
                size={40}
                style={{position:'absolute', right:0, margin:5}}
                
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_primary_light} onPress={this.handleSignUpFacebook} >
              <Text style={{ color:'#5f25fe', fontSize:16, fontWeight:'bold'}}>
                Registrarse con facebook
              </Text>
              <Icon 
                name='chevron-circle-right'
                color='#fff'
                size={40}
                style={{position:'absolute', right:0, margin:5}}
                
              />
            </TouchableOpacity>
            <View style={{ marginTop:20, alignItems:'center'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
              style={{alignItems:'center' }}
            >
              <View  style={{ flexDirection:'row', width:'80%',textAlign:'center' }}>
                <Text style={{ color:'#5f25fe', fontSize:16, marginTop:15}} >
                  Poseo una cuenta  
                </Text>
              </View>
            
              
            </TouchableOpacity>

            </View>
            <TouchableOpacity style={{ marginTop:50}}  onPress={() => this.props.navigation.goBack()}>
                <Icon name='chevron-circle-left' size={40}/>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    }
  
