import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  TouchableHighlight, SafeAreaView
} from "react-native";

import { YellowBox } from "react-native";
import List from "./List";
import CalendarEvents from "./CalendarEvents";
import Contacts from "./contacts/Contacts";
import Icon2 from "react-native-vector-icons/FontAwesome";
import ItemComponent from "../components/ItemComponent";
import IconsV from "react-native-vector-icons/AntDesign";
import { select_avatarUri } from './SqliteDateBase'

import { withNavigation } from "react-navigation";

import * as firebase from "firebase/app";
import { db } from "./firebase.js";

import getTheme from "../../native-base-theme/components";
import Base64 from 'Base64'

import { PreloadContacts } from './preload/PreloadComponents'
const Preload = () => (
  <PreloadContacts />
);
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
  Badge
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import SideBar from "./sidebar/Sidebar";
import UserContext from "./UserContext";
import ListNotification from "./ListNotification"
let songsRef = db.ref("/songs");
var storageRef = firebase.storage().ref();
var mountainImagesRef = storageRef.child("../img/icon.jpg");
import { withGlobalContext } from './UserContext';

class Home extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.setBadge = this.setBadge.bind(this);
    this.state = {
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      context: "",
      songs: null,
      refreshCalendar: false,
      infoTask: '',
      badge: false,
      text: ''

    };
  }

  EventNotificationAlert() {
    let user = { email: 'emanuelyul@hotmail.com' }
    console.log("firebase", user)
    let email
    if (user != null) {
      email = user.email;
      let itemsRef = db.ref('/users/user' + Base64.btoa(email) + '/' + 'events')
      itemsRef.limitToLast(1).on('child_added', snapshot => {
        // console.log('A new node has been added2', snapshot.val().director)
        console.log("child added")
        this.events(itemsRef)
      });
      this.badged(itemsRef)
     

    }
  }
  async events(itemsRef) {
    let data = []
    try {
      itemsRef.orderByChild("dateStart").once('value', snapshot => {
        snapshot.forEach(child => {
          //console.log("ordenados2", child.key, child.val());
          data.push(child.val())
        })
        if (data != null) {
          let obj = Object.values(data)
          this.setState({ infoTask: obj, badge: true })

        }
      });
    } catch (e) {

    }

  }
  badged(itemsRef) {
    itemsRef.limitToLast(1).on('child_changed', snapshot => {
      // console.log('A new node has been added2', snapshot.val().director)
      this.events(itemsRef)

    });


  }

  songsBd() {
    let itemsRef = db.ref("/songs");
    itemsRef.on("value", snapshot => {
      let data = snapshot.val();
      if (data !== null) {
        let songs = Object.values(data);
        this.setState({ songs });
      }
    });
  }

  componentDidMount() {
    console.log("evento comenzo")
    this.EventNotificationAlert()
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
  asynChange = async tab => {
    if (tab == 2) {
      this.props.navigation.navigate("NewEvent");
      setTimeout(() => {
        this.setState({ activeTab: 0 });
      }, 800);

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
          ref={ref => {
            this.drawer = ref;
          }}
          content={<SideBar navigator={this.navigator} />}
          onClose={() => this.closeDrawer()}
          panCloseMask={0}
        >
          <Container>
            <Header>
              <Left style={{ flex: 0.5 }}>
                <Button transparent onPress={() => this.openDrawer()}>
                  <Icon name="md-list" />
                </Button>
              </Left>
              <Body
                style={{
                  flex: 3,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Title style={{ letterSpacing: 5 }}>alabanzaband</Title>
              </Body>
              <Right style={{ flex: 0.5 }}>
               {/*  <Button
                  transparent
                  onPress={() => {
                    this.setState({ text: 'hola' })

                  }}
                >
                  <Icon name="search" />
                </Button> */}
              </Right>
            </Header>

            <Tabs
              locked
              tabBarPosition={"bottom"}
              initialPage={this.state.initialPage}
              page={this.state.activeTab}
              onChangeTab={e => {
                //console.log("tab", e.i);
                this.asynChange(e.i);
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

                <CalendarEvents infoTask={this.state.infoTask} text={this.state.text} />
              </Tab>
              <Tab
                onChangeTab={() => {
                  this.setBadge(false)
                }}
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
                <ListNotification infoTask={this.state.infoTask} setBadge={this.setBadge}/>
              </Tab>
           
              <Tab
                heading={
                  <Button transparent onPress={() => this.props.navigation.navigate("NewEvent")}>
                    <Icon style={{ fontSize: 40, color:[this.props.global.color.color] }} name="ios-add-circle" />
                  </Button>
                }
              ></Tab>
              <Tab
                heading={
                  <TabHeading>
                    <Icon name="md-musical-note" />
                  </TabHeading>
                }
              >
                {/*  //component C  */}

                {this.state.songs != null ? (<List songs={this.state.songs} hide={false}  category={true}/>) :
                  (
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
              </Tab>
            </Tabs>
          </Container>
        </Drawer>
      </StyleProvider>
    );
  }
}
export default withGlobalContext(withNavigation(Home));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: StatusBar.currentHeight + 15,

  },
  cont: {
    height: '100%',
    alignItems: 'center',
    padding: 10
  }
});