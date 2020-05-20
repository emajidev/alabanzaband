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
    orderEvents() {
        let findStartFilter = events.filter(start => start.type === 'start');

        let findStart = findStartFilter.sort(function (o1, o2) {
            if (o1 > o2) { //comparación lexicogŕafica
                return 1;
            } else if (o1.date < o2.date) {
                return -1;
            }
            return 0;
        });

        //console.log("findStart3", findStart)
        let orderPrority = []
        findStart.map((evenStart) => {
            let orderStart = orderPrority.push(evenStart)
            //console.log("evenStart", orderStart)
            let eventEndFilter = events.filter(end => end.key == evenStart.key);
            eventEndFilter.map((eventEnd) => {
                if (eventEnd.type != 'start' && eventEnd.key == evenStart.key) {
                    orderPrority.push(eventEnd)
                }
            })
        })
        //console.log("ordenamiento de prioridad", orderPrority)
        let ordered_events = orderPrority
        return ordered_events
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
        uniqueEvent.map((itemEvent) => {
            var filtered = ordered_events.filter(
                (item) => {
                    return item.date.toLowerCase().indexOf(itemEvent.toLowerCase()) !== -1;
                }
            );
            let newList = []
            filtered.map((item) => {
                data = {
                    color: item.color,
                    title: item.title,
                    type: item.type,
                    key: item.key
                }
                newList.push(data)

            })
            let data = { dateLine: newList, date: itemEvent }
            newListEvent.push(data)
        })
        //console.log("filtro", newListEvent);
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
        let listDateLines = []
        // algoritmo de reordenamiento de espacios entre start y end

        // se mapea las posiciones en que quedaron los timelines sin correcion
        for (var i = 0; i < events.length; i++) {
            this.corrector(listDateLines)
        }
    }
    corrector(listDateLines) {
        let n = 0;

        this.cells.map((timeline, index) => {
            // se descartan los dias que no tienen eventos que dan como resultado undefined
            if (timeline.dateLines != '') {
                timeline.dateLines[0].map((item, pos) => {
                    if (item != undefined) {
                        // para la impera iteracion debe comenzar distinto de nulo si no dara error de objeto no existente
                        if (listDateLines != '') {
                            console.log("anterior2", listDateLines.item.key, listDateLines.item.type, listDateLines.pos)
                            // se compara la posicion de predecesor con el sucesor y si son diferentes hay que corregir para alinear
                            if (listDateLines.pos != pos) {
                                //  console.log("diferente", listDateLines.item.key, listDateLines.item.type, listDateLines.pos, item.key, item.type, pos)
                                // comparamos si ambos pertenecen al mismo evento
                                if (listDateLines.item.key == item.key) {
                                    console.log("--------- correcion1 -------------")
                                    console.log("key", listDateLines.item.key, item.key, pos)
                                    let space = { color: '#fff' }

                                    // añadimos posiciones hasta colocar el sucesor en la indicada 
                                    while (n < listDateLines.pos) {
                                        n++;
                                        console.log("posiciones1", n, timeline.dateLines[0])
                                        timeline.dateLines[0].unshift(space)
                                    }

                                }
                            }
                        }

                        listDateLines = { item: item, pos: pos }
                        console.log("actual", item.key, item.type, pos)
                    }
                })

            }
        })
        console.log("correjido", this.cells)
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
export default CalendarTimeline;


