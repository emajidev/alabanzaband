import React from "react";
import moment from "moment";
import { FlatGrid } from "react-native-super-grid";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { formatToProcess, convertTimeStamp } from "../functions/FormatDate";
import { withGlobalContext } from "../UserContext";
import Icon from "react-native-vector-icons/AntDesign";

import * as firebase from "firebase/app";
import { db } from "../firebase.js";
var cells = [];
class CalendarTimeline extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {
      cells: [],
      infoTask: [],
      currentMonth: moment(),
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      setTimeout(() => {
        cells = this.generateDates(this.state.currentMonth);
        this.postProcessing(this.props.infoTask, cells);
      }, 800);
    }
  }

  showCells() {
    cells = this.generateDates(this.state.currentMonth);
  }
  changeMonth(next = false) {
    this.setState({ currentMonth: this.state.currentMonth });

    if (next) {
      cells = this.generateDates(this.state.currentMonth.add(1, "months"));
      this.postProcessing(this.props.infoTask, cells);
    } else {
      cells = this.generateDates(this.state.currentMonth.subtract(1, "months"));
      this.postProcessing(this.props.infoTask, cells);
    }
  }
  postProcessing(infoTask, cellProps) {
    if (infoTask.length > 0) {
      let format = this.giveFormat(infoTask, cellProps);
      return format;
    }
    if (infoTask == null) {
      let cells = this.generateDates(cellProps);
      //validation
      return cells;
    }
  }
  componentWillReceiveProps(e) {
    //this.setState({infoTask:e.infoTask})
    //console.log("componentWillReceiveProps is triggered", e)
    setTimeout(() => {
      cells = this.generateDates(this.state.currentMonth);
      this.postProcessing(this.props.infoTask, cells);
    }, 1000);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  intermediateDays(dateStart, dateEnd, uid, colorTag, type) {
    let dates = [];
    // find last date to the month
    // (días * 24 horas * 60 minutos * 60 segundos * 1000 milésimas de segundo)
    let d = 0;
    let day = 1 * (24 * 60 * 60 * 1000);
    for (let i = 1; i < 30; i++) {
      if (dateStart < dateEnd - day) {
        dateStart = dateStart + day;
        //console.log("suma dias2 ", formatToProcess(dateStart), i)
        //dateline iter days
        if (formatToProcess(dateStart) != formatToProcess(dateEnd)) {
          let interDate = {
            title: "",
            date: formatToProcess(dateStart),
            color: colorTag,
            type: type,
            key: uid,
          };
          dates.push(interDate);
        } else {
          break;
        }
      }
    }
    //* console.log("suma dias2 ", dates)
    return dates;
  }
  giveFormat(events, cellProps) {
    //console.log("llego", events)

    let newObj = [];
    let newObj2 = [];

    events.map((item) => {
      let formatDateStart = formatToProcess(item.dateStart);
      let formatDateEnd = formatToProcess(item.dateEnd);
      if (item.type == "repeatDays") {
        let days = this.repeatDays(item.days, item.dateStart, item.dateEnd);
        days.map((rdays) => {
          let repeatDays = {
            title: item.title,
            date: formatToProcess(rdays),
            color: item.colorTag,
            type: "repeatDays",
            key: item.uid,
          };
          newObj.push(repeatDays);
        });
      } else {
        let dateStart = {
          title: item.title,
          date: formatDateStart,
          color: item.colorTag,
          type: "start",
          key: item.uid,
        };
        let dateEnd = {
          title: "",
          date: formatDateEnd,
          color: item.colorTag,
          type: "end",
          key: item.uid,
        };
        let interDays = this.intermediateDays(
          item.dateStart,
          item.dateEnd,
          item.uid,
          item.colorTag,
          "interDay"
        );
        let object = [].concat(dateStart, dateEnd, interDays);
        //console.log("this is object",object)
        object.map((item) => {
          newObj.push(item);
        });
      }
      //console.log("this is inter days",Object.values(object) )
    });
    //console.log("nuevo elemento formateado", newObj)

    if (newObj.length > 0) {
      //console.log("ejecucion",newObj)

      return this.dataLine(newObj, cellProps);
    }
  }
  repeatDays(propsDays, start, end) {
    let dayList = [];
    let repeatDays = propsDays;
    let startWeek = moment(start);
    let endWeek = moment(end);

    let nWeeks = endWeek.diff(startWeek, "days") / 7;

    repeatDays.map((day) => {
      let week = moment(startWeek).startOf("week").day("Sunday");
      week.add(day, "d");
      let month = week.month();
      for (let i = 0; i < nWeeks; i++) {
        dayList.push(week);
        week = week.clone().add(7, "d");
      }
    });
    return dayList;
  }
  generateDates(monthToShow) {
    if (!moment.isMoment(monthToShow)) {
      return null;
    }
    let dateStart = moment(monthToShow).startOf("month");
    let dateEnd = moment(monthToShow).endOf("month");
    let cells = [];
    // find firts date to the month
    for (; 0 != dateStart.day(); ) dateStart.subtract(1, "day");
    for (; 6 != dateEnd.day(); ) dateEnd.add(1, "day");
    do
      cells.push({
        date: moment(dateStart),
        IsInCurrentMonth: dateStart.month() === monthToShow.month(),
        dateLines: [],
      }),
        dateStart.add(1, "day");
    while (dateStart.isSameOrBefore(dateEnd));
    return cells;
  }

  convertDate(dateEvent) {
    let s = dateEvent.split("-");
    let d = new Date();
    d.setFullYear(s[0]);
    d.setMonth(s[1] - 1);
    d.setDate(s[2]);
    let newDate = moment(d).format("YYYY-MM-DD");
    //console.log("newDate",newDate)
    return newDate;
  }

  dataLine(events, cellProps) {
    //console.log("ordered_events2",ordered_events)
    let listDates = [];
    Array.prototype.unique = (function (a) {
      return function () {
        return this.filter(a);
      };
    })(function (a, b, c) {
      return c.indexOf(a, b + 1) < 0;
    });
    // ordenar fecha de eventos
    events.map((event) => {
      let newDate = event.date;
      listDates.push(newDate);
      //console.log("newDate",newDate)
    });
    //console.log("listDates",listDates)
    let uniqueEvent = listDates.unique().sort();
    //console.log("uniqueEvent", uniqueEvent);
    let newListEvent = [];
    uniqueEvent.map((itemEvent) => {
      var filtered = events.filter((item) => item.date === itemEvent);
      //console.log("filtered", filtered);
      let newList = [];
      filtered.map((item) => {
        newList.push(item);
        //console.log("filtro", newList);
      });
      let data = { dateLine: newList, date: itemEvent };
      newListEvent.push(data);
    });
    cellProps.map((a) => {
      newListEvent.map((b) => {
        const c = a.date.format("YYYY-M-D");
        let d = b.date;
        //console.log("match2",d ,c  );

        if (d == c) {
          let c = Object.values(b.dateLine);
          a.dateLines.splice(1, 1, c);
        }
      });
    });

    let listDateLines = [];
    // algoritmo de reordenamiento de espacios entre start y end
    ///////////////////////////////////////////////////////////
    // se mapea las posiciones en que quedaron los timelines sin correcion

    for (var i = 0; i < events.length; i++) {
      return this.corrector(cellProps);
    }
  }
  corrector(listDateLines) {
    let i = 0;
    listDateLines.map((dataLines, index) => {
      // se descartan los dias que no tienen eventos que dan como resultado undefined
      if (dataLines.dateLines != "") {
        //console.log("eventos", index, timeline.dateLines[0])
        //console.log("evento anterior", this.state.cells[index - 1].dateLines[0])
        let newIndex = index == 0 ? 1 : index;
        const arrayParent = listDateLines[newIndex - 1].dateLines[0];
        if (arrayParent != undefined) {
          dataLines.dateLines[0].map((item, indexChild) => {
            const findKey = (element) => element.key == item.key;
            let indexParent = arrayParent.findIndex(findKey);
            if (indexParent >= 0) {
              //console.log("mach3", arrayParent.findIndex(findKey));
              //console.log("comparacion de index", indexParent, indexChild)
              let space = { color: "transparent" };
              // añadimos posiciones hasta colocar el sucesor en la indicada
              if (item.type == "end" || item.type == "interDay") {
                if (indexChild != indexParent) {
                  let initial = indexChild;

                  while (indexParent > initial) {
                    let newLine = [];
                    dataLines.dateLines[0].forEach((itemLine, index) => {
                      if (index === initial) {
                        newLine.push(itemLine);
                        newLine.splice(index, 0, space);
                      } else {
                        newLine.push(itemLine);
                      }
                    });
                    dataLines.dateLines[0] = newLine;
                    initial++;
                  }
                }
              }
            }
          });
        }
      }
    });
  }
  monthSrt(n) {
    let month = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return month[n];
  }
  renderLines(dateline, index) {
    if (dateline[0] != undefined) {
      return dateline[0].map((item) => {
        //console.log("item", item)
        if (item.type == "start") {
          return (
            <View
              style={{
                position: "relative",
                width: "100%",
                height: 15,
                backgroundColor: [item.color],
                marginBottom: 2,
                borderBottomLeftRadius: 50,
                borderTopLeftRadius: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 9,
                  marginLeft: 10,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                {item.title}
              </Text>
            </View>
          );
        } else if (item.type == "end") {
          return (
            <View
              style={{
                position: "relative",
                width: "100%",
                height: 15,
                backgroundColor: [item.color],
                marginBottom: 2,
                borderBottomRightRadius: 50,
                borderTopRightRadius: 50,
              }}
            ></View>
          );
        } else if (item.type === "repeatDays") {
          return (
            <View
              style={{
                position: "relative",
                width: "100%",
                height: 15,
                backgroundColor: [item.color],
                marginBottom: 2,
                borderRadius: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 9,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                {item.title}
              </Text>
            </View>
          );
        } else {
          return (
            <View
              style={{
                position: "relative",
                width: "100%",
                height: 15,
                backgroundColor: [item.color],
                marginBottom: 2,
              }}
            ></View>
          );
        }
      });
    }
  }

  render() {
    //console.log("fecha", cells)
    const deviceDisplay = Dimensions.get("window");
    const deviceHeight = deviceDisplay.height;
    const deviceWidth = deviceDisplay.width;
    const dayNamesShort = [
      "Dom.",
      "Lun.",
      "Mar.",
      "Mie.",
      "Jue.",
      "Vie.",
      "Sab.",
    ];

    return (
      <View style={{ flex: 1, justifyContent: "flex-start" }}>
        <View
          style={{
            height: 50,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              Width: 100,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              this.changeMonth(false);
            }}
          >
            <View
              style={{
                width: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="caretleft" size={20} />
            </View>
          </TouchableOpacity>
          <Text>
            {" "}
            {this.monthSrt(this.state.currentMonth.month())} de{" "}
            {this.state.currentMonth.year()}{" "}
          </Text>
          <TouchableOpacity
            style={{
              Width: 100,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              this.changeMonth(true);
            }}
          >
            <View
              style={{
                width: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="caretright" size={20} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <FlatGrid
            itemDimension={deviceWidth / 8}
            items={dayNamesShort}
            spacing={0}
            renderItem={({ item, index }) => (
              <View
                style={{
                  height: 30,
                  borderColor: "#F7F7F7",
                  borderWidth: 1,
                  borderBottomWidth: 0,
                }}
              >
                <Text style={{ textAlign: "center" }}>{item}</Text>
              </View>
            )}
          />
          <FlatGrid
            itemDimension={deviceWidth / 8}
            items={cells}
            spacing={0}
            renderItem={({ item, index }) => (
              <View style={{ height: 100 }}>
                {!item.IsInCurrentMonth ? (
                  <View
                    style={{
                      textAlign: "center",
                      backgroundColor: "#F7F7F7",
                      color: "#C0C0C0",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        borderColor: "#F1F1F1",
                        borderBottomWidth: 1,
                        color: "#C0C0C0",
                      }}
                    >
                      {item.date.date()}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      textAlign: "center",
                      backgroundColor: "#F7F7F7",
                      color: "#C0C0C0",
                    }}
                  >
                    {moment(item.date).format("YYYY-MM-DD") ===
                    moment().format("YYYY-MM-DD") ? (
                      <Text
                        style={{
                          textAlign: "center",
                          borderColor: "#F7F7F7",
                          borderBottomWidth: 1,
                          color: "#f54",
                          fontWeight: "bold",
                        }}
                      >
                        {item.date.date()}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          textAlign: "center",
                          borderColor: "#F7F7F7",
                          borderBottomWidth: 1,
                        }}
                      >
                        {item.date.date()}
                      </Text>
                    )}
                  </View>
                )}
                <View>{this.renderLines(item.dateLines, index)}</View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}
export default withGlobalContext(CalendarTimeline);
