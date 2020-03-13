import React from 'react';
import {StatusBar, StyleSheet, View, Modal, TouchableOpacity,AsyncStorage,Alert,TouchableHighlight} from 'react-native';

import {YellowBox} from 'react-native';

import List from './List'
import Calendars from './Calendars'
import ListNotification from './ListNotification'
import Contacts from './contacts/ListContacts'
import Icon2 from 'react-native-vector-icons/FontAwesome';
import ItemComponent from '../components/ItemComponent';
import IconsV from 'react-native-vector-icons/AntDesign'; 

import {withNavigation} from 'react-navigation';
import * as firebase from "firebase/app";
let itemsRef = db.ref('/items');
import { db } from './firebase.js';


import { styles } from '../styles/Styles.js';
import getTheme from '../../native-base-theme/components';
import { Container,Content,Text,Card,Tabs,Tab ,TabHeading,CardItem,Header, Left, Body, Right, Button, Icon, Title,Badge,FooterTab,Footer,StyleProvider,Drawer } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';


import SideBar from './sidebar/Sidebar';
import UserContext from './UserContext'

class Home extends React.Component{
  static contextType = UserContext

  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      context:''
    };
  }
  componentDidMount() {
    const user = this.context
    this.setState({context:user})
    console.log("context",user) // { name: 'Tania', loggedIn: true }
  }
  
  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: false
    });
  }
  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false,
      tab5: false

    });
    this.props.navigation.navigate('ListNotification')
  }
  toggleTab3() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false,
      tab5: false

    });
  }
  toggleTab4() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true,
      tab5: false

    });
    this.props.navigation.navigate('List')

  }
  toggleTab5() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: true

    });
   this.props.navigation.navigate('Contacts')
  }
  closeDrawer(){
    this.drawer._root.close()
  };
  openDrawer(){
    this.drawer._root.open()
  };
  render() {
    console.disableYellowBox = true;
    const { user, setUser } = this.context

  return (
    
    <StyleProvider style={getTheme(user.theme)}>


    <Drawer
        ref = {(ref) => {this.drawer = ref;}}
        content = {<SideBar navigator = {this.navigator} />} onClose = {() => this.closeDrawer ()}
        panCloseMask={0}
        >
        
   
    <Container>
      <Header >
      <Left>
        <Button transparent onPress={()=>this.openDrawer()}>
          <Icon name='md-list' />
        </Button>
      </Left>
      <Body>
      <Title>{user.name}</Title>
      </Body>
      <Right>
        <Button transparent onPress={()=>{
            const newUser = { name: 'pepe', loggedIn: true }

            setUser(newUser)
        }}>
          <Icon name='search' />
        </Button>
      </Right>
    </Header>
    
        <Tabs tabBarPosition={'bottom'}>
          <Tab heading={ <TabHeading><Icon name="ios-easel" /></TabHeading>}>
            <Calendars/>
          </Tab>
          <Tab heading={ <TabHeading><Icon name="md-bookmark" /></TabHeading>}>
            <ListNotification />
          </Tab>
          <Tab  heading={
          <Button vertical active={this.state.tab3=true}>
            <Icon style={{ fontSize: 40 }} name="ios-add-circle" />
          </Button>}>
          </Tab>
          <Tab heading={ <TabHeading><Icon name="md-musical-note" /></TabHeading>}>
            <List/>
          </Tab>
          <Tab heading={ <TabHeading><Icon name="md-person" /></TabHeading>}>
            <Contacts/>
            </Tab>
        </Tabs>
    
    </Container>
    </Drawer>
  </StyleProvider>



  );
  }
}
export default withNavigation(Home);

