import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import * as firebase from "firebase/app";
class RecoverPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  recoverPass(email) {
    var auth = firebase.auth();
    var emailAddress = email;
    if (emailAddress != "") {
      firebase
        .auth()
        .sendPasswordResetEmail(emailAddress)
        .then(function () {
          // Email sent.
          Alert.alert("Se ha enviado un creeo");
        })
        .catch(function (error) {
          // An error happened.
          Alert.alert("Formato de correo incorrecto");
        });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Ingresa tu correo de recuperacion</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TouchableOpacity onPress={() => this.recoverPass(this.state.email)}>
          <Text>Enviar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  TextInput: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
    margin: 20,
  },
});

export default RecoverPassword;
