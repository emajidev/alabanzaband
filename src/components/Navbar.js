import React from 'react';
import { StatusBar,StyleSheet, Text, View, Modal, TouchableOpacity,AsyncStorage,Alert,TouchableHighlight} from 'react-native';
import List from './List.js'
/* import Icon from 'react-native-vector-icons/Feather';
 */import Icon2 from 'react-native-vector-icons/Ionicons';
import ItemComponent from '../components/ItemComponent';

import ContactsIcon from 'react-native-vector-icons/AntDesign';
import {withNavigation} from 'react-navigation';
import * as firebase from "firebase/app";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
let itemsRef = db.ref('/items');
import { db } from './firebase.js';

import {ThemeContext, themes} from './conext/theme-context';

import {ThemeProvider} from 'styled-components/native'
import { styles } from '../styles/Styles.js';
import getTheme from '../../native-base-theme/components';
import turquesa from '../../native-base-theme/variables/turquesa';
import { Container,Content, Header, Left, Body, Right, Button, Icon, Title,Badge,FooterTab,Footer,StyleProvider } from 'native-base';

class Navbar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    };
  }
  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
    });
  }
  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false
    });
  }
  toggleTab3() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    });
  }
  toggleTab4() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true
    });
  }
  render() {
  return (
    <StyleProvider style={getTheme(turquesa)}>
    <Container>
      <Header>
      <Left>
        <Button transparent>
          <Icon name='menu' />
        </Button>
      </Left>
      <Body>
        <Title>Header</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name='search' />
        </Button>
      </Right>
    </Header>
    <Content padder>
        <Text>Content goes here</Text>
    </Content>

    <Footer>
      <FooterTab>
        <Button vertical active={this.state.tab1} onPress={() => this.toggleTab1()}>
          <Icon active={this.state.tab1} name="apps" />
          <Text>Apps</Text>
        </Button>
        <Button vertical active={this.state.tab2} onPress={() => this.toggleTab2()}>
          <Icon active={this.state.tab2} name="camera" />
          <Text>Camera</Text>
        </Button>
        <Button vertical active={this.state.tab3} onPress={() => this.toggleTab3()}>
          <Icon active={this.state.tab3} name="compass" />
          <Text>Compass</Text>
        </Button>
        <Button vertical active={this.state.tab4} onPress={() => this.toggleTab4()}>
          <Icon active={this.state.tab4} name="contact" />
          <Text>Contact</Text>
        </Button>
      </FooterTab>
    </Footer>
     
    </Container>
    
  </StyleProvider>



  );
  }
}
export default withNavigation(Navbar);

