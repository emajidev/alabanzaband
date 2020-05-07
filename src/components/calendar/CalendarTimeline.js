import React from "react";
import moment from "moment";
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet, View, FlatList, Text, Dimensions } from "react-native";

const configLocal = {
    dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."],
};
var cells = ''
class CalendarTimeline extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            cells:[]
        };
  
     }
   

    componentDidMount() {
        this.giveFormat(this.props.items)
        console.log("props2",this.props.items)
        
    }
    giveFormat(events) {
        console.log("llego", events)
        let newObj = []
        events.map((item) => {
            console.log("llego", item.event)

            let dateStart = {
                title: item.event.title,
                date: item.event.dateStart,
                color: item.event.colorTag,
                type: 'start',
                key: item.event.uid
            }
            let dateEnd = {
                title: item.event.title,
                date: item.event.dateEnd,
                color: item.event.colorTag,
                type: 'end',
                key: item.event.uid
            }
            newObj.push(dateStart, dateEnd)
        })
        console.log("nuevo elemento formateado", newObj)
        if(newObj.length >0){
            console.log("ejecucion",newObj)
        this.orderEvents(newObj)
        this.showCells()
        this.dataLine(newObj)
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
    showCells() {
        this.state.cells = this.generateDates(moment())
        //validation
        console.log("celdas", this.state.cells)
        if (this.state.cells === null) {
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
                return (
                    <View style={{ position: 'relative', width: '100%', height: 15, backgroundColor: [item.color], marginBottom: 2 }}>
                        <Text style={{ fontSize: 9, color: '#fff', textAlign: 'center' }}>{item.title} {index}</Text>
                    </View>
                )
            })
        }
    }
    orderEvents(events) {
        console.log("orden de ventos",events)
        let findStartFilter = events.filter(start => start.type === 'start');
        console.log("findStartFilter",findStartFilter)
        let findStart = findStartFilter.sort(function (a, b) { if (a > b) return 1; return a.date < b.date ? -1 : 0 });
        //console.log("findStart3", findStart)
        console.log("findStart",findStart)

        let orderPrority = []
        findStart.map(a => { let b = orderPrority.push(a), c = events.filter(b => b.key == a.key); c.map(b => { "start" != b.type && b.key == a.key && orderPrority.push(b) }) });
        //console.log("ordenamiento de prioridad", orderPrority)
        let ordered_events = orderPrority
        console.log("ordered_events",ordered_events)

        return ordered_events

    }
    dataLine(events) {
        let ordered_events = this.orderEvents(events)
        console.log("ordered_events2",ordered_events)
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
        console.log("listDates",listDates)
        let uniqueEvent = listDates.unique().sort()
        let newListEvent = []
        uniqueEvent.map(a => { var b = ordered_events.filter(b => -1 !== b.date.toLowerCase().indexOf(a.toLowerCase())); let c = []; b.map(a => { d = { color: a.color, title: a.title, type: a.type, key: a.key }, c.push(d) }); let d = { dateLine: c, date: a }; newListEvent.push(d) });
        //console.log("filtro", newListEvent);
        this.state.cells.map(a => { newListEvent.map(b => { const c = a.date.format("YYYY-MM-DD"); let d = this.convertDate(b.date); if (d == c) { let c = Object.values(b.dateLine); a.dateLines.splice(1, 1, c) } }) });
        let listDateLines = []
        // algoritmo de reordenamiento de espacios entre start y end
        ///////////////////////////////////////////////////////////
        // se mapea las posiciones en que quedaron los timelines sin correcion
        for (var i = 0; i < events.length; i++)this.corrector(listDateLines);
    }
    corrector(listDateLines) {
        let n = 0; this.state.cells.map(a => { "" != a.dateLines && a.dateLines[0].map((b, c) => { if (b != null) { if ("" != listDateLines && listDateLines.pos != c && listDateLines.item.key == b.key) for (let b = { color: "#fff" }; n < listDateLines.pos;)n++ , a.dateLines[0].unshift(b); listDateLines = { item: b, pos: c } } }) });
        console.log("listDateLines3",this.state.cells)
        this.setState({cells:this.state.cells})
    }   
    render() {
        console.log("correcion2",cells)
        const deviceDisplay = Dimensions.get("window");
        const deviceHeight = deviceDisplay.height;
        const deviceWidth = deviceDisplay.width;
        const dayNamesShort = ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."];


        return (
            <View style={{ flex: 1 }}>
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
                        items={this.state.cells}
                        spacing={0}
                        renderItem={({ item, index }) => (
                            <View style={{ height: deviceHeight / 8.5 }}>
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
export default CalendarTimeline;


