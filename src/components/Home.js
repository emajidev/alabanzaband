import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";

import { YellowBox } from "react-native";
import ListSong from "./ListSong";
import CalendarEvents from "./CalendarEvents";
import PublishContent from "./community/PublishContent";
import Contacts from "./contacts/Contacts";
import Icon2 from "react-native-vector-icons/FontAwesome";
import IconDirector from "react-native-vector-icons/Entypo";
import ItemComponent from "../components/ItemComponent";
import IconsV from "react-native-vector-icons/AntDesign";
import { select_avatarUri } from "./SqliteDateBase";
import ScheduleEvents from "./scheduledEvents/ScheduleEvents"
import { withNavigation } from "react-navigation";
import MenuBand from "./Band/MenuBand"
import * as firebase from "firebase/app";
import { db } from "./firebase.js";

import getTheme from "../../native-base-theme/components";
import Base64 from "Base64";

import { PreloadContacts } from "./preload/PreloadComponents";
import {
  chanelNotifications,
  SendNotificationSchedule,
} from "./notifications/Notifications";

const Preload = () => <PreloadContacts />;
import {
  Container,
  Content,
  Text,
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
  Icon,
  Title,
  FooterTab,
  Footer,
  StyleProvider,
  Drawer,
  Badge,
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import SideBar from "./sidebar/Sidebar";
import UserContext from "./UserContext";
import ListNotification from "./ListNotification";
let songsRef = db.ref("/songs");
var storageRef = firebase.storage().ref();
var mountainImagesRef = storageRef.child("../img/icon.jpg");
import { withGlobalContext } from "./UserContext";

class Home extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      songs: null,
      badge: false,
      text   : "",
      context: "",
      infoTask: [],
      profile : {},
      changeMod: false,
    };
  }
  async profile_Information() {
    try {
      let yourEmail  = await firebase.auth().currentUser.email;
      let convertMd5 = await Base64.btoa(yourEmail);
      let ref = await db.ref("/users/user" + convertMd5);
      await ref.on("value", (snapshot) => {
        let data = snapshot.val();

        if (data !== null) {
          this.setState({profile:data.profile});
          if(data.yourBands !== undefined){
            let yourBands = Object.values(data.yourBands)
            if( yourBands.length >= 1){
              this.setState({changeMod:true});
              console.log("yourBands",true)

            }else{
              this.setState({changeMod:false});
              console.log("yourBands",false)
            }
          }
          
          this.setState({band:data});

         

        }
      });
    } catch (error) {
      console.log("error remove event", error);
    }
  }
  EventNotificationAlert() {
    let currentUser = firebase.auth().currentUser;
    let email;
    if (currentUser != null) {
      email = currentUser.email;
      let itemsRef = db.ref(
        "/users/user" + Base64.btoa(email) + "/" + "events"
      );
      itemsRef.limitToLast(1).on("child_added", (snapshot) => {
        // ultimo evento compartido
        this.events(itemsRef);
        let data = snapshot.val();
        if (data != null) {
          let obj = Object.values(data);
          console.log("task", data);
          this.setBadge(true);
          this.getStorageTask([data]);
        }
      });
    }
  }

  async events(itemsRef) {
    let data = [];
    try {
      itemsRef.orderByChild("dateStart").once("value", (snapshot) => {
        snapshot.forEach((child) => {
          data.push(child.val());
        });
        if (data != null) {
          let obj = Object.values(data);
          this.setState({ infoTask: obj });
        }
      });
    } catch (e) {}
  }
  async storageTask(tasks) {
    try {
      await AsyncStorage.setItem("@storage_task", JSON.stringify(tasks));
    } catch (err) {
      console.log(err);
    }
  }
  async getStorageTask(dataTask) {
    dataTask.forEach((item) => {
      console.log("local", item);
      SendNotificationSchedule(item.title, item.dateStart);
    });
  }

  songsBd() {
    let itemsRef = db.ref("/songs");
    itemsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      if (data !== null) {
        let songs = Object.values(data);
        this.setState({ songs });
      }
    });
  }
  LocalNotificationEventsSchedule(title, timestamp) {
    SendNotificationSchedule(title, timestamp);
    console.log("llegada de infor", title, timestamp);
  }

  componentDidMount() {
    chanelNotifications();
    this.profile_Information()
    console.log("changeMod",this.state.changeMod)
    this.EventNotificationAlert();
    const color = this.context;
    this.setState({ context: color });
    //.log("context", user); // { name: 'Tania', loggedIn: true }
    this.songsBd();
  }
  closeDrawer() {
    this.drawer._root.close();
  }
  openDrawer() {
    this.drawer._root.open();
  }
  asyncChange = async (tab) => {
    if(this.state.changeMod)
    {
      if (tab == 2) {
      await this.props.navigation.navigate("NewEvent");
      this.setState({ activeTab: 0 });
    }
  }
  if(this.state.changeMod){
    if (tab == 1) {
      await this.setState({ activeTab: 1 });
      this.setBadge(false);
    }
  }

 
  };
  setBadge(e) {
    this.setState({ badge: e });
  }
  render() {
    console.disableYellowBox = true;
    const { color } = this.context;
    //console.log("evento enviado",this.state.infoTask)
    /*  console.log("props refresh",calendar) */
    return (
      <StyleProvider style={getTheme(this.props.global.color.theme)}>
        <Drawer
          ref={(ref) => {
            this.drawer = ref;
          }}
          content={<SideBar navigator={this.navigator} />}
          onClose={() => this.closeDrawer()}
          panCloseMask={0}
        >
          <Container>
            <Header
              style={{
                paddingTop: StatusBar.currentHeight + 15,
                marginBottom: 5,
                elevation: 0,
              }}
            >
              <Left style={{ flex: 0.5 }}>
                <Button transparent onPress={() => this.openDrawer()}>
                  <Icon name="md-list" />
                </Button>
              </Left>
              <Body
                style={{
                  flex: 3,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Title style={{ letterSpacing: 5 }}>alabanzaband</Title>
              </Body>
              <Right style={{ flex: 0.5 }}>
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigation.navigate("ListChat");
                  }}
                >
                  <Icon name="md-chatbubbles" />
                </Button>
              </Right>
            </Header>
           {/*  identificador */}
           {this.state.changeMod&&(
            <View style={styles.IconDirector}>
              <IconDirector size={25} name="open-book" />
            </View>
           )}
           
            <Tabs
              locked
              tabBarPosition={"bottom"}
              initialPage={this.state.initialPage}
              page={this.state.activeTab}
              onChangeTab={(e) => {
                this.asyncChange(e.i);
              }}
            >
              <Tab
                heading={
                  <TabHeading>
                    <Icon name="ios-easel" />
                  </TabHeading>
                }
              >
                {/* //component A  */}
                <ScheduleEvents infoTask={this.state.infoTask} text={this.state.text}/>
              {/*      <CalendarEvents
                  infoTask={this.state.infoTask}
                  text={this.state.text}
                /> */}
              </Tab>
              <Tab
                heading={
                  <TabHeading>
                    {this.state.badge ? (
                      <Badge style={{ height: 12 }} />
                    ) : (
                      console.log("")
                    )}
                    <Icon name="md-bookmark" />
                  </TabHeading>
                }
              >
                {/* //component B */}
                
                <ListNotification infoTask={this.state.infoTask} />
              </Tab>
              
              {(this.state.changeMod)&&
                <Tab
                heading={
                  <Button
                    transparent
                    onPress={() => this.props.navigation.navigate("NewEvent")}
                  >
                    <Icon
                      style={{
                        fontSize: 40,
                        color:[this.props.global.color.color],
                      }}
                      name="ios-add-circle"
                    />
                  </Button>
                }
              ></Tab>
              }

             

              <Tab
                heading={
                  <TabHeading>
                    <Icon name="md-musical-note" />
                  </TabHeading>
                }
              >
                {/*  //component C  */}

                {this.state.songs != null ? (
                  <ListSong
                    songs={this.state.songs}
                    hide={false}
                    category={true}
                  />
                ) : (
                  <SafeAreaView style={styles.cont}>
                    <Preload />
                    <Preload />
                    <Preload />
                    <Preload />
                  </SafeAreaView>
                )}
              </Tab>
              <Tab
                heading={
                  <TabHeading>
                    <Icon name="md-person" />
                  </TabHeading>
                }
              >
                {/* //component D   */}
                <Contacts theme={this.props.global.color.theme} />

                {/*<PublishContent /> */}
              </Tab>
            </Tabs>
          </Container>
        </Drawer>
      </StyleProvider>
    );
  }
}
export default withNavigation(withGlobalContext(Home));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: StatusBar.currentHeight + 15,
  },
  cont: {
    height: "100%",
    alignItems: "center",
    padding: 10,
  },
  IconDirector:{
    position:"absolute",
    left:"50%",
    transform:[{translateX:-12}],
    top:20

  }
});
