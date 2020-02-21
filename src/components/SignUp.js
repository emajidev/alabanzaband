import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity,AsyncStorage,StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from "firebase/app";
import { db } from './firebase.js';


let addUser = (user,numberPhone) => {
  db.ref('/users'+'/'+'user'+numberPhone).push({
   user: user,
   numberPhone:numberPhone
 })
};

export default class SignUp extends React.Component {
    constructor(props) {
      super(props);
      this.toggleSwitch = this.toggleSwitch.bind(this);
      this.state = {
        showPassword: true,
        iconChange:'eye',
        
      }
    }
    state = { email: '', password: '',numberPhone:'', errorMessage: null }
    getData = async () => {
      try {
        const data = await AsyncStorage.getItem('@storage_Key')
        let newData = JSON.parse(data);
        if(newData.phone !== null) {
       
          this.props.navigation.navigate('FormProfile')
        }
      } catch(e) {
        // error reading value
        console.log("error en list constactos",e)
      }
    }
    componentDidMount() {
     this.getData()
    }
    numberPhoneHandle = e => {
      this.setState({
      numberPhone: e.nativeEvent.text
      });
   };
   
    toggleSwitch() {
      this.setState({ showPassword: !this.state.showPassword });
    }
    
    handleSignUp = () => {
      
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('FormProfile'))
        .catch(error => this.setState({ errorMessage: error.message }))
        addUser(this.state.email , this.state.numberPhone);
       
        
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
                {this.state.errorMessage} */}
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
             <View style={styles.TextInput}>
              <Icon 
              color ='#d9e3dd'
              name='lock'
              size={25}
              />
              <TextInput
                autoCapitalize="none"
                placeholder="numero de telef"
                onChange={this.numberPhoneHandle} 
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