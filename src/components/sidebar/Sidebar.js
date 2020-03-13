import React, { Component } from 'react';
import {StyleProvider, Grid,Col,TabHeading,Container, Header,Thumbnail, Tab, Tabs, ScrollableTab,Text,Content, Button, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import UserContext from '../UserContext'

import getTheme from '../../../native-base-theme/components';
import turquesa from '../../../native-base-theme/variables/turquesa';

import Settings from './Settings'
export default class Sidebar extends Component {
  static contextType = UserContext

  render() {
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    const { user, setUser } = this.context

    return (
      <StyleProvider style={getTheme(user.theme)}>

      <Container>
      <Header style={{backgroundColor:"rgba(80,227,194,1)", height:250}}>
          <Content contentContainerStyle={{flex: 1}} style={{padding: 10}}>
            <Grid >
              <Col style={{alignItems: 'center',justifyContent:'center'}}>
              <Thumbnail large source={{uri: uri}} />          
              <Text style={{color:"#fff",margin:10}}>{user.name}</Text>
              </Col>
            </Grid>
          </Content>
         
        </Header>

        <Tabs>
          <Tab heading={ <TabHeading><Icon name="ios-options" /><Text>Opciones</Text></TabHeading>}>
          </Tab>
          
          <Tab heading={ <TabHeading><Icon name="ios-settings" /><Text>Ajustes</Text></TabHeading>}>
            <Settings />
          </Tab>
        </Tabs>
      </Container>
      </StyleProvider>

    );
  }
}