import React, { Component } from 'react';
import { StyleSheet, View ,Text} from 'react-native';
import CodeCountries from  './codeCountries/CodeCountries'
import Rol from  './codeCountries/Rol'

import { Container, Header, Content, Form, Item, Input ,Icon,Label,Picker,StyleProvider,Body,Title} from 'native-base';
import {Grid,Col,Button,Footer} from 'native-base';
import turquesa from '../../native-base-theme/variables/turquesa';
import getTheme from '../../native-base-theme/components';
import * as firebase from "firebase/app";
import { db } from './firebase.js';

export default class FormProfile extends Component {
  constructor() {
    super();
    this.state = {
      language: '',
      name:'',
      code:'',
      phone:'',
      rol:'',
      next:false,
    };
}
  handler = (param) => {
    this.setState({
      phone: param
    })
  }
  handlerCode = (param) => {
    this.setState({
      code: param
    })
  }
  handlerRol= (param) => {
    this.setState({
      rol: param
    })
  }

  storeData = async (phone,nick,user,rol) => {

    data={
      phone:phone,
      user:user,
      nick:nick,
      rol:rol
    }
    try {
      await AsyncStorage.setItem('@storage_Key',JSON.stringify(data))
      console.log('storage enviado',data)
    } catch (e) {
      // saving error
    }
  }
  
  addUser = (user,numberPhone,rol) => {
          
    this.storeData(numberPhone,user,currentUser,rol)
    var currentUser = firebase.auth().currentUser;

    db.ref('/users/user'+numberPhone+'/profile').set({
        user:currentUser.email,
        nick: user,
        numberPhone:numberPhone,
        rol:rol
        })
  
      
  };
  
  handleNext = () => {
      this.addUser(this.state.name ,this.state.code+this.state.phone,this.state.rol);
      this.props.navigation.navigate('Main')
   
  }

  render() {
    let name = this.state.name
    let code = this.state.code
    let phone =  this.state.phone
    let rol =  this.state.rol
    let next = false
    if(code.length!=0 && phone.length==10 && rol.length!=0 && name.length!=0){
      console.log("this.state.next")
      next=true
    }
    return (
      <Container>
      <Header noShadow={true} style={{backgroundColor:"rgba(80,227,194,1)", height:100,color:'#fff', borderBottomRightRadius:50,borderColor:'#fff'}}>
            
      <Content contentContainerStyle={{flex: 1}} style={{padding: 10}}>
            <Grid >
              <Col style={{alignItems: 'center',justifyContent:'center'}}>
              <Text style={{color:"#fff",marginTop:30,fontSize:30}}>Bienvenido</Text>
              </Col>
            </Grid>
          </Content>
            
      </Header>
      <Text style={{color:"rgba(80,227,194,1)",marginTop:30,fontSize:20,textAlign:'center'}}>Por favor</Text>
      <Text style={{color:"rgba(80,227,194,1)",fontSize:20,textAlign:'center'}}>Completa tu perfil</Text>

        <Content>
          <Form>
            <Item floatingLabel  style={{ paddingBottom: 5, borderColor:'rgba(80,227,194,1)' }} >
              <Label style={{fontSize:20}}>Nombre de usuario</Label>
              <Input onChangeText={name => this.setState({ name })}
                value={this.state.name} style={{ marginTop: 15}}/>
            </Item>
          </Form>
          <Rol handlerRol={this.handlerRol} />

          <CodeCountries handler={this.handler} handlerCode={this.handlerCode}/>
        </Content>
        <Button style={next==false ? styles.inactive : styles.active} onPress={()=>{ next==true ? this.handleNext(): console.log("falso") }} >
              <Icon style={{ color: '#fff',fontSize:100 }} name="ios-checkmark" />
        </Button>
        </Container>
    );
  }
}
const styles = StyleSheet.create({

inactive:{
  elevation: 0,
  margin:50,
  width:100,height:100,
  alignSelf: 'center', 
  justifyContent: "center",
  borderRadius:300, 
  alignItems: "center", 
  backgroundColor: '#d5d5d5'
},
active:{
  elevation: 0,
  margin:50,
  width:100,height:100,
  alignSelf: 'center', 
  justifyContent: "center",
  borderRadius:300, 
  alignItems: "center", 
  backgroundColor: 'rgba(80,227,194,1)'
}
})