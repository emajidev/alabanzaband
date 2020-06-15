import React from "react";
import {
  StatusBar,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  TouchableHighlight
} from "react-native";
import { withNavigation } from "react-navigation";
import * as firebase from "firebase/app";
let itemsRef = db.ref("/items");
import { db } from "./firebase.js";
import getTheme from "../../native-base-theme/components";
import { withGlobalContext } from './UserContext';
import {select}from './SqliteDateBase'

import {
  Container,
  Content,
  Text,
  Card,
  Tabs,
  Tab,
  TabHeading,
  CardItem,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Badge,
  FooterTab,
  Footer,
  StyleProvider,
  Drawer
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { CalendarList } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";

import UserContext from "./UserContext";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo ",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ],
  monthNamesShort: [
    "Ene.",
    "Feb.",
    "Marz",
    "Abr",
    "May",
    "Jun",
    "Jul.",
    "Ago",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dic."
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Juevez",
    "Viernes",
    "Sabado"
  ],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = "fr";

class Calendars extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      dataAgenda: 'No hay programacion para hoy',
      dataSourceTask:''
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount() {
    const user = this.context;
    this.setState({ context: user });
/*     console.log("context", user); // { name: 'Tania', loggedIn: true }
 */    let dateToDo = select()
 .then((data)=>{
  this.setState({dataSourceTask:data})
  //console.log("bd task",data)
})

       
     

  }
  onDayPress(e) {
    this.setModalVisible(true)
    this.setState({ dataAgenda: e.day })
    //console.log("dia", e);
  }
  render() {
    console.disableYellowBox = true;
    let theme=this.props.global.color.theme;
    let task=this.state.dataSourceTask;
    console.log("task",task)
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false)
            }}>
            <View style={{ marginTop: 22 }}>
              <View>
                <Text>Hello World!</Text>
                <Text>{this.state.dataAgenda}</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <Content>
            <CalendarList
              onDayPress={e => this.onDayPress(e)}
              onRefresh={() => console.log('refreshing...')}
              // Set this true while waiting for new data from a refresh
              refreshing={true}
              // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
              onVisibleMonthsChange={months => {
                console.log("now these months are visible", months);
              }}
              // Max amount of months allowed to scroll to the past. Default = 50
              pastScrollRange={5}
              // Max amount of months allowed to scroll to the future. Default = 50
              futureScrollRange={5}
              // Enable or disable scrolling of calendar list
              scrollEnabled={true}
              // Enable or disable vertical scroll indicator. Default = false
              // Do not show days of other months in month page. Default = false
              hideExtraDays={false}
              showScrollIndicator={true}
              markedDates={
                task
              }
              // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
              markingType='multi-period'
           

            />
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
export default withGlobalContext(Calendars) ;
