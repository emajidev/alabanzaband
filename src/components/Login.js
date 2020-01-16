import React from 'react'
import { StyleSheet,AsyncStorage, Text, TextInput, View, TouchableOpacity } from 'react-native'
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
    getData = async () => {
      try {
        const data = await AsyncStorage.getItem('@storage_Key')
        let newData = JSON.parse(data);
        if(newData.phone !== null) {
       
          this.props.navigation.dismiss()
        }
      } catch(e) {
        // error reading value
        console.log("error en list constactos",e)
      }
    }
    componentDidMount() {
     this.getData()
    }
    handleLogin = () => {
     const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('FormProfile'))
      .catch(error => this.setState({ errorMessage: error.message }))
      console.log('handleLogin')
    }
    toggleSwitch() {
      this.setState({ showPassword: !this.state.showPassword });
    }
    handleLoginFacebook = () =>{
      const cred = firebase.auth.FacebookAuthProvider.credential(facebookIdToken, facebookAccessToken);
      firebase.auth().signInWithCredential(cred)
        .then((result) => {
          // User signed in.
          var token = result.credential.accessToken;
          console.log("token",token)
        })
        .catch((error) => {
          // Error occurred.
        });
      /* const provider = new firebase.auth.FacebookAuthProvider();
      firebase
      .auth()
      .signInWithRedirect(provider)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }),console.log(error))
      console.log('handleLogin') */
      }
    emailHandle(email){
        this.setState({
            email: email.replace(/\s/g, '')
        })
    }
    passwordHandle(password){
      this.setState({
        password: password.replace(/\s/g, '')
      })
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
                onChangeText={(email)=>this.emailHandle(email)}
                value={this.state.email }
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
               
                secureTextEntry={this.state.showPassword}
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={(password)=>this.passwordHandle(password)}
                value={this.state.password}
                style={{ color:'#808080', width:'90%', fontSize:18, paddingLeft:5,}}
              />
              <TouchableOpacity onPress={this.toggleSwitch}  value={!this.state.showPassword}>
                <Icon name={this.state.showPassword ? "eye-slash" : "eye"} style={{ color:'#ddd'}} size={25}/>
              </TouchableOpacity>
             
              
             </View>
            </View>
            
         
            <TouchableOpacity style={styles.mg} >
              <Text style={{ color:'#808080',marginTop:20}}>
                ¿Olvidaste tu constraseña?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn_accept} onPress={this.handleLogin} >
              <Text style={{ color:'#ffff', fontSize:16, fontWeight:'bold'}}>
                Iniciar sesión
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
              onPress={() => this.props.navigation.navigate('SignUp')}
              style={{alignItems:'center' }}
            >
              <View  style={{ flexDirection:'row', width:'80%',textAlign:'center' }}>
                <Text style={{ color:'#808080', fontSize:16, marginTop:15}} >
                  ¿No tienes una cuenta?, toca aqui para <Text  style={{ color:'#5f25fe'}}>crear una cuenta...</Text> 
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
  
