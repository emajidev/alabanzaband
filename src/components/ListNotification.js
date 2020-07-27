import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  Alert

} from "react-native";
import { withNavigation } from "react-navigation";

import { withGlobalContext } from './UserContext';
import {chanelNotifications,SendNotifications} from './notifications/Notifications'
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
import { LocaleConfig } from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome5";


import UserContext from "./UserContext";
import {showFormatHumman} from "./functions/FormatDate";
import { changeStatus } from './functions/functionsFirebase'

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
    this.setBadge = this.setBadge.bind(this)
    this.state = {
      isModalVisible: false,
      dataAgenda: 'No hay programacion para hoy',
      dataSourceTask: '',
      infoTask:[{}],
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
  setBadge(){
  this.props.setBadge(false)
}
  componentDidMount() {
    chanelNotifications()
    this.setState({infoTask:this.props.infoTask})
    this.setBadge()
    this.currentDate()
    this.intervalID = setInterval(
      () => this.clock(),
      1000
    );


  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  componentWillReceiveProps(e) {
    this.setState({infoTask:e.infoTask})
    //console.log("componentWillReceiveProps is triggered", e.infoTask)

    
}
  viewerNotifications(info){
    this.props.navigation.navigate("ViewerNotification",{infoEvent:info});
  }
  async successful(item){
    try {
      let response = await changeStatus(this.props.global.account,item.id,'accept');
      SendNotifications()
    } catch(e) {
      console.log(e); // 30
      Alert.alert("ha ocurrido un error en la conexion! ");
    }
  }
  
  render() {
    console.disableYellowBox = true;
    let theme = this.props.global.color.theme;
    return (
      <Container>
      {/* <Image
        style={styles.backgroundImg}
        source={require('#')}
      /> */}
        <View style={styles.notes}>
          <View style={styles.notes_notes}>
            <Text style={styles.notes_text}>Leyenda de eventos</Text>
            <View style={{ height: '100%', paddingRight: 20 }}>
              <FlatList
                data={this.state.infoTask}
                nestedScrollEnabled={true}
                renderItem={({ item }) =>
                  (item.accepted =='accept') ? (
                    <TouchableOpacity style={{ marginBottom: 20 ,width:450,backgroundColor:'#fff',opacity:.8}}
                    onPress={() =>this.viewerNotifications(item)}
                  >
                    <View style={{ width: '100%', height: 60, flexDirection: 'row' }}>
                      <View style={{ width: 5, height: '100%', backgroundColor: [item.colorTag], marginRight: 10 }} />
                      <View>
                        <Text style={{ fontSize: 12 }} >{item.title}</Text>
                        <Text style={{ fontSize: 12 }} >Inicia: {showFormatHumman(item.dateStart)}</Text>
                        <Text style={{ fontSize: 12 }} >Finaliza: {showFormatHumman(item.dateEnd)}</Text>
                        <Text style={{ fontSize: 12 }} >{item.note}</Text>
                      </View>
                      <View style={{ height: '100%',width:100,alignItems:'center',justifyContent:'center'}} >
                     
                      </View>
                    </View>
                  </TouchableOpacity>
                  ):(
                    <View style={{ width: '100%', height: 60,marginBottom: 20 , flexDirection: 'row' }}>
                      <View style={{ width: 5, height: '100%', backgroundColor: [item.colorTag], marginRight: 10 }} />
                      <View>
                        <Text style={{ fontSize: 12 }} >{item.title}</Text>
                        <Text style={{ fontSize: 12 }} >Inicia: {showFormatHumman(item.dateStart)}</Text>
                        <Text style={{ fontSize: 12 }} >Finaliza: {showFormatHumman(item.dateEnd)}</Text>
                        <Text style={{ fontSize: 12 }} >{item.note}</Text>
                      </View>
                      <View style={{ height: '100%',width:100,alignItems:'center',justifyContent:'center'}} >
                      <Text style={{marginBottom:3,color:[item.colorTag]}}>Participar</Text>
                      <View style={{flexDirection:'row'}}>
                      <TouchableOpacity style={{height:40,width:40,justifyContent:'center',alignItems:'center',backgroundColor:[item.colorTag],borderBottomLeftRadius:10,borderTopLeftRadius:10}}
                      onPress={()=>{
                        this.successful(item)
                        }}
                      > 
                      <Text style={{color:'#fff'}}>si</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{height:40,width:40,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:[item.colorTag]}}
                      onPress={()=>changeStatus(this.props.global.account,item.id,'denied')}
                      >
                        <Text style={{color:[item.colorTag]}}>No</Text>
                      </TouchableOpacity>
                      </View>
                      
                      </View>
                    </View>
                  )
                  
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
export default withGlobalContext(withNavigation(ListNotification));


const styles = StyleSheet.create({
  backgroundImg:{
    position:'absolute',
    bottom:0,
    height:200,
    opacity:.8,
    right:0

  },
  notes: {
    marginTop: 10,
    marginBottom:30,
    padding: 20,
  
    flexDirection: 'row',
    height: '100%'
  },
  notes_notes: {
    flex: 3,
    
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
