import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, RefreshControl, AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import { withGlobalContext } from '../UserContext';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import storage from 'firebase/storage';
import * as firebase from 'firebase/app';
import * as FileSystem from 'expo-file-system';
import shorthash from 'shorthash';
import md5 from 'md5';
import UserAvatar from 'react-native-user-avatar';

class ImageAvatar extends React.Component {
  state = {
    uri: ''

  };

  componentDidMount() {
    this.avatar()
  }
  avatar() {
    let friend = this.props.friend
    let email = md5(friend.userName)
    console.log("firend email", email)
    firebase.
      storage().
      ref().
      child("uploads/photo" + email + ".jpg").
      getDownloadURL()
      .then(url => {
        this.setState({ uri: url })
      })
      .catch(e => {
        console.log("no hay foto de perfil")
      })

  }
  render() {
    return (
      <View>
        {
          this.state.uri ? (
            <Thumbnail source={{ uri: this.state.uri }}  />
          ) : (
              <UserAvatar size={50} name={this.props.friend.name} />
            )
        }
      </View>
      // <UserAvatar size={50} name={item.name} />
    )
  }
}

class ContactsComponent extends React.Component {

  state = {
    search: '',
    typeOfSearch: 'name',
    contacts: [],
    source: []

  };

  componentDidMount() {
  }

  render() {
    return (

      <FlatList
        data={this.props.items}
        enableEmptySections={true}
        renderItem={({ item, index }) => (
          <List>
            <ListItem thumbnail>
              <Left>
                <ImageAvatar friend={item} />
              </Left>
              <Body>
                <Text style={styles.itemtext} >{item.name} </Text>
                <Text style={styles.itemtext} >{item.userName} </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>ver</Text>
                </Button>
              </Right>
            </ListItem>
          </List>

        )}

      />



    );
  }
}
export default withGlobalContext(withNavigation(ContactsComponent));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',



  },
  boxContact: {
    flexDirection: 'row',
    margin: 15,
    height: 50, width: '100%',
    borderBottomColor: '#888',
    borderBottomWidth: 1
  },
  itemtext: {
    fontSize: 20, marginLeft: 10,

  },
  TouchableOpacity: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#e3e3e3',
    height: 80,

  },


  btnfilter: {
    width: 80,
    height: 30,
    margin: 10,
    borderRadius: 20,

    backgroundColor: '#e3e3e3',
    justifyContent: 'center',
    alignItems: 'center'

  },
  txtFilter: {
    color: '#a8a8a8',
  }
})