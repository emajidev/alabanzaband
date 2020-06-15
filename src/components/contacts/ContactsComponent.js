import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, RefreshControl, AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import { withGlobalContext } from '../UserContext';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import shorthash from 'shorthash';

import AvatarComponent from '../avatar/AvatarComponent';

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
            <AvatarComponent email={item.userName} name={item.name}  showUserName={true} showUser={true}/>

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