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
import Icon2 from "react-native-vector-icons/FontAwesome5";
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

class Calendars extends React.Component {
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
  toggleModal = (item) => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  dataInfoEvent = (item)=>{this.setState({ infoEventModal: item }),this.toggleModal()}

  onDayPress(e) {
    this.setState({ dataAgenda: e.day })
    console.log("dia", e);
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
  preProcessingEvent(results) {

    let list_dates = [];
    //1 eliminamos la fechas repetidas 
    results.map((data, index) => {
      list_dates.push(data.event.dateStart, data.event.dateEnd)
    });
    // 2 limpiar valores repetidos
    Array.prototype.unique = function (a) {
      return function () { return this.filter(a) }
    }(function (a, b, c) {
      return c.indexOf(a, b + 1) < 0
    });

    console.log("List dates events no repeact", list_dates.unique().sort());
    //3 agrupamos

    let list_ev = []
    list_dates.unique().sort().map((date, index) => {
      let group = []
      let counterPost = 0
      results.map((data, index) => {
        console.log("fecha", date, data.event.dateStart)
        if (date == data.event.dateStart) {
          let tag = { color: data.event.colorTag, id: data.event.uid, type: "dateStart" }
          console.log("postion", data.event.uid, counterPost++)
          group.push(tag)
        }
        if (date == data.event.dateEnd) {
          let tag = { color: data.event.colorTag, id: data.event.uid, type: "dateEnd" }
          group.push(tag)
        }
      })
      let obj = {
        [date]: {
          periods: group
        }
      }
      list_ev.push(obj)
    })
    console.log("cosa", list_ev)
    //4 Buscamos las posiciones las fechas iniciales 
    let position = []
    results.sort().map((data, index) => {
      console.log("iteracion", data.event.uid)
      list_ev.map((array) => {

        const element = Object.values(array)
        element.map((el) => {
          const foundIndex = el.periods.findIndex(element => element.type == "dateStart")
          const found = el.periods.find(element => element.type == "dateStart")
          if (found != undefined) {
            let el = { id: found.id, pos: foundIndex }
            position.push(el)
          }

        })

      })

    })
    //5 aplicamos el mismo procedimiento que en 3 pero creamos esta vez un array con las posiciones 
    // se crea columna de 5filas que sera los maximo, despues de esto podremos aplicar los splice 
    let newlist_ev = []
    let sequens = []

    list_dates.unique().sort().map((date, index) => {
      let newgroup = [{ color: 'transparent' }, { color: 'transparent' }, { color: 'transparent' }, { color: 'transparent' }, { color: 'transparent' }]
      results.sort().map((data, index) => {
        console.log("fecha", date, data.event.dateStart)
        if (date == data.event.dateStart) {
          const postIdElements = this.getUnique(position, 'id')
          const foundPosition = postIdElements.find(element => element.id == data.event.uid)
          console.log("found post", foundPosition)
          if (newgroup[foundPosition.pos].color == "transparent") {
            console.log("es transparente")
            let tag = { color: data.event.colorTag, id: data.event.uid, type: "dateStart", pos: foundPosition.pos }

            newgroup.splice(foundPosition.pos, 0, tag);
            sequens.push({ id: data.event.uid, type: "dateStart", pos: foundPosition.pos })
          } else {
            console.log("ocupado")
            let tag = { color: data.event.colorTag, id: data.event.uid, type: "dateStart", pos: foundPosition.pos + 1 }

            newgroup.splice(foundPosition.pos + 1, 0, tag);
            sequens.push({ id: data.event.uid, type: "dateStart", pos: foundPosition.pos + 1 })

          }


        }
        else if (date == data.event.dateEnd) {
          const sucesion = this.getUnique(sequens, 'id')

          console.log("new", data.event.dateStart, sequens)

          const postIdElements = this.getUnique(sucesion, 'id')
          const foundPosition = postIdElements.find(element => element.id == data.event.uid)
          let tag = { color: data.event.colorTag, id: data.event.uid, type: "dateEnd", pos: foundPosition.pos }

          newgroup.splice(foundPosition.pos, 0, tag);
          console.log("newgroup", index, newgroup)

        }
      })
      let obj = {
        [date]: {
          periods: newgroup
        }
      }
      newlist_ev.push(obj)
    })
    console.log("newlist-ev", newlist_ev)
    let val = ''
    //6 se crea un solo objeto que contiene los las fechas con sus periods
    newlist_ev.map((data) => {
      console.log("data map", data)
      let newdata = JSON.stringify(data)
      let str = newdata.substring(1, newdata.length - 1)
      val = val.concat([str] + ',')

    })
    let newstr = val.substring(0, val.length - 1)
    let finalVal = "{" + newstr + "}"
    console.log("nuevos tags", finalVal)

    //7 y ULTIMO. Se imprime en un estado para ser usado 
    this.setState({ dataSourceTask: JSON.parse(finalVal) })


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
            console.log("eventos", obj)
            this.setState({ infotask: obj })
            this.preProcessingEvent(obj)
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
    let task = {
      '2020-04-22': {
        periods: [
          { color: '#ffa500', pos: 1 },
          { color: '#ffa500', pos: 1 },
        ]
      },
      '2020-04-23': {
        periods: [
          { color: '#ffa500', pos: 1 },
          { color: '#ffa500', pos: 1 },
        ]
      },

    }
    let json = JSON.stringify(task)
    let final = json.length
    let str = json.substring(1, final - 1)
    return (
      <Container>
        <Modal
          style={{ flex: 1, alignItems: 'center' }}
          isVisible={this.state.isModalVisible}
          customBackdrop={
            <TouchableWithoutFeedback onPress={this.toggleModal} >
              <View style={{ flex: 1, backgroundColor: '#000' }} />
            </TouchableWithoutFeedback>
          }>

          <View style={{ width: '80%', height: '50%', backgroundColor: '#fff' }}>
            { this.state.infoEventModal != null ? (
              <Text>I am the modal content! {this.state.infoEventModal.event.title}</Text>
          ) : (
                console.log("infoEventModal nulo")
              )

            }
          </View>
        </Modal>

        <Calendar
          // Enable horizontal scrolling, default = false
          style={{
            width: '100%',
            overflow: 'hidden',
          }}
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={true}
          // Set custom calendarWidth.

          onRefresh={() => console.log('refreshing...')}
          // Set this true while waiting for new data from a refresh
          refreshing={true}
          // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
          onVisibleMonthsChange={months => {
            console.log("now these months are visible", this.state.dateCurrent);
          }}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={false}
          markedDates={
            this.state.dataSourceTask
          }
          // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
          markingType='multi-dot'
        />
        <View style={styles.notes}>
          <View style={styles.notes_notes}>
            <Text style={styles.notes_text}>Leyenda de eventos</Text>
            <View style={{ height: 250, paddingRight: 20 }}>
              <FlatList
                data={this.state.infotask}
                nestedScrollEnabled={true}
                renderItem={({ item }) =>
                  <TouchableOpacity style={{ marginBottom: 10 }}
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
              <Icon2 name="guitar" size={20} color="#888" />
              <Text style={styles.small_text}> {this.state.weekDay}</Text>
            </View>
          </View>
        </View>
      </Container>

    );
  }
}
export default withGlobalContext(Calendars);


const styles = StyleSheet.create({
  notes: {
    marginTop: 10,
    padding: 20,
    borderColor: '#F5F5F5',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
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
