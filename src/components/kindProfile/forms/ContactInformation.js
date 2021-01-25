import React, { Component } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";

import { styles } from "../styles/StyleForm.js";
class ContactInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactPhone: "",
      aboutYou: "",
    };
  }

  setContactPhone(e){
    this.setState({ contactPhone: e });
    this.props.setContactPhone(e);

  }
  setAboutYou(e){
    this.setState({ aboutYou: e });
    this.props.setAboutYou(e);

  }
  render() {
    return (
      <View style={styles.inputContent}>
        <Image
          style={{
            width: "100%",
            height: 320,
          }}
          source={require("../img/contact.jpg")}
        />

        <TextInput
          style={styleInput.textInput}
          onChangeText={(num) => this.setContactPhone(num)}
          value={this.state.contactPhone}
          keyboardType = 'numeric'
          editable
          fontSize={16}
          placeholder="Telefono de contacto"
          placeholderTextColor="gray"
          maxLength={11}
        />
        <TextInput
          style={[styleInput.textInput,{height:200,borderRadius:5,textAlignVertical: 'top',padding:15}]}
          onChangeText={(text) => this.setAboutYou(text)}
          value={this.state.aboutYou}
          editable
          fontSize={16}
          placeholder="Escribe una breve reseña sobre ti"
          placeholderTextColor="gray"
          maxLength={255}
          multiline={true}

        />
        <Text style={{textAlign:"right",color:"gray"}}>{this.state.aboutYou.length}/255</Text>
      </View>
    );
  }
}

export default ContactInformation;
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