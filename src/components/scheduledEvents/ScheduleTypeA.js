import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  Modal,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Spinner,
  Footer,
  FooterTab,
  Thumbnail,
} from "native-base";
import { ListItem, Left, Icon, Body, Right, Switch } from "native-base";
import { withGlobalContext } from "../UserContext";
import DatePicker from "react-native-datepicker";
import Icon2 from "react-native-vector-icons/FontAwesome";
import IconRepeat from "react-native-vector-icons/Feather";
import SelectFriends from "../SelectFriends";
import { pushEvent } from "../functions/functionsFirebase";
import { convertTimeStamp, showFormatHumman } from "../functions/FormatDate";
import SelectSongs from "../songs/SelectSongs";
import ModalComponent from "../modalComponent/ModalComponent";
import { withNavigation } from "react-navigation";
import AvatarComponent from "../avatar/AvatarComponent";
import { showSongs } from "../functions/showSongs";
import moment from "moment";

var colorTags = [
  { color: "#50e2c3ff", theme: "themeA" },
  { color: "#ff9494", theme: "themeB" },
  { color: "#fff694", theme: "themeC" },
  { color: "#a4ff94", theme: "themeD" },
  { color: "#94c4ff", theme: "themeE" },
  { color: "#6047ff", theme: "themeF" },
  { color: "#a947ff", theme: "themeG" },
  { color: "#ff47f9", theme: "themeH" },
  { color: "#ed3169", theme: "themeI" },
];
class SelectDaysOfWeek extends Component {
  constructor(props) {
    super(props);

    this.handleButton = this.handleButton.bind(this);
    this.state = {
      values: [],
    };
  }
  handleButton = (button) => {
    let tmp = this.state.values;
    if (this.state.values.includes(button)) {
      this.setState({
        values: this.state.values.filter((el) => el !== button),
      });
    } else {
      tmp.push(button);
      this.setState({
        values: tmp,
      });
      this.props.handleDaysOfWeeks(this.state.values);
    }
  };

  render() {
    return (
      <FlatList
        style={{ width: "100%", marginLeft: 20 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]}
        enableEmptySections={true}
        renderItem={({ item, index }) => (
          <Button
            key={index}
            style={[
              this.state.values.includes(index)
                ? styles(this.props.color).select
                : styles("#fff").unselect,
            ]}
            onPress={() => this.handleButton(index)}
          >
            <Text style={{ textAlign: "center" }}>{item}</Text>
          </Button>
        )}
      />
    );
  }
}
class Date_picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().getDate(),
    };
  }

  handlePress = () => {
    this._datePicker.setNativeProps({ modalVisible: true });
  };
  respStart(dete) {
    this.props.respStart(dete);
  }
  respEnd(dete) {
    this.props.respEnd(dete);
  }
  currentDate() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      dateCurrent: date + "/" + month + "/" + year + " ",
    });
  }

  componentDidMount() {
    this.currentDate();
  }

  render() {
    const iconDatePicker = this.props.icon;
    console.log("");
    return (
      <DatePicker
        date={this.state.date}
        style={styles.formatPicker}
        format={"DD-MM-YYYY"}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        mode={"date"}
        //onDateChange={}
        iconComponent={
          <Icon
            size={30}
            style={{ color: [this.props.colorTag] }}
            name={iconDatePicker}
          />
        }
        modalTransparent={true}
        animationType={"fade"}
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: -50,
            top: 50,
            marginLeft: 0,
          },
          dateInput: {
            borderWidth: 0,
            alignItems: "flex-start",
            borderBottomWidth: 1,
            borderBottomColor: [this.props.colorTag],
          },
        }}
        ref={(component) => (this._datePicker = component)}
        locale={"es"}
        onDateChange={(date) => {
          if (this.props.modDate == "start") {
            this.setState({ date: date });
            this.props.respStart(date);
          } else {
            this.setState({ date: date });
            this.props.respEnd(date);
          }
        }}
      />
    );
  }
}

class ScheduleTypeA extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.DatePicker;
    this.handleModal = this.handleModal.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.handleDaysOfWeeks = this.handleDaysOfWeeks.bind(this);
    this.state = {
      switch: false,
      dateStart: "",
      dateEnd: "",
      colorTag: "#50e2c3ff",
      token: "",
      title: null,
      note: "",
      friends: "",
      songs: [],
      groups: [],
      modalVisible: false,
      modalMod: "",
      uploadEvent: false,
      alert: false,
      dateCurrent: "",
      modalText: {},
      showClock: false,

      showClockEnd: false,
      timeStart: "",

      timeEnd: "",
      daysList: "",
    };
  }
  handleDaysOfWeeks(props) {
    this.setState({ daysList: props });
    console.log("days list parent", props);
  }
  currentDate() {
    let date = new Date().getDate(); //Current Date
    let month = new Date().getMonth() + 1; //Current Month
    let year = new Date().getFullYear(); //Current Year
    let hours = new Date().getHours(); //Current Hours
    let min = new Date().getMinutes(); //Current Minutes
    let fiveMin = new Date().getMinutes() + 5;
    let sec = new Date().getSeconds(); //Current Seconds

    if (hours <= 9) {
      hours = "0" + hours;
    }

    if (min <= 9) {
      min = "0" + min;
    }

    let newDate =
      ("0" + date).slice(-2) + "-" + ("0" + (month + 1)).slice(-2) + "-" + year;
    let newTimeStart = hours + ":" + min;

    let newTimeEnd = hours + ":" + fiveMin;
    this.setState({ dateStart: newDate });
    this.setState({ dateEnd: newDate });
    this.setState({ timeStart: newTimeStart, timeEnd: newTimeEnd });
  }
  handleDateStart = (e) => {
    this.setState({ dateStart: e });
  };
  handleDateEnd = (e) => {
    this.setState({ dateEnd: e }); //console.log("fecha de final", e)
  };

  generate_token(length) {
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
      ""
    );
    var b = [];
    for (var i = 0; i < length; i++) {
      var j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    let token = b.join("");
    this.setState({ token: token });
  }

  reformat = (date, time) => {
    let newDate = date.split(" ")[0];
    let format = newDate.split("-");
    let tm = time.split(":");
    let hh = tm[0];
    let mm = tm[1];
    let reformat =
      format[2] + "-" + format[1] + "-" + format[0] + "T" + hh + ":" + mm;
    return reformat;
  };
  handleTextModal(advice, comment) {
    this.setState({
      modalText: {
        advice: advice,
        comment: comment,
      },
    });
    this.setState({ alert: true });
  }
  postEvent() {
    //console.log("state.dateStart", this.state.dateStart)
    let event;
    let dateStart = this.reformat(this.state.dateStart, this.state.timeStart);
    let dateEnd = this.reformat(this.state.dateEnd, this.state.timeEnd);
    let colorTag = this.state.colorTag;
    let title = this.state.title;
    let note = this.state.note;
    let friends = this.state.friends;
    let songs = this.props.global.songs;
    let groups = this.state.groups;
    let uid = this.state.token;
    const members = this.props.global.friends;
    const ListSongs = this.props.global.ListSongs;

    if (!this.state.switch) {
      event = {
        title: title,
        dateStart: moment(dateStart).unix() * 1000,
        dateEnd: moment(dateEnd).unix() * 1000,
        colorTag: colorTag,
        uid: uid,
        note: note,
        type: "timeline",
        members: friends,
        songs: songs,
      };
    } else {
      // console.log(this.state.daysList);
      event = {
        title: title,
        dateStart: moment(dateStart).unix() * 1000,
        dateEnd: moment(dateEnd).unix() * 1000,
        colorTag: colorTag,
        uid: uid,
        type: "repeatDays",
        members: friends,
        days: this.state.daysList,
        songs: songs,
      };
    }

    this.props.global.setCalendar(true);
    this.pushEvent(members, event);
  }
  pushEvent(members, event) {
    const yourEmail = this.props.global.account;
    let push = pushEvent(yourEmail, members, event).then((resolve) => {
      this.setState({ uploadEvent: false });
      resolve(this.props.navigation.goBack());
    });
  }

  handleTask() {
    if (this.state.title != null) {
      if (this.state.dateStart >= this.state.dateStart) {
        this.setState({ uploadEvent: true });
        setTimeout(() => {
          this.postEvent();
        }, 200);
      } else {
        this.handleTextModal(
          "Advertencia",
          "La fecha en que inicia el evento no puede ser mayor a la de fecha en que termina..."
        );
      }
    } else {
      this.handleTextModal(
        "Los eventos requieren un titulo !",
        "Por favor asigne uno..."
      );
    }
  }

  handleColorTag(color, theme) {
    this.setState({ colorTag: color });
    this.setTheme(theme, color);
  }
  setTheme(theme, color) {
    this.props.setTheme(theme, color);
  }
  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.currentDate();
      this.generate_token(8);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.props.global.setSongs("clear");
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  handleModal(event) {
    //console.log("evento hijo", event);
    this.setState({ alert: event });
  }

  async showClock(type) {
    if (type == "start") {
      await this.setState({ showClock: true });
      this.refTimeStart.onPressDate();
    }
    if (type == "end") {
      await this.setState({ showClockEnd: true });
      this.refTimeEnd.onPressDate();
    }
  }
  datesPicker() {
    return (
      <View style={{ flexDirection: "row", width: "100%", height: 80 }}>
        <View
          style={{
            width: "40%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Date_picker
            icon={"ios-arrow-forward"}
            modDate={"start"}
            respStart={this.handleDateStart}
            colorTag={this.state.colorTag}
          />
          <Date_picker
            icon={"ios-arrow-back"}
            modDate={"end"}
            respEnd={this.handleDateEnd}
            colorTag={this.state.colorTag}
          />
        </View>
        <View style={{ flex: 1, width: "60%", marginLeft: 10 }}>
          <Button
            style={{
              height: "50%",
              backgroundColor: "#fff",
              justifyContent: "center",
              elevation: 0,
            }}
            onPress={() => {
              this.showClock("start");
            }}
          >
            <Text style={{ fontSize: 18, color: [this.state.colorTag] }}>
              {this.state.timeStart}
            </Text>
          </Button>
          <Button
            style={{
              height: "50%",
              backgroundColor: "#fff",
              justifyContent: "center",
              elevation: 0,
            }}
            onPress={() => {
              this.showClock("end");
            }}
          >
            <Text style={{ fontSize: 18, color: [this.state.colorTag] }}>
              {this.state.timeEnd}
            </Text>
          </Button>
        </View>
        {this.state.showClock && (
          <DatePicker
            date={this.state.timeStart}
            style={{ display: "none" }}
            testID="dateTimePicker"
            mode={"time"}
            hideText={true}
            androidMode={"spinner"}
            showIcon={false}
            is24Hour={true}
            ref={(component) => (this.refTimeStart = component)}
            onDateChange={(t) => {
              this.setState({ timeStart: t }),
                console.log("tiempo selecionado", t);
            }}
          />
        )}
        {this.state.showClockEnd && (
          <DatePicker
            date={this.state.timeEnd}
            style={{ display: "none" }}
            testID="dateTimePicker"
            mode={"time"}
            hideText={true}
            androidMode={"spinner"}
            showIcon={false}
            is24Hour={true}
            ref={(component) => (this.refTimeEnd = component)}
            onDateChange={(t) => {
              this.setState({ timeEnd: t }),
                console.log("tiempo selecionado", t);
            }}
          />
        )}
      </View>
    );
  }

  render() {
    const currentDate = this.state.dateCurrent;
    const songs = this.props.global.songs;
    const songsDb = this.props.global.songsDb;
    const switchState = this.state.switch;
    let friends = this.props.global.friends;
    /* console.log("currentDate", this.state.dateStart) */
    return (
      <Container>
        {this.state.uploadEvent ? (
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: 2,
              left: 0,
              right: 0,
              backgroundColor: "#ffffffcd",
            }}
          >
            <Spinner color={this.state.colorTag} />
          </View>
        ) : (
          console.log("")
        )}
        {this.state.alert ? (
          <ModalComponent
            handleModal={this.handleModal}
            advice={this.state.modalText.advice}
            comment={this.state.modalText.comment}
          />
        ) : (
          console.log("en curso")
        )}
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              {this.state.modalMod == "integrantes" ? (
                <SelectFriends setModalVisible={this.setModalVisible} />
              ) : (
                <SelectSongs setModalVisible={this.setModalVisible} />
              )}
            </View>
          </View>
        </Modal>

        <Content>
          <Form>
            <Item style={{ borderColor: "transparent" }}>
              <Input
                onChangeText={(title) => this.setState({ title })}
                placeholder="Título"
              />
            </Item>
          </Form>
          <ListItem icon>
            <Left>
              <IconRepeat size={18} active name="repeat" />
            </Left>
            <Body style={{ elevation: 0, borderWidth: 0, borderColor: "#fff" }}>
              <Text>Repetición</Text>
            </Body>
            <Right
              style={{ elevation: 0, borderWidth: 2, borderColor: "#fff" }}
            >
              <Switch
                value={switchState}
                onValueChange={() => this.setState({ switch: !switchState })}
              />
            </Right>
          </ListItem>
          {this.datesPicker()}
          {switchState ? (
            <SelectDaysOfWeek
              handleDaysOfWeeks={this.handleDaysOfWeeks}
              color={this.state.colorTag}
            />
          ) : (
            console.log("")
          )}
          <ListItem icon style={{ marginTop: 20 }} noBorder>
            <Left>
              <Button
                trasnparent
                style={{ backgroundColor: "#fff", elevation: 0 }}
              >
                <Text
                  style={{ color: [this.state.colorTag], fontWidth: "bold" }}
                >
                  id
                </Text>
              </Button>
            </Left>
            <Body
              style={{
                backgroundColor: [this.state.colorTag],
                borderBottomLeftRadius: 50,
                borderTopLeftRadius: 50,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontWidth: "bold",
                  margin: 5,
                }}
              >
                {this.state.token}
              </Text>
            </Body>
          </ListItem>

          <ListItem icon style={{ height: 50 }} noBorder>
            <Left>
              <Button
                trasnparent
                style={{ backgroundColor: "#fff", elevation: 0 }}
              >
                <Icon
                  size={30}
                  style={{ color: [this.state.colorTag] }}
                  name="md-contacts"
                />
              </Button>
            </Left>

            <Body>
              <Button
                transparent
                onPress={() => {
                  this.setModalVisible(true);
                  this.setState({ modalMod: "integrantes" });
                }}
              >
                <Text>Integrantes</Text>
              </Button>
            </Body>
          </ListItem>
          <View style={{ width: "100%" }}>
            <FlatList
              style={{ width: "100%", marginLeft: 20 }}
              data={friends}
              enableEmptySections={true}
              renderItem={({ item, index }) => (
                <AvatarComponent email={item} showUserName={true} />
              )}
            />
          </View>
          <ListItem icon noBorder>
            <Left>
              <Button
                trasnparent
                style={{ backgroundColor: "#fff", elevation: 0 }}
              >
                <Icon
                  size={30}
                  style={{ color: [this.state.colorTag] }}
                  name="md-musical-note"
                />
              </Button>
            </Left>
            <Body>
              <Button
                transparent
                onPress={() => {
                  this.setModalVisible(true);
                  this.setState({ modalMod: "canciones" });
                }}
              >
                <Text>Canciones</Text>
              </Button>
            </Body>
            <Right></Right>
          </ListItem>
          <View style={{ width: "100%" }}>{showSongs(songs, songsDb)}</View>
          <ListItem icon noBorder>
            <Left>
              <Button
                trasnparent
                style={{ backgroundColor: "#fff", elevation: 0 }}
              >
                <Icon
                  size={30}
                  style={{ color: [this.state.colorTag] }}
                  name="ios-pricetag"
                />
              </Button>
            </Left>
            <Body>
              <Text>Color de etiqueta</Text>
            </Body>
            <Right>
              <Icon2 name="circle" size={30} color={this.state.colorTag} />
            </Right>
          </ListItem>
          <ListItem noBorder>
            <FlatList
              style={{ width: "100%", marginLeft: 20 }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={colorTags}
              enableEmptySections={true}
              renderItem={({ item, index }) => (
                <Button
                  style={{
                    backgroundColor: [item.color],
                    elevation: 0,
                    margin: 5,
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                  }}
                  onPress={() => this.handleColorTag(item.color, item.theme)}
                ></Button>
              )}
            />
          </ListItem>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              trasnparent
              style={{ backgroundColor: [this.state.colorTag], elevation: 0 }}
              onPress={() => this.handleTask()}
            >
              <Text style={{ color: "#fff", fontSize: 20 }}>Enviar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
export default withNavigation(withGlobalContext(ScheduleTypeA));
const styles = (props) =>
  StyleSheet.create({
    formatPicker: {
      width: 90,
      shadowColor: "#fff",
      shadowRadius: 0,
      shadowOpacity: 1,
      shadowOffset: { height: 0, width: 0 },
    },
    select: {
      elevation: 0,
      margin: 5,
      width: 45,
      height: 30,
      borderRadius: 20,
      backgroundColor: props,
      justifyContent: "center",
    },
    unselect: {
      elevation: 0,
      margin: 5,
      width: 45,
      height: 30,
      borderRadius: 20,
      backgroundColor: "#fff",
      justifyContent: "center",
    },
  });
