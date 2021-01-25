import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
} from "react-native";
import Masonry from "react-native-masonry-layout";
import moment from "moment";
import Icon from "react-native-vector-icons/AntDesign";
import { withNavigation } from "react-navigation";

class ScheduleEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoTask: [],
      currentMonth: moment(),
    };
  }
  monthSrt() {
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
    return month[this.state.currentMonth.month()];
  }
  changeMonth(next = false) {}

  componentDidMount() {
    //this.refs.masonry.clear();
    console.log("se limpio")

    //this.refs.masonry.addItems(this.props.infoTask);
    //console.log("infoTask",this.props.infoTask)
  }
  componentWillReceiveProps(e) {
    //this.setState({infoTask:e.infoTask})
/*     console.log("recibe props",this.props.infoTask);
    this.refs.masonry.addItems(this.props.infoTask); */

    //console.log("componentWillReceiveProps is triggered", e)
    //this.refs.masonry.clear();
   if(this.state.infoTask.length != e.infoTask.length){
    this.refs.masonry.clear();
      this.setState({infoTask:e.infoTask})
      
   }else{
     return
   }
    
    setTimeout(() => {
      this.refs.masonry.addItems(this.state.infoTask);
      console.log("se llamo infotask")
    }, 1000);

  }
  viewerNotifications(info) {
    this.props.navigation.navigate("ViewerNotification", { infoEvent: info });
  }
  render() {
    const deviceDisplay = Dimensions.get("window");
    const deviceHeight = deviceDisplay.height;
    const deviceWidth = deviceDisplay.width;

    return (
      <View>
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
          <Text>Programacion mes {this.monthSrt()}</Text>
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
          <Masonry
            ref="masonry"
            columns={3} // optional - Default: 2
            renderItem={(item) => (
              <TouchableOpacity
                onPress={() => this.viewerNotifications(item)}>
                <View style={[styles.masonry_container,{ backgroundColor: [item.colorTag]}]}>
                  <Text>{item.day}</Text>
                  <Text>{item.title}</Text>
                  <Text style={{ fontSize: 12 }}>
                    Inicia: {item.dateStart}
                  </Text>
                  <Text style={{ fontSize: 12 }}>
                    Finaliza: {item.dateEnd}
                  </Text>
                  <Text style={{ fontSize: 12 }}>{item.note}</Text>
                  <FlatList
                    data={item.member}
                    listKey={moment().valueOf().toString()}
                    renderItem={({ item }) => (
                    
                        <Text style={styles.name_member}>{item}</Text>
                      
                    )}
                  />
                  
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
}
export default withNavigation(ScheduleEvents);

const styles = StyleSheet.create({
  masonry_container: {
    flex:1,
    paddingTop:10,
    justifyContent:"center",
    alignItems:"center",
    margin:3,
    padding:10
  },
  name_member: {
    width: "100%",
    height: 20,
  },
});
