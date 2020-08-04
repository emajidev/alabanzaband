import React, { Component } from 'react';
import { AsyncStorage } from 'react-native'
import * as firebase from "firebase/app";
import { withNavigation } from 'react-navigation';
import { delete_all_todo } from '../SqliteDateBase'
import { withGlobalContext } from '../UserContext';

import { Container, Header, Content, Button, Text } from 'native-base';
class Options extends Component {

  logOut() {
    AsyncStorage.removeItem('@storage_Key')
    this.props.navigation.navigate('AuthLoading');
    firebase
      .auth()
      .signOut()
      .then(() => {
        //console.log('cerrar',this.props.global.account)
        AsyncStorage.clear().then(() => console.log('Cleared'))
  

      }
      )
      .catch(error => console.log("error en cerrar sesion", error)
      )
  }
  render() {
    return (
      <Container>
        <Content>
          <Button transparent >
            <Text>Noticias</Text>
          </Button>
          <Button transparent onPress={() => {
            this.props.navigation.navigate('AddItem')
          }}>
            <Text>Añadir Canciones</Text>
          </Button>
          <Button transparent onPress={() =>
            this.props.navigation.navigate('ListChat')
          }>
            <Text>Chats</Text>
          </Button>
          <Button transparent >
            <Text>Ayuda</Text>
          </Button>
          <Button transparent onPress={() => this.logOut()}>
            <Text style={{ color: [this.props.global.color.color] ,fontSize: 18}}
            >Salir</Text>
          </Button>
          {/*      <Button transparent onPress={()=> delete_all_todo()}>
            <Text>borrar bd task</Text>
          </Button> */}

        </Content>
      </Container>
    );
  }
}
export default withGlobalContext(withNavigation(Options));
