import React from 'react';
import { StatusBar,StyleSheet, View, Modal, TouchableOpacity,AsyncStorage,Alert,TouchableHighlight} from 'react-native';
import {YellowBox} from 'react-native';
import List from './List.js'
/* import Icon from 'react-native-vector-icons/Feather';
 */import Icon2 from 'react-native-vector-icons/FontAwesome';
import ItemComponent from '../components/ItemComponent';

import IconsV from 'react-native-vector-icons/AntDesign'; 

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
import { Container,Content,Text, Header, Left, Body, Right, Button, Icon, Title,Badge,FooterTab,Footer,StyleProvider,Drawer } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import {CalendarList} from 'react-native-calendars';

import SideBar from './Sidebar';

import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo ','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene.','Feb.','Marz','Abr','May','Jun','Jul.','Ago','Sept.','Oct.','Nov.','Dic.'],
  dayNames: ['Domingo','Lunes','Martes','Miercoles','Juevez','Viernes','Sabado'],
  dayNamesShort: ['Dom.','Lun.','Mar.','Mie.','Jue.','Vie.','Sab.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';
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
  componentDi
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
  }
  toggleTab5() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: true

    });
  }
  closeDrawer(){
    this.drawer._root.close()
  };
  openDrawer(){
    this.drawer._root.open()
  };
  render() {
    console.disableYellowBox = true;

  return (
    <StyleProvider style={getTheme(this.state.theme)}>
    <Drawer
        ref = {(ref) => {this.drawer = ref;}}
        content = {<SideBar navigator = {this.navigator} />} onClose = {() => this.closeDrawer ()}
        panCloseMask={0}
        >
        
   
    <Container>
      <Header>
      <Left>
        <Button transparent onPress={()=>this.openDrawer()}>
          <Icon name='md-list' />
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


 
   <CalendarList
          horizontal = { true }
          pagingEnabled = { true }

          current={'2012-05-16'}
                  // Callback which gets executed when visible months change in scroll view. Default = undefined
          onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Enable or disable scrolling of calendar list
          scrollEnabled={true}
          // Enable or disable vertical scroll indicator. Default = false
          showScrollIndicator={true}
          hideExtraDays={false}
          
          style={{borderBottomWidth: 1, borderBottomColor: 'lightgrey'}}
          markingType={'custom'}
          markedDates={{
            '2014-02-5': {
              customStyles: {
                container: {
                  backgroundColor: 'green'
                },
                text: {
                  color: 'black',
                  fontWeight: 'bold'
                }
              }
            },
            '2014-02-10': {
              customStyles: {
                container: {
                  backgroundColor: 'blue',
                  elevation: 2
                },
                text: {
                  color: 'white'
                }
              }
            }
          }}
    
         
          
        />
    <Footer>
      <FooterTab>
        <Button vertical active={this.state.tab1} onPress={() => this.toggleTab1()}>
          <Icon active={this.state.tab1} name="ios-easel" />
          <Text style={{ fontSize: 12}}>Crono</Text>
        </Button>
        <Button vertical active={this.state.tab2} onPress={() => this.toggleTab2()}>
          <Icon active={this.state.tab2} name="md-bookmark" />
          <Text style={{ fontSize: 12}}>Agen</Text>
        </Button>
        <Button vertical active={this.state.tab3=true}>
          <Icon style={{ fontSize: 40 }} name="ios-add-circle" />
        </Button>
        <Button vertical active={this.state.tab4} onPress={() => this.toggleTab4()}>
          <Icon active={this.state.tab3} name="md-musical-note" />
          <Text style={{ fontSize: 12}}>Songs</Text>
        </Button>
        <Button vertical active={this.state.tab5} onPress={() => this.toggleTab5()}>
          <Icon active={this.state.tab4} name="md-person" />
          <Text style={{ fontSize: 12}}>Amigos</Text>
        </Button>
      </FooterTab>
    </Footer>
     
    </Container>
    </Drawer>
  </StyleProvider>



  );
  }
}
export default withNavigation(Navbar);

