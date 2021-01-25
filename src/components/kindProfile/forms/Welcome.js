import React, { Component } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";

import { styles } from "../styles/StyleForm.js";
class Welcome extends Component {

  render() {
    return (
      <View style={styles.inputContent}>
        <Image
          style={{
            width: "90%",
            height: 280,
          }}
          source={require("../img/welcome.jpg")}
        />

        <Text style={{textAlign:"center",margin:20, color:"gray", fontSize:18}}>Bienvenido</Text>
        <Text style={{textAlign:"center",margin:20, color:"gray",fontSize:16}}>A continuacion se presentaran un serie de formularios que debes llenar con tus datos para poder avanzar</Text>

      </View>
    );
  }
}

export default Welcome;

