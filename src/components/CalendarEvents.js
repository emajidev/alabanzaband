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
  Text, TextInput, Dimensions, FindNodeHandle

} from "react-native";
import { withNavigation } from "react-navigation";
import * as firebase from "firebase/app";
let itemsRef = db.ref("/items");
import { db } from "./firebase.js";
import getTheme from "../../native-base-theme/components";
import { withGlobalContext } from './UserContext';
import md5 from 'md5';
import moment from "moment";

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
import { FlatGrid } from 'react-native-super-grid';

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
};
LocaleConfig.defaultLocale = "fr";

const events = [
  {
    data: {
      title: 'hola',
      date: '2020-4-28',
      color: '#56ff',
      type: 'start',
      key: '1234'
    }
  },
  {
    data: {
      date: '2020-4-29',
      color: '#56ff',
      type: 'end',
      key: '1234'
    }
  },
  {
    data: {
      title: 'mundo',
      date: '2020-4-29',
      color: '#82ff',
      type: 'start',
      key: '4321'
    }
  },
  {
    data: {
      date: '2020-4-30',
      color: '#82ff',
      type: 'end',
      key: '4321'
    }
  },

]
let listPos = []
class ColorTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listPos: [],
      listAfter: {}
    }
  }

  convertDate(dateEvent) {
    let s = dateEvent.split('-')
    let d = new Date();
    d.setFullYear(s[0]);
    d.setMonth(s[1] - 1);
    d.setDate(s[2]);
    let newDate = moment(d).format('YYYY-MM-DD')
    return newDate
  }
  posPush(nativeEvent, index, dataEvent, listPos) {
    let data = {

      pos: nativeEvent.layout,
      type: dataEvent.data.type,
      id: index

    }
    listPos.push(data)

  }
  renderLines(dataEvent, index) {

    return (
      <View onLayout={({ nativeEvent }) => {
        this.posPush(nativeEvent, index, dataEvent, listPos)
      }} style={{ position: 'relative', width: '100%', height: 15, backgroundColor: [dataEvent.data.color], marginBottom: 2 }}>
        <Text style={{ fontSize: 9, color: '#fff', textAlign: 'center' }}>{index}</Text>
      </View>
    )
  }
  dataLine(item, index) {

    const dateCalendar = this.props.dateCalendar.format('YYYY-MM-DD')

    let newDate = this.convertDate(item.data.date)

    console.log("date calendar", newDate, dateCalendar)
    if (newDate == dateCalendar) {
      console.log("verdadero")
      if (item.data.type != 'end') {
        return this.renderLines(item, index)
      } else {
        return this.renderLines(item, index)
      }
    }


  }
  componentDidMount() {
  }
  render() {
    const indexCol = this.props.indexCol

    return (
      <View>
        <FlatList
          data={events}
          listKey={(item, index) => 'D' + index.toString()}
          renderItem={({ item, index }) =>
            <View>
              {this.dataLine(item, index)}
            </View>


          }
        />
      </View>
    )
  }
}
let after_list = []
class Calendars extends React.Component {
  contructor(props) {
    this.cells = []
    this.currentMonth = moment()
    this.state = {
      days: [],

    }
  }

  componentDidMount() {
    this.showCells()
    this.dataLine()
  }
  generateDates(monthToShow = moment()) {
    if (!moment.isMoment(monthToShow)) {
      return null;
    }
    let dateStart = moment(monthToShow).startOf('month')
    let dateEnd = moment(monthToShow).endOf('month')
    let cells = []
    // find firts date to the month
    while (dateStart.day() != 0) {
      dateStart.subtract(1, 'day')
    }
    // find last date to the month
    while (dateEnd.day() != 6) {
      dateEnd.add(1, 'day')
    }
    do {
      cells.push({
        date: moment(dateStart),
        IsInCurrentMonth: dateStart.month() === monthToShow.month(),
        dateLines: []
      })
      dateStart.add(1, 'day')
    } while (dateStart.isSameOrBefore(dateEnd))
    return cells
  }
  showCells() {
    this.cells = this.generateDates(this.currentMonth)
    //validation
    console.log("celdas", this.cells)
    if (this.cells === null) {
      console.log("error no es posible generar fechas")
      return
    }
  }


  convertDate(dateEvent) {
    let s = dateEvent.split('-')
    let d = new Date();
    d.setFullYear(s[0]);
    d.setMonth(s[1] - 1);
    d.setDate(s[2]);
    let newDate = moment(d).format('YYYY-MM-DD')
    return newDate
  }

  renderLines(dateline, index) {
    if (dateline[0] != undefined) {
      return dateline[0].map((item) => {
        console.log("renderitem", item)
        return (
          <View style={{ position: 'relative', width: '100%', height: 15, backgroundColor: [item.color], marginBottom: 2 }}>
            <Text style={{ fontSize: 9, color: '#fff', textAlign: 'center' }}>{item.title} {index}</Text>
          </View>
        )
      })
    }
  }
  dataLine() {
    let listDates = []
    Array.prototype.unique = function (a) {
      return function () { return this.filter(a) }
    }(function (a, b, c) {
      return c.indexOf(a, b + 1) < 0
    });


    events.map((event) => {
      let newDate = event.data.date
      listDates.push(newDate)

    })
    let uniqueEvent = listDates.unique().sort()
    let newListEvent = []

    uniqueEvent.map((itemEvent) => {

      var filtered = events.filter(
        (item) => {
          return item.data.date.toLowerCase().indexOf(itemEvent.toLowerCase()) !== -1;
        }
      );
      let newList = []
      filtered.map((item) => {
        data = {
          color: item.data.color,
          title: item.data.title,
          type: item.data.type,
          key: item.data.key
        }
        newList.push(data)

      })
      let data = { dateLine: newList, date: itemEvent }
      newListEvent.push(data)
    })
    console.log("filtro", newListEvent);

    this.cells.map((item) => {
      newListEvent.map((cont) => {

        const dateCalendar = item.date.format('YYYY-MM-DD')
        let newDate = this.convertDate(cont.date)
        if (newDate == dateCalendar) {
          let datLine = Object.values(cont.dateLine)
          // agregango timelines en fechas 
          // falta corregir posiciones para alinear
          item.dateLines.splice(1, 1, datLine)
        }
      })
    })
    console.log("cell final", this.cells)
    let listDateLines = ''
    // algoritmo de reordenamiento de espacios entre start y end
    this.cells.map((timeline, index) => {
      if (timeline.dateLines != '') {
        timeline.dateLines[0].map((item, pos) => {

          if (listDateLines != '') {
            console.log("anterior", listDateLines.item.key, listDateLines.item.type, listDateLines.pos)
            if (listDateLines.pos != pos) {
              console.log("diferente", listDateLines.item.key, listDateLines.item.type, listDateLines.pos, item.key, item.type, pos)
              if (listDateLines.item.key == item.key) {
                console.log("key", listDateLines.item.key, item.key)
                console.log("item", timeline.dateLines[0], pos)
                let space = { color: '#fff' }
                let n = 0;
                while (n < listDateLines.pos) {
                  n++;
                  console.log("posiciones",n)
                  timeline.dateLines[0].unshift(space)
                }

              }
            }
          }

          listDateLines = { item: item, pos: pos }
          console.log("actual", item.key, item.type, pos)

        })

      }
    })

    console.log("correcion", this.cells)
  }
  render() {
    const deviceDisplay = Dimensions.get("window");
    const deviceHeight = deviceDisplay.height;
    const deviceWidth = deviceDisplay.width;
    const dayNamesShort = ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."];


    return (
      <View >
        <View style={{ height: 50 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>calendar</Text>
          </View>
        </View>
        <View>
          <FlatGrid
            itemDimension={deviceWidth / 8}
            items={dayNamesShort}
            spacing={0}
            renderItem={({ item, index }) => (
              <View style={{ height: 30, borderColor: '#F7F7F7', borderWidth: 1, borderBottomWidth: 0 }}>
                <Text style={{ textAlign: 'center' }}>{item}</Text>
              </View>
            )}
          />
          <FlatGrid
            itemDimension={deviceWidth / 8}
            items={this.cells}
            spacing={0}
            renderItem={({ item, index }) => (
              <View style={{ height: deviceHeight / 7, borderColor: '#F7F7F7', borderWidth: 1, borderBottomWidth: 0 }}>
                {!item.IsInCurrentMonth ? (
                  <Text style={{ textAlign: 'center', borderColor: '#F7F7F7', borderBottomWidth: 1, color: '#C0C0C0' }}>{item.date.date()}</Text>
                ) : (
                    <Text style={{ textAlign: 'center', borderColor: '#F7F7F7', borderBottomWidth: 1 }}>{item.date.date()}</Text>

                  )
                }
                <View>
                  {
                    this.renderLines(item.dateLines, index)
                  }
                </View>
              </View>
            )}
          />
        </View>
      </View>
    )
  }
}
export default withGlobalContext(Calendars);

const styles = StyleSheet.create({

});
