import React, { Component } from "react";
import { Text,View,TouchableHighlight,Modal,FlatList,AsyncStorage} from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
} from "native-base";
import { ListItem, Left, Icon, Body, Right, Switch } from "native-base";
import { withGlobalContext } from './UserContext';
import DatePicker from "react-native-datepicker";
import Icon2 from 'react-native-vector-icons/FontAwesome';
import SelectFriends from './SelectFriends';
import SelectSongs from './SelectSongs'
import {pushEvent} from './functions/functionsFirebase'

class Date_picker extends Component {
  constructor(props) {
    super(props);
    this.state = { date: '' };
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
    const formatChange = this.props.formatChange
    const modeChange = this.props.modeChange
    console.log("icon", iconDatePicker);
    return (

      <DatePicker
        date={this.state.date}
        style={{ 
          width:140,
          marginLeft:65,
          shadowColor: '#fff',
            shadowRadius: 0,
            shadowOpacity: 1,
            shadowOffset: { height: 0, width: 0 },
        }}
        format={formatChange}
        minDate={this.state.dateCurrent}
        maxDate="01-06-2030"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        mode={modeChange}
        //onDateChange={}
        iconComponent={
          <Icon
            size={30}
            style={{ color: "#50e2c3ff" }}
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
            alignItems:'flex-start',
            borderBottomWidth:1,
            borderBottomColor:'#50e2c3ff'
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
class NewEvent extends Component {
  constructor() {
    super()
    this.state = {
      switch: false,
      formatChange: "DD-MM-YYYY ",
      modeChange: "date",
      dateStart: '',
      dateEnd: '',
      colorTag: '#50e2c3ff',
      token: '',
      title: '',
      note: '',
      friends:'',
      songs: [],
      groups: [],
      modalVisible: false,
      modalMod:'',

    }
  }
  onChangeState(isActive) {
    this.setState({ switch: isActive })
    if (isActive) {
      this.onChangeFormat("DD-MM-YYYY HH:mm", "datetime")
    } else {
      this.onChangeFormat("DD-MM-YYYY", "date")
    }
  }
  onChangeFormat(format, mode) {
    this.setState({ formatChange: format })
    this.setState({ modeChange: mode })
  }
  handleDateStart = (e) => { this.setState({ dateStart: e }); console.log("fecha de inicio", e) };
  handleDateEnd = (e) => { this.setState({ dateEnd: e }); console.log("fecha de final", e) };

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
    var reformat = format[2] + '-' + format[1] + '-' + format[0]

/*     console.log(reformat);
 */ return reformat
  }
  handleTask() {

    let dateStart = this.reformat(this.state.dateStart);
    let dateEnd = this.reformat(this.state.dateEnd);
    let colorTag = this.state.colorTag;
    let title = this.state.title;
    let note = this.state.note;
    let friends = this.state.friends;
    let songs = this.state.songs;
    let groups = this.state.groups;
    let uid = this.state.token;

    console.log("toke", this.state.token, colorTag)
    let task = {
      [dateStart]: {
        periods: [
          { startingDay: true, endingDay: false, color: '#ffa500' },
        ]
      },
      [dateEnd]: {
        periods: [
          { startingDay: false, endingDay: true, color: '#ffa500' },
        ]

      },

    }
    /* let jsonTask=JSON.stringify(task) */
    console.log("data",title, dateStart, dateEnd, colorTag, uid, note, friends, "songs", "groups")
    const members = this.props.global.friends
    let event = {title:title, dateStart:dateStart, dateEnd:dateEnd, colorTag:colorTag,uid:uid,note:note,members:friends,songs:"songs", groups:"groups"}
    this.props.global.setCalendar(true)
   
    this.props.navigation.navigate("Home")
    
    const yourEmail = this.props.global.account
    pushEvent(yourEmail, members, event)
    
  }

  handleColorTag(color) {
    this.setState({ colorTag: color })
  }
  componentDidMount() {
    this.generate_token(8);
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  
  render() {
    const switchState = this.state.switch
    const formatChange = this.state.formatChange
    const modeChange = this.state.modeChange
    let friends = this.props.global.friends;
    console.log("globla props", friends)

    return (
      <Container>
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false)
          }}>
          <View style={{ marginTop: 22 }}>
            <View>
              {/* <Text>Elige tus integrantes</Text> */}

           {/*    <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>volver</Text>
              </TouchableHighlight> */}
              {this.state.modalMod == 'integrantes' ? (
                  <SelectFriends  />
                ):(
                  <SelectSongs/>
                )
              }
             
            </View>
          </View>
        </Modal>
        <Header style={{ marginTop: 20 }}>

          <Body>
            <Text>Programa tu evento</Text>
          </Body>
          <Right>


            <Button
              trasnparent
              style={{ backgroundColor: "#fff", elevation: 0 }}
              onPress={() => this.handleTask()}
            >
              <Icon
                style={{ color: "#50e2c3ff", fontSize: 40 }}
                name="md-checkmark"
              />
            </Button>
          </Right>

        </Header>
        <Content>
          <Form>
            <Item >
              <Input
                onChangeText={title => this.setState({ title })}
                placeholder="Título" />
            </Item>
          </Form>
          <ListItem icon>
            <Left>
              <Button
                trasnparent
                style={{ backgroundColor: "#fff", elevation: 0 }}
              >
                <Icon
                  size={30}
                  style={{ color: "#50e2c3ff" }}
                  name="md-timer"
                />
              </Button>
            </Left>
            <Body>
              <Text>Todo el dia</Text>
            </Body>
            <Right>
              <Switch onValueChange={(e) => this.onChangeState(e)} value={switchState} />
            </Right>
          </ListItem>
          <Date_picker icon={"ios-arrow-forward"} formatChange={formatChange} modeChange={modeChange} modDate={'start'} respStart={this.handleDateStart} />
          <Date_picker icon={"ios-arrow-back"} formatChange={formatChange} modeChange={modeChange} modDate={'end'} respEnd={this.handleDateEnd} />
          <ListItem icon>
            <Left>
              <Button
                trasnparent
                style={{ backgroundColor: "#fff", elevation: 0 }}
              >
                <Icon
                  size={30}
                  style={{ color: "#50e2c3ff" }}
                  name="ios-notifications"
                />
              </Button>
            </Left>
            <Body>
              <Text>Ninguna notificacion</Text>
            </Body>
            <Right>
              <Icon
                size={30}
                style={{ color: "#50e2c3ff" }}
                name="close-circle"
              />
            </Right>
          </ListItem>
     {/*      <ListItem icon>
            <Left>
              <Button
                trasnparent
                style={{ backgroundColor: "#fff", elevation: 0 }}
              >
                <Icon
                  size={30}
                  style={{ color: "#50e2c3ff" }}
                  name="ios-repeat"
                />
              </Button>
            </Left>
            <Body>
              <Text>Sin repeticion</Text>
            </Body>
            <Right></Right>
          </ListItem> */}
          <ListItem icon style={{height:50}}>
            <Left>
              <Button
                trasnparent
                style={{ backgroundColor: "#fff", elevation: 0 }}
              >
                <Icon
                  size={30}
                  style={{ color: "#50e2c3ff" }}
                  name="md-contacts"
                />
              </Button>
          
            </Left>
       
            <Body>
            <Button transparent onPress={()=>{
              this.setModalVisible(true)
              this.setState({modalMod:'integrantes'})
              }}>
              <Text>Integrantes</Text>
              
            </Button>
            </Body>
            
            
          </ListItem>
          <View  style={{height:50,width:'100%'}}>
              <FlatList
              style={{height:50,width:'100%',marginLeft:20}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={friends}
                        enableEmptySections={true}
                        renderItem={({ item, index }) => (
                            <Text style={{margin:10,fontSize:10}}>{item}</Text>
                        )}

                    />
              </View>
          <ListItem icon>
            <Left>
              <Button
                trasnparent
                style={{ backgroundColor: "#fff", elevation: 0 }}
              >
                <Icon
                  size={30}
                  style={{ color: "#50e2c3ff" }}
                  name="md-musical-note"
                />
              </Button>
            </Left>
            <Body>
            <Button transparent onPress={()=>{
              this.setModalVisible(true)
              this.setState({modalMod:'canciones'})
              }}>
              <Text>Canciones</Text>
            </Button>
            </Body>
            <Right></Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button
                trasnparent
                style={{ backgroundColor: "#fff", elevation: 0 }}
              >
                <Icon
                  size={30}
                  style={{ color: "#50e2c3ff" }}
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
          <ListItem>
            <Button
              trasnparent
              style={{ backgroundColor: "#50e2c3ff", elevation: 0, margin: 5, width: 30, height: 30, borderRadius: 20 }}
              onPress={() => this.handleColorTag("#50e2c3ff")}
            >
            </Button>
            <Button
              trasnparent
              style={{ backgroundColor: "#ff9494", elevation: 0, margin: 5, width: 30, height: 30, borderRadius: 20 }}
              onPress={() => this.handleColorTag("#ff9494")}
            >
            </Button>
            <Button
              trasnparent
              style={{ backgroundColor: "#fff694", elevation: 0, margin: 5, width: 30, height: 30, borderRadius: 20 }}
              onPress={() => this.handleColorTag("#fff694")}
            >
            </Button>
            <Button
              trasnparent
              style={{ backgroundColor: "#a4ff94", elevation: 0, margin: 5, width: 30, height: 30, borderRadius: 20 }}
              onPress={() => this.handleColorTag("#a4ff94")}
            >
            </Button>
            <Button
              trasnparent
              style={{ backgroundColor: "#94c4ff", elevation: 0, margin: 5, width: 30, height: 30, borderRadius: 20 }}
              onPress={() => this.handleColorTag("#94c4ff")}
            >
            </Button>
            <Button
              trasnparent
              style={{ backgroundColor: "#6047ff", elevation: 0, margin: 5, width: 30, height: 30, borderRadius: 20 }}
              onPress={() => this.handleColorTag("#6047ff")}
            >
            </Button>
            <Button
              style={{ backgroundColor: "#a947ff", elevation: 0, margin: 5, width: 30, height: 30, borderRadius: 20 }}
              onPress={() => this.handleColorTag("#a947ff")}
            >
            </Button>
            <Button
              style={{ backgroundColor: "#ff47f9", elevation: 0, margin: 5, width: 30, height: 30, borderRadius: 20 }}
              onPress={() => this.handleColorTag("#ff47f9")}
            >
            </Button>
            <Button
              style={{ backgroundColor: "#ed3169", elevation: 0, margin: 5, width: 30, height: 30, borderRadius: 20 }}
              onPress={() => this.handleColorTag("#ed3169")}
            >
            </Button>

          </ListItem>
         
        </Content>
      </Container>
    );
  }
}
export default withGlobalContext(NewEvent);
