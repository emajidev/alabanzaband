import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, RefreshControl, ActivityIndicator } from 'react-native';

import IconLike from 'react-native-vector-icons/AntDesign';
import { withNavigationFocus } from 'react-navigation'

import { withGlobalContext } from '../UserContext';
import { db } from "../firebase";
import * as firebase from "firebase/app";
import Base64 from 'Base64';

const encoded = Base64.btoa('emanuelyul@gmail.com');
const decoded = Base64.atob(encoded);

import {
  Container,
  Content,
  Card,
  Tabs,
  Tab,
  TabHeading,
  CardItem,
  Header,
  Left,
  Icon,
  Body,
  Right,
  Button,
  Title,
  Badge,
  FooterTab,
  Footer,
  StyleProvider,
  Drawer
} from "native-base";
class FlatListChat extends Component {
  componentDidMount(){
  
  }
  render() {
    const filtered = this.props.events
    console.log("chat filtered", filtered)
    return (
      <Container>
        <Header >
          <Left>
            <Button transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name='ios-arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Chats de eventos</Title>
          </Body>
          <Right />
        </Header>

        {filtered != null ?
          (<FlatList
            data={filtered}
            enableEmptySections={true}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.listChat}
                onPress={() => this.props.navigation.navigate('Chat', { item })}>
                <View style={{ paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, padding: 20, color:'#fff',backgroundColor:[item.colorTag] }}>{index + 1}</Text>
                  <View style={{ paddingLeft: 15}}>
                    <Text style={{ fontSize: 18, paddingRight: 10 }}>{item.title}</Text>
                    <Text style={{ fontSize: 18, paddingRight: 10 }}>{ Base64.atob(item.director)}</Text>
                  </View>
                </View>

              </TouchableOpacity>
            )}
          />) : (
            console.log("no hay chat")
          )
        }
      </Container>
    )
  }
}

class ListChat extends Component {
  constructor(props) {
    super(props);
    this.state = { events: null };
  }
  getDataChats = async () => {
    const yourEmail = this.props.global.account
    console.log("yourEmail2", yourEmail)
    try {
      const events = db.ref('/users/user' + yourEmail + '/events')
      events.on('value', (snapshot) => {

        let data = snapshot.val();

        if (data != null) {
          let event = Object.values(data)
          this.setState({ events: event })

        } else {
          console.log("no hay eventos")
        }
      })
    } catch (e) {
    }
  }
  componentDidMount() {
    this.getDataChats()
    

  console.log('testStr', encoded, decoded);
  }
  render() {
    console.log("chat data", this.state.events)

    return (
      <View style={{ flex: 1, width: '100%', height: '100%', position: 'relative' }}>
        {this.state.events != null ? (
          <FlatListChat events={this.state.events} navigation={this.props.navigation} />

        ) : (
            <View style={styles.cont}>
              <Text style={{ margin: 10 }}>Buscando...</Text>
              <ActivityIndicator size="large" />
            </View>
          )}
      </View>
    );
  }
}
export default withNavigationFocus(withGlobalContext(ListChat));


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#d8fff4',


  },

  listChat: {
    width: '100%',
    height: 80,
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
})