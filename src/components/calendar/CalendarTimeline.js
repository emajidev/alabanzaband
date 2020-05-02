import React from "react";
import moment from "moment";
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet, View, FlatList, Text, Dimensions } from "react-native";

const configLocal = {
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

const events = [
    {
        title: 'hola',
        date: '2020-4-28',
        color: '#56ff',
        type: 'start',
        key: '1234'

    },
    {
        date: '2020-4-29',
        color: '#56ff',
        type: 'end',
        key: '1234'

    },
    {
        title: 'mundo',
        date: '2020-4-30',
        color: '#82ff',
        type: 'start',
        key: '4321'

    },
    {
        date: '2020-5-1',
        color: '#82ff',
        type: 'end',
        key: '4321'

    },
    {
        title: 'mundo',
        date: '2020-5-3',
        color: '#82ff',
        type: 'start',
        key: '43812'

    },
    {
        date: '2020-5-4',
        color: '#82ff',
        type: 'end',
        key: '43812'

    },


    {
        title: 'mundo',
        date: '2020-4-27',
        color: '#82f',
        type: 'start',
        key: '4621'

    },
    {
        date: '2020-4-28',
        color: '#82f',
        type: 'end',
        key: '4621'

    },

    {
        title: 'mundo',
        date: '2020-5-1',
        color: '#823f',
        type: 'start',
        key: 'coco'

    },
    {
        date: '2020-5-2',
        color: '#823f',
        type: 'end',
        key: 'coco'

    },
    {
        title: 'mundo',
        date: '2020-4-26',
        color: '#82f',
        type: 'start',
        key: '462152'

    },
    {
        date: '2020-4-27',
        color: '#82f',
        type: 'end',
        key: '462152'

    },
    {
        title: 'mundo',
        date: '2020-5-4',
        color: '#f25',
        type: 'start',
        key: '4621521'

    },
    {
        date: '2020-5-5',
        color: '#f25',
        type: 'end',
        key: '4621521'

    },
]
class CalendarTimeline extends React.Component {
    contructor(props) {
        this.cells = []
        this.currentMonth = moment()
        this.state = {
        }
    }

    componentDidMount() {
        this.orderEvents()
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
        for(;0!=dateStart.day();)dateStart.subtract(1,"day");for(;6!=dateEnd.day();)dateEnd.add(1,"day");do cells.push({date:moment(dateStart),IsInCurrentMonth:dateStart.month()===monthToShow.month(),dateLines:[]}),dateStart.add(1,"day");while(dateStart.isSameOrBefore(dateEnd));
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
                return (
                    <View style={{ position: 'relative', width: '100%', height: 15, backgroundColor: [item.color], marginBottom: 2 }}>
                        <Text style={{ fontSize: 9, color: '#fff', textAlign: 'center' }}>{item.title} {index}</Text>
                    </View>
                )
            })
        }
    }
    orderEvents() {
        let findStartFilter = events.filter(start => start.type === 'start');
        let findStart=findStartFilter.sort(function(a,b){if(a>b)return 1;return a.date<b.date?-1:0});
        //console.log("findStart3", findStart)
        let orderPrority = []
        findStart.map(a=>{let b=orderPrority.push(a),c=events.filter(b=>b.key==a.key);c.map(b=>{"start"!=b.type&&b.key==a.key&&orderPrority.push(b)})});
        //console.log("ordenamiento de prioridad", orderPrority)
        let ordered_events = orderPrority
        return ordered_events
        /* findStart.map((evenStart) => {
            let orderStart = orderPrority.push(evenStart)
            //console.log("evenStart", orderStart)
            let eventEndFilter = events.filter(end => end.key == evenStart.key);
            eventEndFilter.map((eventEnd) => {
                if (eventEnd.type != 'start' && eventEnd.key == evenStart.key) {
                    orderPrority.push(eventEnd)
                }
            })
        }) */
     
    }
    dataLine() {
        let ordered_events = this.orderEvents()
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
        let uniqueEvent = listDates.unique().sort()
        let newListEvent = []
        uniqueEvent.map(a=>{var b=ordered_events.filter(b=>-1!==b.date.toLowerCase().indexOf(a.toLowerCase()));let c=[];b.map(a=>{d={color:a.color,title:a.title,type:a.type,key:a.key},c.push(d)});let d={dateLine:c,date:a};newListEvent.push(d)});
        //console.log("filtro", newListEvent);
        this.cells.map(a=>{newListEvent.map(b=>{const c=a.date.format("YYYY-MM-DD");let d=this.convertDate(b.date);if(d==c){let c=Object.values(b.dateLine);a.dateLines.splice(1,1,c)}})});
        let listDateLines = []
        // algoritmo de reordenamiento de espacios entre start y end

        // se mapea las posiciones en que quedaron los timelines sin correcion
        for(var i=0;i<events.length;i++)this.corrector(listDateLines);
    }
    corrector(listDateLines) {
        let n=0;this.cells.map(a=>{""!=a.dateLines&&a.dateLines[0].map((b,c)=>{if(b!=null){if(""!=listDateLines&&listDateLines.pos!=c&&listDateLines.item.key==b.key)for(let b={color:"#fff"};n<listDateLines.pos;)n++,a.dateLines[0].unshift(b);listDateLines={item:b,pos:c}}})});
    }
    render() {
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
export default CalendarTimeline;


