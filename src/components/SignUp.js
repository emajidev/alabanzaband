import React from 'react'
import { StyleSheet,ImageBackground, Text, TextInput, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/Styles'
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";


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

      <ImageBackground source={require('../img/bg.jpg')} style={styles.bg} >
      

      <Text style={{color:'white', fontSize:20}}>Crea tu cuenta</Text>
      {this.state.errorMessage &&
        <Text style={{ color: '#fff' }}>
          datos invalidos{/*  {this.state.errorMessage} */}
        </Text>}
      <View style={styles.TextInput}>
      <TextInput
        autoCapitalize="none"
        placeholder="Correo electrónico"
        onChangeText={email => this.setState({ email })}
        value={this.state.email}
        style={{ color:'#ddd',fontSize:18}}
        
      />
      </View>

      <View style={styles.TextInput}>
      <TextInput
        textAlign={'center'}
        secureTextEntry={this.state.showPassword}
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={password => this.setState({ password })}
        value={this.state.password}
        style={{ color:'#ddd', width:'90%', fontSize:18}}
      />
      <TouchableOpacity onPress={this.toggleSwitch}  value={!this.state.showPassword}>
        <Icon name={this.state.showPassword ? "eye-slash" : "eye"} style={{ color:'#ddd', width:'10%'}} size={25}/>
      </TouchableOpacity>
       
       </View>

      <TouchableOpacity style={styles.btn_sesion} onPress={this.handleSignUp} >
        <Text style={{ color:'#ddd', fontSize:16, fontWeight:'bold'}}>
          Registrate
        </Text>
      </TouchableOpacity>

      <View style={{ marginTop:50, alignItems:'center'}}>
      <TouchableOpacity style={styles.btn_facebook, styles.mg} onPress={this.handleSignUpFacebook}  >
      <Icon name="facebook" 
      color="#fff"
      size={25}>
        <Text style={{ fontFamily: 'Arial', fontSize: 15,color:'#fff', paddingLeft:5 }}>
          Registrar con Facebook
        </Text>
      </Icon>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Login')}
        style={styles.mg}
      >
        <Text style={{ color:'#ddd', fontSize:14, marginTop:15}} >
          Iniciar sesión
        </Text>
      </TouchableOpacity>

      </View>
      </ImageBackground>
      </View>
      
    )
  }
}