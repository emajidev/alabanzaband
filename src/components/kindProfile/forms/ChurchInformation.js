import React, { Component } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";

import { styles } from "../styles/StyleForm.js";
class ChurchInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipucSite: "",
      administrativePastor: "",
    };
  }
  setIpucSite(e){
    this.setState({ ipucSite: e });
    this.props.setIpucSite(e);
  }
  setAdministrativePastor(e){
    this.setState({ administrativePastor: e });
    this.props.setAdministrativePastor(e);
  }
  render() {
    return (
      <View style={styles.inputContent}>
        <Image
          style={{
            width: "90%",
            height: 350,
          }}
          source={require("../img/church.jpg")}
        />

        <TextInput
          style={styleInput.textInput}
          onChangeText={(text) => this.setIpucSite(text)}
          value={this.state.ipucSite}
          editable
          fontSize={16}
          placeholder="Sede Ipuc a la que asistes"
          placeholderTextColor="gray"
          maxLength={40}
        />
        <TextInput
          style={styleInput.textInput}
          onChangeText={(text) => this.setAdministrativePastor(text)}
          value={this.state.administrativePastor}
          editable
          fontSize={16}
          placeholder="Pastor administrativo"
          placeholderTextColor="gray"
          maxLength={40}
        />
      </View>
    );
  }
}

export default ChurchInformation;
const styleInput = StyleSheet.create({
  textInput:{
    width:"90%",
    height:40,
    paddingLeft:20,
    backgroundColor:"#f5f5f5",
    marginTop:20,
    borderRadius:20
  }
})