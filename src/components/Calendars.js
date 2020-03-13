import React from 'react';
import {StatusBar, StyleSheet, View, Modal, TouchableOpacity,AsyncStorage,Alert,TouchableHighlight} from 'react-native';
import {withNavigation} from 'react-navigation';
import * as firebase from "firebase/app";
let itemsRef = db.ref('/items');
import { db } from './firebase.js';
import getTheme from '../../native-base-theme/components';
import { Container,Content,Text,Card,Tabs,Tab ,TabHeading,CardItem,Header, Left, Body, Right, Button, Icon, Title,Badge,FooterTab,Footer,StyleProvider,Drawer } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {CalendarList} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import UserContext from './UserContext'

LocaleConfig.locales['fr'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo ','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene.','Feb.','Marz','Abr','May','Jun','Jul.','Ago','Sept.','Oct.','Nov.','Dic.'],
  dayNames: ['Domingo','Lunes','Martes','Miercoles','Juevez','Viernes','Sabado'],
  dayNamesShort: ['Dom.','Lun.','Mar.','Mie.','Jue.','Vie.','Sab.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

class Calendars extends React.Component{
  static contextType = UserContext

  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
    const user = this.context
    this.setState({context:user})
    console.log("context",user) // { name: 'Tania', loggedIn: true }
  }
  
  render() {
    console.disableYellowBox = true;
    const { user, setUser } = this.context

  return (
    
    <StyleProvider style={getTheme(user.theme)}>
    <Container>
     
          <Content>
    <CalendarList
          onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={5}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={5}
          // Enable or disable scrolling of calendar list
          scrollEnabled={true}
          // Enable or disable vertical scroll indicator. Default = false
          showScrollIndicator={true}
          style={{borderBottomWidth: 1, borderBottomColor: 'lightgrey',height:'95%',marginTop:'5%'}}
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
    </Content>
    
    </Container>
  </StyleProvider>



  );
  }
}
export default Calendars;

