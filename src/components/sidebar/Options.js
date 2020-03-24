import React, { Component } from 'react';
import {AsyncStorage} from 'react-native'
import * as firebase from "firebase/app";
import {withNavigation} from 'react-navigation';
import {delete_all_todo}from '../SqliteDateBase'

import { Container, Header, Content, Button, Text } from 'native-base';
class Options extends Component {

    logOut(){
        AsyncStorage.removeItem('@storage_Key')
        this.props.navigation.navigate('AuthLoading');
        firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('cerrar')
          AsyncStorage.clear().then(() => console.log('Cleared'))
        }
          )
        .catch(error =>console.log("error en cerrar sesion",error)
        )
    }
  render() {
    return (
      <Container>
        <Content>
    
          <Button transparent onPress={()=>this.logOut()}>
            <Text>cerrar sesion</Text>
          </Button>
          <Button transparent onPress={()=> delete_all_todo()}>
            <Text>borrar bd task</Text>
          </Button>
         
        </Content>
      </Container>
    );
  }
}
export default withNavigation(Options);
