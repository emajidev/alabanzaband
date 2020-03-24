import React, { Component } from "react";
import { Text } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button
} from "native-base";
import { ListItem, Left, Icon, Body, Right, Switch } from "native-base";
import { withGlobalContext } from './UserContext';
import DatePicker from "react-native-datepicker";
import {insert_In_TableDB}from './SqliteDateBase'

class Date_picker extends Component {
  constructor(props) {
    super(props);
    this.state = { date: '' };
  }
  handlePress = () => {
    // Redacted: animation related code
    this._datePicker.setNativeProps({ modalVisible: true });
  };
  respStart(dete){
    this.props.respStart(dete);
  }
  respEnd(dete){
    this.props.respEnd(dete);
  }
  currentDate(){
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
        placeholder="select date"
        format={ formatChange}
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
            left: 0,
            top: 50,
            marginLeft: 0,
            backgroundColor: "#454"
          },
          dateInput: {
            marginLeft: 36,
            borderWidth: 0
          }

          // ... You can check the source to find the other keys.
        }}
        ref={component => (this._datePicker = component)}
        locale={"es"}
        onDateChange={date => {
         
          if(this.props.modDate =="start"){
            this.setState({date:date})
            this.props.respStart(date)
          }else{
            this.setState({date:date})
            this.props.respEnd(date)
          }
        }}
      />
    );
  }
}
class NewEvent extends Component {
  constructor(){
    super()
    this.state={
      switch:false,
      formatChange:"DD-MM-YYYY ",
      modeChange:"date",
      dateStart:'',
      dateEnd:''
    }
  }
  onChangeState(isActive) {
    this.setState({switch:isActive})
    if(isActive){
      this.onChangeFormat("DD-MM-YYYY HH:mm","datetime")
    }else{
      this.onChangeFormat("DD-MM-YYYY","date")
    }
  }
  onChangeFormat(format,mode){
    this.setState({formatChange:format})
    this.setState({modeChange:mode})
  }
  handleDateStart = (e) => { this.setState({dateStart: e}); console.log("fecha de inicio",e)};
  handleDateEnd = (e) => {this.setState({dateEnd: e}); console.log("fecha de final",e)};

  reformat =(date)=>{
    
    var newDate =date.split(" ")[0];
    var format = newDate.split("-");
    var reformat = format[2]+'-'+format[1] +'-'+format[0]
    console.log(reformat);
    return reformat
  }
  handleTask(){
    let dateStart= this.reformat(this.state.dateStart) 
    let dateEnd= this.reformat(this.state.dateEnd) 

    let task={
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
     let jsonTask=JSON.stringify(task)
     insert_In_TableDB(jsonTask)
     this.props.global.setTask(task)

  }
  render() {
    const switchState = this.state.switch
    const formatChange = this.state.formatChange
    const modeChange = this.state.modeChange

    console.log("estado",switchState)
    return (
      <Container>
      
        <Header style={{ marginTop: 20 }}>
   
          <Body>
            <Text>Program tu evento</Text>
          </Body>
          <Right>
          

            <Button
                trasnparent
                style={{ backgroundColor: "#fff", elevation: 0 }}
                onPress={()=>this.handleTask()}
              >
                <Icon
                  style={{ color: "#50e2c3ff",fontSize:40 }}
                  name="md-checkmark"
                />
              </Button>
          </Right>
          
        </Header>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Título" />
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
              <Switch onValueChange={(e)=>this.onChangeState(e)} value={switchState} />
            </Right>
          </ListItem>
          <Date_picker icon={"ios-arrow-forward"} formatChange={formatChange} modeChange={modeChange} modDate={'start'} respStart={this.handleDateStart}/>
          <Date_picker icon={"ios-arrow-back"} formatChange={formatChange} modeChange={modeChange} modDate={'end'}  respEnd={this.handleDateEnd}/>
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
          <ListItem icon>
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
                  name="md-contacts"
                />
              </Button>
            </Left>
            <Body>
              <Text>Integrantes</Text>
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
              <Text>Tags</Text>
            </Body>
            <Right></Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
export default withGlobalContext(NewEvent);
