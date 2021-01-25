import React, { Component } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DatePicker from "react-native-datepicker";
import { styles } from "../styles/StyleForm.js";

class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastName: "",
      birthDate: "",
    };
  }
  setName(e) {
    this.props.setName(e);
    this.setState({ name: e });
  }
  setLastName(e) {
    this.setState({ lastName: e });
    this.props.setLastName(e);
  }
  setBirthDate(e) {
    this.setState({ birthDate: e });
    this.props.setBirthDate(e);
  }
  render() {
    return (
      <View style={styles.inputContent}>
        <Image
          style={{
            width: 350,
            height: 350,
          }}
          source={require("../img/personal.jpg")}
        />

        <TextInput
          style={styleInput.textInput}
          onChangeText={(name) => this.setName(name)}
          value={this.state.text}
          editable
          maxLength={40}
          fontSize={16}
          placeholder="Nombre"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styleInput.textInput}
          onChangeText={(lastName) => this.setLastName(lastName)}
          value={this.state.lastName}
          editable
          maxLength={40}
          fontSize={16}
          placeholder="Apellido"
          placeholderTextColor="gray"
        />
        <Text style={{marginTop:20,fontSize:16,color:"gray"}}>Fecha de cumpleaños</Text>
        <View style={[styleInput.textInput,{alignItems:"center"}]}>
          <DatePicker
            date={this.state.birthDate}
            format={"DD-MM-YYYY"}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            mode={"date"}
            //onDateChange={}
            iconComponent={<Icon size={25} name="birthday-cake" color="#b3f" />}
            modalTransparent={true}
            animationType={"fade"}
            customStyles={{
              dateIcon: {
              
              },
              dateInput: {
                borderWidth: 0,
                opacity:.5,
                fontSize:20,
              },
            }}
            locale={"es"}
            onDateChange={(birthDate) => this.setBirthDate(birthDate)}
          />
        </View>
      </View>
    );
  }
}

export default PersonalInformation;

const styleInput = StyleSheet.create({
  textInput: {
    width: "90%",
    height: 40,
    paddingLeft: 20,
    backgroundColor: "#f5f5f5",
    marginTop: 20,
    borderRadius: 20,
    color:"gray"

  },
  
});
