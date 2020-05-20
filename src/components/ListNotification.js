import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  TouchableHighlight,
  FlatList, TouchableWithoutFeedback,
  Text, TextInput

} from "react-native";
import { withNavigation } from "react-navigation";
import * as firebase from "firebase/app";
let itemsRef = db.ref("/items");
import { db } from "./firebase.js";
import getTheme from "../../native-base-theme/components";
import { withGlobalContext } from './UserContext';
import md5 from 'md5';

import {
  Container,
  Content,
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
  Title,
  Badge,
  FooterTab,
  Footer,
  StyleProvider,
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { CalendarList, Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/FontAwesome";

import Modal from 'react-native-modal';

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

class ListNotification extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      dataAgenda: 'No hay programacion para hoy',
      dataSourceTask: '',
      infotask: '',
      dateCurrent: '',
      day: '',
      hour: '',
      weekDay: '',
      infoEventModal: { event: '' }
    };
  }
 
  clock() {
    var date = new Date().getDate(); //Current Date
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    this.setState({
      hour: hours + ':' + min
    })
    if (this.state.hour == '00:00') {
      this.setState({
        day: date
      })
    }
  }
  currentDate() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      //Setting the value of the date time
      dateCurrent:
        date + '/' + month + '/' + year + ' ',
    });

    var fecha = new Date();
    this.setState({
      day: date
    })
    var semana = ["DOMINGO.", "LUNES.", "MARTES.", "MIÈRCOLES.", "JUEVES.", "VIERNES.", "SABADO."];
    this.setState({
      weekDay: semana[fecha.getDay()]
    })
  }
  
  getUnique(arr, comp) {

    const unique = arr.reverse()
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);

    return unique;
  }

  async processDataEvent() {

    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        // We have data!!
        let data = JSON.parse(value)
        let userMd5 = md5(data.user)
        let itemsRef = db.ref('/users/user' + userMd5 + '/' + 'events')
        itemsRef.on('value', snapshot => {
          let data = snapshot.val();
          if (data != null) {
            let obj = Object.values(data)
            this.setState({ infotask: obj })
          }
        })

      } else {
        console.log("nullstore");
      }

    } catch (e) {
      // error reading value
      console.log("error en list eventos", e)
    }
  }
  componentDidMount() {
    this.processDataEvent()
    this.currentDate()
    this.intervalID = setInterval(
      () => this.clock(),
      1000
    );


  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  render() {
    console.disableYellowBox = true;
    let theme = this.props.global.user.theme;
    return (
      <Container>
        <View style={styles.notes}>
          <View style={styles.notes_notes}>
            <Text style={styles.notes_text}>Leyenda de eventos</Text>
            <View style={{ height: '90%', paddingRight: 20 }}>
              <FlatList
                data={this.state.infotask}
                nestedScrollEnabled={true}
                renderItem={({ item }) =>
                  <TouchableOpacity style={{ marginBottom: 10 ,width:200}}
                    onPress={() =>this.dataInfoEvent(item)}
                  >
                    <View style={{ width: '100%', height: 60, flexDirection: 'row' }}>
                      <View style={{ width: 5, height: '100%', backgroundColor: [item.event.colorTag], marginRight: 10 }} />
                      <View>
                        <Text style={{ fontSize: 12 }} >{item.event.title}</Text>
                        <Text style={{ fontSize: 12 }} >Inicia: {item.event.dateStart}</Text>
                        <Text style={{ fontSize: 12 }} >Finaliza: {item.event.dateEnd}</Text>
                        <Text style={{ fontSize: 12 }} >{item.event.note}</Text>
                      </View>
                      <View style={{ height: '100%',width:100,alignItems:'center',justifyContent:'center'}} >
                    {/* <Icon2 name="check-circle" size={25} color={"rgba(80,227,194,1)"} />
                        <Icon2 name="times-circle" size={25} color={"rgba(250,45,115,1)"} /> 
                      */}
                      </View>
                    </View>
                  </TouchableOpacity>
                }
              />
            </View>
          </View>
          <View style={[styles.notes_selected_date]}>
            <Text style={styles.small_text}>{this.state.hour}</Text>
            <Text style={styles.big_text}>{this.state.day}</Text>
            <View style={styles.inline}>
              <Icon name="guitar" size={20} color="#888" />
              <Text style={styles.small_text}> {this.state.weekDay}</Text>
            </View>
          </View>
        </View>
      </Container>

    );
  }
}
export default withGlobalContext(ListNotification);


const styles = StyleSheet.create({
  notes: {
    marginTop: 10,
    padding: 20,
    borderColor: '#F5F5F5',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#ffff',
    height: '100%'
  },
  notes_notes: {
    flex: 3
  },
  notes_text: {
    fontSize: 18,
    marginBottom: 20,
  },
  notes_selected_date: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'column'
  },
  small_text: {
    fontSize: 15
  },
  big_text: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  inline: {
    flexDirection: 'row'
  },
});
