import React, { Component } from "react";
import { Text, View, TouchableHighlight, Modal, FlatList, AsyncStorage, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button, Spinner, Footer, FooterTab, Thumbnail
} from "native-base";
import { ListItem, Left, Icon, Body, Right, Switch } from "native-base";
import { withGlobalContext } from '../UserContext';
import DatePicker from "react-native-datepicker";
import Icon2 from 'react-native-vector-icons/FontAwesome';
import SelectFriends from '../SelectFriends';
import { pushEvent } from '../functions/functionsFirebase'
import { convertTimeStamp } from '../functions/FormatDate'
import SelectSongs from '../songs/SelectSongs'
import ModalComponent from '../modalComponent/ModalComponent'
import { withNavigation } from 'react-navigation';
import AvatarComponent from '../avatar/AvatarComponent';
import { showSongs } from '../functions/showSongs'
import moment from "moment";

var colorTags = [
  { color: "#50e2c3ff", theme: 'themeA' },
  { color: "#ff9494", theme: 'themeB' },
  { color: "#fff694", theme: 'themeC' },
  { color: "#a4ff94", theme: 'themeD' },
  { color: "#94c4ff", theme: 'themeE' },
  { color: "#6047ff", theme: 'themeF' },
  { color: "#a947ff", theme: 'themeG' },
  { color: "#ff47f9", theme: 'themeH' },
  { color: "#ed3169", theme: 'themeI' },
]

class Date_picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().getDate(),
    };
  }

  handlePress = () => {
    // Redacted: animation related code
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
      //Setting the value of the date time
      dateCurrent:
        date + '/' + month + '/' + year + ' ',
    });
  }

  componentDidMount() {

    this.currentDate()

  }

  render() {
    const iconDatePicker = this.props.icon;
    console.log("")
    return (

      <DatePicker
        date={this.state.date}
        style={{
          width: 140,
          marginLeft: 65,
          shadowColor: '#fff',
          shadowRadius: 0,
          shadowOpacity: 1,
          shadowOffset: { height: 0, width: 0 },
        }}
        format={'DD-MM-YYYY HH:mm'}
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
            alignItems: 'flex-start',
            borderBottomWidth: 1,
            borderBottomColor: [this.props.colorTag]
          }


          // ... You can check the source to find the other keys.
        }}
        ref={component => (this._datePicker = component)}
        locale={"es"}
        onDateChange={date => {
          if (this.props.modDate == "start") {
            this.setState({ date: date })
            this.props.respStart(date)


          } else {
            this.setState({ date: date })
            this.props.respEnd(date)
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
    this.handleModal = this.handleModal.bind(this)
    this.setTheme = this.setTheme.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
    this.state = {
      switch: false,
      dateStart: '',
      dateEnd: '',
      colorTag: '#50e2c3ff',
      token: '',
      title: null,
      note: '',
      friends: '',
      songs: [],
      groups: [],
      modalVisible: false,
      modalMod: '',
      uploadEvent: false,
      alert: false,
      dateCurrent: '',
      modalText: {},
    }
  }
  currentDate() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds 
    let newDate = ('0' + date).slice(-2) + '-' + ('0' + (month + 1)).slice(-2) + '-' + year
    this.setState({ dateStart: newDate })
    this.setState({ dateEnd: newDate })


  }
  handleDateStart = (e) => {
    this.setState({ dateStart: e });
    //console.log("fecha de inicio", this.reformat(e))

  };
  handleDateEnd = (e) => {
    this.setState({ dateEnd: e }); //console.log("fecha de final", e)
  };

  generate_token(length) {
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i = 0; i < length; i++) {
      var j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    let token = b.join("");
    this.setState({ token: token })
  }

  reformat = (date) => {
    var newDate = date.split(" ")[0];
    var format = newDate.split("-");
    var reformat = format[2] + '-' + (format[1]) + '-' + format[0] + 'T' + '07:00';
    //console.log("reformat", reformat)

    return reformat
  }
  pushEvent(members, event) {
    const yourEmail = this.props.global.account
    let push = pushEvent(yourEmail, members, event)
      .then((resolve) => {
        this.setState({ uploadEvent: false })
        resolve(this.props.navigation.goBack())

      })
  }
  handleTextModal(advice, comment) {
    this.setState({
      modalText: {
        advice: advice,
        comment: comment
      }
    })
    this.setState({ alert: true })
  }
  postEvent() {
    //console.log("state.dateStart", this.state.dateStart)
    let dateStart = this.reformat(this.state.dateStart);
    let dateEnd = this.reformat(this.state.dateEnd);
    let colorTag = this.state.colorTag;
    let title = this.state.title;
    let note = this.state.note;
    let friends = this.state.friends;
    let songs = this.props.global.songs;
    let groups = this.state.groups;
    let uid = this.state.token;

    //console.log("toke", this.state.token, colorTag)
    //let jsonTask=JSON.stringify(task)
    //console.log("data", title, dateStart, dateEnd, colorTag, uid, note, friends, "songs", "groups")
    const members = this.props.global.friends
    const ListSongs = this.props.global.ListSongs

    //console.log("this.state.dateStart", dateStart, dateEnd)
    let event = { title: title, dateStart: convertTimeStamp(dateStart), dateEnd: convertTimeStamp(dateEnd), colorTag: colorTag, uid: uid, note: note, members: friends, songs: songs }
    this.props.global.setCalendar(true)
    this.pushEvent(members, event)
  }
  handleTask() {
    if (this.state.title != null) {
      if (this.state.dateStart >= this.state.dateStart) {
        this.setState({ uploadEvent: true })
        setTimeout(() => {
          this.postEvent()
        }, 200);
      } else {
        this.handleTextModal(
          'Advertencia',
          'La fecha en que inicia el evento no puede ser mayor a la de fecha en que termina...'

        );
      }
    } else {
      this.handleTextModal(
        'Los eventos requieren un titulo !',
        'Por favor asigne uno...'
      );
    }
  }

  handleColorTag(color, theme) {
    this.setState({ colorTag: color })
    this.setTheme(theme, color)
  }
  setTheme(theme, color) {
    this.props.setTheme(theme, color)
  }
  componentDidMount() {

    this._isMounted = true;

    if (this._isMounted) {
      this.currentDate()

      this.generate_token(8);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.props.global.setSongs('clear')

    
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  handleModal(event) {
    //console.log("evento hijo", event);
    this.setState({ alert: event })

  }
  datesPicker() {
    return (
      <View>
        <Date_picker icon={"ios-arrow-forward"} modDate={'start'} respStart={this.handleDateStart} colorTag={this.state.colorTag} />
        <Date_picker icon={"ios-arrow-back"} modDate={'end'} respEnd={this.handleDateEnd} colorTag={this.state.colorTag} />
      </View>
    )
  }

  render() {

    const currentDate = this.state.dateCurrent
    const songs = this.props.global.songs;
    const songsDb = this.props.global.songsDb;
    const switchState = this.state.switch
    let friends = this.props.global.friends;
    /* console.log("currentDate", this.state.dateStart) */
    return (
      <Container>
        {this.state.uploadEvent ?
          (<View
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
              backgroundColor: "#ffffffcd"
            }}
          >
            <Spinner color={this.state.colorTag} />
          </View>) : (console.log(""))
        }
        {this.state.alert ?
          (<ModalComponent
            handleModal={this.handleModal}
            advice={this.state.modalText.advice}
            comment={this.state.modalText.comment}
          />) : (console.log("en curso"))
        }
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false)
          }}>
          <View style={{ marginTop: 22 }}>
            <View>
              {this.state.modalMod == 'integrantes' ?
                (
                  <SelectFriends setModalVisible={this.setModalVisible} />
                ) : (
                  <SelectSongs setModalVisible={this.setModalVisible} />
                )
              }

            </View>
          </View>
        </Modal>

        <Content>
          <Form >
            <Item style={{ borderColor: 'transparent' }}>
              <Input

                onChangeText={title => this.setState({ title })}
                placeholder="Título" />
            </Item>
          </Form>
          {this.datesPicker()}
          <ListItem icon style={{ marginTop: 20 }} noBorder>
            <Left>
              <Button
                trasnparent
                style={{ backgroundColor: "#fff", elevation: 0 }}
              >
                <Text style={{ color: [this.state.colorTag], fontWidth: 'bold' }}>id</Text>

              </Button>
            </Left>
            <Body style={{ backgroundColor: [this.state.colorTag], borderBottomLeftRadius: 50, borderTopLeftRadius: 50 }}>
              <Text style={{ textAlign: 'center', color: "#fff", fontWidth: 'bold', margin: 5, }}>{this.state.token}</Text>
            </Body>

          </ListItem>
         
          <ListItem icon style={{ height: 50 }} noBorder >
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
              <Button transparent onPress={() => {
                this.setModalVisible(true)
                this.setState({ modalMod: 'integrantes' })
              }}>
                <Text>Integrantes</Text>

              </Button>
            </Body>


          </ListItem>
          <View style={{ width: '100%' }}>
            <FlatList
              style={{ width: '100%', marginLeft: 20 }}
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
              <Button transparent onPress={() => {
                this.setModalVisible(true)
                this.setState({ modalMod: 'canciones' })
              }}>
                <Text>Canciones</Text>
              </Button>
            </Body>
            <Right></Right>
          </ListItem>
          <View style={{ width: '100%' }}>
            {showSongs(songs, songsDb)}

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
                  name="ios-pricetag"
                />
              </Button>
            </Left>
            <Body>
              <Text>Color de etiqueta</Text>
            </Body>
            <Right>
              <Icon2 name='circle' size={30} color={this.state.colorTag} />
            </Right>
          </ListItem>
          <ListItem noBorder>

            <FlatList
              style={{ width: '100%', marginLeft: 20 }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={colorTags}
              enableEmptySections={true}
              renderItem={({ item, index }) => (
                <Button
                  style={{ backgroundColor: [item.color], elevation: 0, margin: 5, width: 30, height: 30, borderRadius: 20 }}
                  onPress={() => this.handleColorTag(item.color, item.theme)}
                >
                </Button>
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
              <Text style={{ color: '#fff', fontSize: 20 }}>Enviar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
export default withNavigation(withGlobalContext(ScheduleTypeA));
