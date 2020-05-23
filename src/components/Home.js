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
import ListNotification from "./ListNotification";
import Contacts from "./contacts/Contacts";
import Icon2 from "react-native-vector-icons/FontAwesome";
import ItemComponent from "../components/ItemComponent";
import IconsV from "react-native-vector-icons/AntDesign";
import { select_avatarUri } from './SqliteDateBase'

import { withNavigation } from "react-navigation";
import * as firebase from "firebase/app";

import { db } from "./firebase.js";

import getTheme from "../../native-base-theme/components";

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
  Badge,
  FooterTab,
  Footer,
  StyleProvider,
  Drawer
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import SideBar from "./sidebar/Sidebar";
import UserContext from "./UserContext";

let songsRef = db.ref("/songs");
var storageRef = firebase.storage().ref();
var mountainImagesRef = storageRef.child("../img/icon.jpg");

class Home extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      context: "",
      songs: null,
      refreshCalendar: false

    };
    this.lastId = 0;
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
    const user = this.context;
    this.setState({ context: user });
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

  render() {
    console.disableYellowBox = true;
    const { user, setUser, calendar } = this.context;
    /*  console.log("props refresh",calendar) */
    return (
      <StyleProvider style={getTheme(user.theme)}>
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
                <Button
                  transparent
                  onPress={() => {
                    const newUser = { name: "pepe", loggedIn: true };
                    setUser(newUser);

                  }}
                >
                  <Icon name="search" />
                </Button>
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

                <CalendarEvents />
              </Tab>
              <Tab
                heading={
                  <TabHeading>
                    <Icon name="md-bookmark" />
                  </TabHeading>
                }
              >
                {/* //component B */}

                <ListNotification />
              </Tab>
              <Tab
                ref="tab3"
                heading={
                  <Button transparent onPress={() => this.props.navigation.navigate("NewEvent")}>

                    <Icon style={{ fontSize: 40 }} name="ios-add-circle" />
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

                {this.state.songs != null ? (<List songs={this.state.songs} />) :
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

                <Contacts theme={user.theme} />
              </Tab>
            </Tabs>
          </Container>
        </Drawer>
      </StyleProvider>
    );
  }
}
export default withNavigation(Home);

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