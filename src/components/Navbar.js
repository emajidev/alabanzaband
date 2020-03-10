import React from 'react';
import { StatusBar,StyleSheet, Text, View, Modal, TouchableOpacity,AsyncStorage,Alert,TouchableHighlight} from 'react-native';
import List from './List.js'
/* import Icon from 'react-native-vector-icons/Feather';
 */import Icon2 from 'react-native-vector-icons/FontAwesome';
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
import material from '../../native-base-theme/variables/material';
import { clearThemeCache } from 'native-base-shoutem-theme'
import { Container,Content, Header, Left, Body, Right, Button, Icon, Title,Badge,FooterTab,Footer,StyleProvider } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class Navbar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false,
      theme:turquesa,
    };
  }
  toggleTab1() {
    clearThemeCache();
    this.setState({
      theme:material
    });

  }
  toggleTab2() {
    clearThemeCache();
    this.setState({
      theme:turquesa
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
    <StyleProvider style={getTheme(this.state.theme)}>
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
        <Grid padder>
          <Col>
            <Button vertical transparent onPress={() => this.toggleTab1()}>
              <Icon2 name='circle' size={20} color="#45f" />
            </Button>
          </Col>
          <Col>
            <Button vertical transparent onPress={() => this.toggleTab2()}>
              <Icon2 name='circle' size={20} color="#900" />
            </Button>
          </Col>
          <Col>
            <Button vertical transparent>
              <Icon2 name='circle' size={20} color="#900" />
            </Button>
          </Col>
          <Col>
          <Button vertical transparent>
            <Icon2 name='circle' size={20} color="#900" />
          </Button>
          </Col>
          <Col>
          <Button vertical transparent>
            <Icon2 name='circle' size={20} color="#900" />
          </Button>
          </Col>
        </Grid>
        
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

