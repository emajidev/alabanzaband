import React from 'react'
import { StyleSheet,ImageBackground, Text, TextInput, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/Styles'
import * as firebase from "firebase/app";
import { create } from 'uuid-js';


export default class Login extends React.Component {
    constructor(props) {
      super(props);
      this.toggleSwitch = this.toggleSwitch.bind(this);
      this.state = {
        showPassword: true,
        iconChange:'eye'
      }
    }
    state = { email: '', password: '', errorMessage: null }
    handleLogin = () => {
     const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
      console.log('handleLogin')
    }
    toggleSwitch() {
      this.setState({ showPassword: !this.state.showPassword });
    }
    handleLoginFacebook = () =>{
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase
      .auth()
      .signInWithRedirect(provider)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
      console.log('handleLogin')
      }

    render() {
        return (
        
          <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{color: '#4b5b68',fontSize:25, fontStyle:'italic',letterSpacing:5, fontWeight:'bold'}}>
              AlabanzaBand
            </Text>
          </View>
          <View style={styles.content} >
            <ImageBackground source={require('../img/bg.jpg')} style={localStyles.background} >
            

            <Text style={{color:'white', width:'80%', fontSize:14, fontWeight:'bold', letterSpacing:2,fontStyle:'italic', textAlign:'center'}}>Ingresa tu cuenta y disfruta de tu repertorio</Text>
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
         
            <TouchableOpacity style={styles.mg} >
              <Text style={{ color:'#ddd',marginTop:20}}>
                ¿Olvidaste tu constraseña?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn_sesion} onPress={this.handleLogin} >
              <Text style={{ color:'#ddd', fontSize:16, fontWeight:'bold'}}>
                Iniciar sesión
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_facebook} onPress={this.handleLoginFacebook} >
            <Icon name="facebook" 
            color="#fff"
            size={25}>
              <Text style={{ fontFamily: 'Arial', fontSize: 15,color:'#fff', paddingLeft:5 }}>
                Iniciar con Facebook
              </Text>
            </Icon>
            </TouchableOpacity>
            <View style={{ marginTop:20, alignItems:'center'}}>
           

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignUp')}
              style={{alignItems:'center' }}
            >
              <View  style={{ flexDirection:'row', width:'80%',textAlign:'center' }}>
                <Text style={{ color:'#ddd', fontSize:16, marginTop:15}} >
                  ¿No tienes una cuenta?, toca aqui para <Text  style={{ color:'#5f25fe'}}>crear una cuenta...</Text> 
                </Text>
              </View>
            
              
            </TouchableOpacity>

            </View>
            </ImageBackground>
            </View>
          </View>
        )
      }
    }
    const localStyles = StyleSheet.create({
      background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%'
      }
    })
