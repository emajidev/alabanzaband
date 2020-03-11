import React from 'react';
import { StatusBar,StyleSheet, View, Modal, TouchableOpacity,AsyncStorage,Alert,TouchableHighlight} from 'react-native';
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
import themeA from '../../native-base-theme/variables/themeA';
import themeB from '../../native-base-theme/variables/themeB';
import themeC from '../../native-base-theme/variables/themeC';
import themeD from '../../native-base-theme/variables/themeD';

import material from '../../native-base-theme/variables/material';
import { clearThemeCache } from 'native-base-shoutem-theme'
import { Container,Content,Text, Header, Left, Body, Right, Button, Icon, Title,Badge,FooterTab,Footer,StyleProvider } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class Navbar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      theme:turquesa,
    };
  }
  themeA() {
    clearThemeCache();
    this.setState({
      theme:themeA
    });

  }
  themeB() {
    clearThemeCache();
    this.setState({
      theme:themeB
    });

  }
  themeC() {
    clearThemeCache();
    this.setState({
      theme:themeC
    });
  }
  themeD() {
    clearThemeCache();
    this.setState({
      theme:themeD
    });
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
          <Row>
            <Col>
              <Button vertical transparent onPress={() => this.themeA()}>
                <Icon2 name='circle' size={40} color="#00ffc0" />
              </Button>
            </Col>
            <Col>
              <Button vertical transparent onPress={() => this.themeB()}>
                <Icon2 name='circle' size={40} color="#00e241" />
              </Button>
            </Col>
            <Col>
              <Button vertical transparent onPress={() => this.themeC()}>
                <Icon2 name='circle' size={40} color="#0a86d8" />
              </Button>
            </Col>
            <Col>
            <Button vertical transparent onPress={() => this.themeD()}>
              <Icon2 name='circle' size={40} color="#7d392f" />
            </Button>
            </Col>
            <Col>
            <Button vertical transparent >
              <Icon2 name='circle' size={40} color="#000" />
            </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button vertical transparent >
                <Icon2 name='circle' size={40} color="#ff0800" />
              </Button>
            </Col>
            <Col>
              <Button vertical transparent >
                <Icon2 name='circle' size={40} color="#ff0048" />
              </Button>
            </Col>
            <Col>
              <Button vertical transparent >
                <Icon2 name='circle' size={40} color="#ff4300" />
              </Button>
            </Col>
            <Col>
            <Button vertical transparent >
              <Icon2 name='circle' size={40} color="#ffa000" />
            </Button>
            </Col>
            <Col>
            <Button vertical transparent>
              <Icon2 name='circle' size={40} color="#a566ce" />
            </Button>
            </Col>
          </Row>
        </Grid>
        
    </Content>

    <Footer>
      <FooterTab>
        <Button vertical active={this.state.tab1} onPress={() => this.toggleTab1()}>
          <Icon active={this.state.tab1} name="apps" />
          <Text >Apps</Text>
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

