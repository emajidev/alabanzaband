import React from "react";
import moment from "moment";
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet, View, FlatList, Text, Dimensions } from "react-native";
import { formatToProcess, convertTimeStamp } from "../functions/FormatDate"
import { withGlobalContext } from '../UserContext';


import * as firebase from "firebase/app";
import { db } from "../firebase.js";
var cells = []
class CalendarTimeline extends React.Component {
    constructor(props) {

        super(props);
        this._isMounted = false;
        this.state = {
            cells: [],
            infoTask:[]
        };

    }


     componentDidMount() {

        this._isMounted = true;
        if (this._isMounted) {
            //console.log("props2",this.props.items)
            cells = this.generateDates(moment())

        }


    }

    postProcessing(infoTask) {
        //console.log("props info task",infoTask)

        if (infoTask.length > 0 ) {
            // console.log("nulo cell")
            let format = this.giveFormat(infoTask)
            return format

        } 
        if(infoTask == null){
        let cells = this.generateDates(moment())
            //validation
            return cells
        }
    }
    componentWillReceiveProps(e) {
        //this.setState({infoTask:e.infoTask})
        //console.log("componentWillReceiveProps is triggered", e.infoTask)
        this.postProcessing(e.infoTask)

        
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    intermediateDays(a, b, uid,colorTag,type) {
        let dateStart = a
        let dateEnd = b
        let dates = []
        // find last date to the month
        // (días * 24 horas * 60 minutos * 60 segundos * 1000 milésimas de segundo) 
        let d = 0
        let day = 1 * (24 * 60 * 60 * 1000);
        for (let i = 1; i < 30; i++) {
            if (dateStart < dateEnd - day) {
                dateStart = dateStart + day
                //console.log("suma dias2 ", formatToProcess(dateStart), i)
                //dateline iter days
                let interDate = {
                    title: '',
                    date: formatToProcess(dateStart),
                    color: colorTag,
                    type: type,
                    key: uid
                }
                dates.push(interDate)
            } else {
                break
            }
          

        }
        //console.log("suma dias2 ", dates)
        return dates


    }
    giveFormat(events) {
        //console.log("llego", events)
        let newObj = []
        let newObj2 = []

        events.map((item) => {
            // console.log("llego", item.event)

            let dateStart = {
                title: item.title,
                date: formatToProcess(item.dateStart),
                color: item.colorTag,
                type: 'start',
                key: item.uid
            }
            let dateEnd = {
                title: '',
                date: formatToProcess(item.dateEnd),
                color: item.colorTag,
                type: 'end',
                key: item.uid
            }
            let interDays = this.intermediateDays(item.dateStart,item.dateEnd,item.uid,item.colorTag,'interDay')
            let object = [].concat(dateStart,dateEnd ,interDays);
            object.map((item)=>{
                newObj.push(item)
            })

            //console.log("this is inter days",Object.values(object) )
        })
        //console.log("nuevo elemento formateado", newObj)
        if (newObj.length > 0) {
            //console.log("ejecucion",newObj)
            cells = this.generateDates(moment())

            return this.dataLine(newObj, cells)


        }


    }
    generateDates(monthToShow = moment()) {
        if (!moment.isMoment(monthToShow)) {
            return null;
        }
        let dateStart = moment(monthToShow).startOf('month')
        let dateEnd = moment(monthToShow).endOf('month')
        let cells = []
        // find firts date to the month
        for (; 0 != dateStart.day();)dateStart.subtract(1, "day"); for (; 6 != dateEnd.day();)dateEnd.add(1, "day"); do cells.push({ date: moment(dateStart), IsInCurrentMonth: dateStart.month() === monthToShow.month(), dateLines: [] }), dateStart.add(1, "day"); while (dateStart.isSameOrBefore(dateEnd));
        return cells
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



    dataLine(events, propsCells) {
        let ordered_events = events
        // console.log("ordered_events2",ordered_events)
        let listDates = []
        Array.prototype.unique = function (a) {
            return function () { return this.filter(a) }
        }(function (a, b, c) {
            return c.indexOf(a, b + 1) < 0
        });
        // ordenar fecha de eventos 
        ordered_events.map((event) => {
            let newDate = event.date
            listDates.push(newDate)
        })
        // console.log("listDates",listDates)
        let uniqueEvent = listDates.unique().sort()
        let newListEvent = []
        uniqueEvent.map(a => { var b = ordered_events.filter(b => -1 !== b.date.toLowerCase().indexOf(a.toLowerCase())); let c = []; b.map(a => { d = { color: a.color, title: a.title, type: a.type, key: a.key }, c.push(d) }); let d = { dateLine: c, date: a }; newListEvent.push(d) });
        //console.log("filtro", newListEvent);
        propsCells.map(a => { newListEvent.map(b => { const c = a.date.format("YYYY-MM-DD"); let d = this.convertDate(b.date); if (d == c) { let c = Object.values(b.dateLine); a.dateLines.splice(1, 1, c) } }) });
        let listDateLines = []
        // algoritmo de reordenamiento de espacios entre start y end
        ///////////////////////////////////////////////////////////
        // se mapea las posiciones en que quedaron los timelines sin correcion

        for (var i = 0; i < events.length; i++) { return this.corrector(propsCells) };
    }
    corrector(listDateLines) {
        let i = 0;
        listDateLines.map((dataLines, index) => {

            // se descartan los dias que no tienen eventos que dan como resultado undefined
            if (dataLines.dateLines != '') {
                //console.log("eventos", index, timeline.dateLines[0])
                //console.log("evento anterior", this.state.cells[index - 1].dateLines[0])
                const arrayParent = listDateLines[index - 1].dateLines[0];
                if (arrayParent != undefined) {

                    dataLines.dateLines[0].map((item, indexChild) => {
                        const findKey = (element) => element.key == item.key;
                        let indexParent = arrayParent.findIndex(findKey)
                        if (indexParent >= 0) {
                            //console.log("mach3", arrayParent.findIndex(findKey));
                            //console.log("comparacion de index", indexParent, indexChild)
                            let space = { color: 'transparent' }
                            // añadimos posiciones hasta colocar el sucesor en la indicada 
                            if (item.type == 'end' || item.type == 'interDay') {

                                if (indexChild != indexParent) {
                                    let initial = indexChild;
                                    while (initial < indexParent) {
                                        dataLines.dateLines[0].unshift(space)
                                        initial++
                                    }

                                }
                            }
                        }


                    })
                }

            }
        })

    }
    renderLines(dateline, index) {
        if (dateline[0] != undefined) {
            return dateline[0].map((item) => {
                return (
                    <View style={{ position: 'relative', width: '100%', height: 15, backgroundColor: [item.color], marginBottom: 2 }}>
                        <Text style={{ fontSize: 9, color: '#fff', textAlign: 'center' }}>{item.title} {/* {index} */}</Text>
                    </View>
                )
            })
        }
    }
    render() {
        const deviceDisplay = Dimensions.get("window");
        const deviceHeight = deviceDisplay.height;
        const deviceWidth = deviceDisplay.width;
        const dayNamesShort = ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."];


        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                <View style={{ height: 50 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>celendario</Text>
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
                        items={cells}
                        spacing={0}
                        renderItem={({ item, index }) => (
                            <View style={{ height: 100 }}>
                                {!item.IsInCurrentMonth ? (
                                    <View style={{ textAlign: 'center', backgroundColor: '#F7F7F7', color: '#C0C0C0' }}>
                                        <Text style={{ textAlign: 'center', borderColor: '#F7F7F7', borderWidth: 1, color: '#C0C0C0' }}>{item.date.date()}</Text>
                                    </View>

                                ) : (
                                        <View style={{ textAlign: 'center', backgroundColor: '#F7F7F7', color: '#C0C0C0' }}>
                                            <Text style={{ textAlign: 'center', borderColor: '#F7F7F7', borderBottomWidth: 1 }}>{item.date.date()}</Text>
                                        </View>

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
export default withGlobalContext(CalendarTimeline);