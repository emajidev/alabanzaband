import React, { Component, useState } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { Container } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import IconPencil from "react-native-vector-icons/MaterialCommunityIcons";
import { Grid, Col, Button, Footer } from "native-base";
const colorTheme = "#50e2c3ff";

export default class FormProfile extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Image
          style={{
            width: 320,
            height: 320,
          }}
          source={require("../img/user.jpg")}
        />
          <Text style={{color:"#888",textAlign:"center", fontSize: 14, letterSpacing:1,marginLeft:30, marginRight:30,marginTop:30 }}>
            Selecciona la opcciòn de tu preferencia
          </Text>
        <Button
          style={[styles.btn_accept, { backgroundColor: colorTheme }]}
          onPress={() => {
            this.props.navigation.navigate("Main");
          }}
        >
          <Text style={{ color: "#ffff", fontSize: 16, fontWeight: "bold" }}>
            Continuar
          </Text>
          <Icon
            name="chevron-circle-right"
            color="#fff"
            size={40}
            style={{ position: "absolute", right: 0, margin: 5 }}
          />
        </Button>
        <Button
          style={[styles.btn_secundary, { borderColor: colorTheme }]}
          onPress={() => {
            this.props.navigation.navigate("Performer");
          }}
        >
          <Text style={{ color: colorTheme, fontSize: 16, fontWeight: "bold" }}>
            Editar Perfil
          </Text>
          <IconPencil
            name="pencil-circle"
            color={colorTheme}
            size={40}
            style={{ position: "absolute", right: 0, margin: 2 }}
          />
        </Button>
        <Text style={{color:"#b9b9b9",textAlign:"center", fontSize: 14,marginLeft:30, marginRight:30,marginTop:30 }}>
            AlabanzaBand esta diseñada con una interfaz sencilla, pensando siempre en la comodidad de sus usuarios.
          </Text>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  btn_accept: {
    marginTop: 30,
    width: 250,
    height: 50,
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 0,
  },
  btn_secundary: {
    backgroundColor: "#fff",
    borderWidth: 3,
    marginTop: 20,
    width: 250,
    height: 50,
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 0,
  },
});
