import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  StatusBar,
  Image,
  ImageBackground,
  SafeAreaView,
} from "react-native";

import CodeCountries from "../codeCountries/CodeCountries";
import Rol from "../codeCountries/Rol";
import { AsyncStorage } from "react-native";
import Base64 from "Base64";
import MusicIcon from "react-native-vector-icons/FontAwesome";

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Icon,
  Label,
  Spinner,
  Card,
  CardItem,
  Body,
  Switch,
  ListItem,
  Left,
  Right,
} from "native-base";
import { Grid, Col, Button, Footer } from "native-base";
import * as firebase from "firebase/app";
import { db } from "../firebase.js";

export default class Director extends Component {
  constructor() {
    super();
    this.state = {
      language: "",
      name: "",
      phone: null,
      rol: "",
      next: false,
      loading: false,
      user: "",
      address: "",
      churchName: "",
      token: "",
    };
  }

  handlerRol = (param) => {
    this.setState({
      rol: param,
    });
  };

  storeData = async (phone, nick, user, rol) => {
    try {
      data = {
        phone: phone,
        user: user,
        nick: nick,
        rol: rol,
      };
      await AsyncStorage.setItem("@storage_Key", JSON.stringify(data));
      console.log("storage enviado", data);
    } catch (e) {
      // saving error
      console.log("error en store", e);
    }
  };
  componentDidMount() {
    this.dataAccount();
    this.generate_token(6);
  }
  dataAccount() {
    var currentUser = firebase.auth().currentUser;
    this.setState({ user: currentUser.email });
    this.setState({ phone: currentUser.phoneNumber });
    console.log("datos de cuenta iniciada", currentUser);
  }
  addUser = (user, churchName, address) => {
    var currentUser = firebase.auth().currentUser;
    let convertMd5 = Base64.btoa(currentUser.email);
    db.ref("/users/user" + convertMd5 + "/profile").set({
      user: currentUser.email,
      nick: user,
      numberPhone: currentUser.phoneNumber,
      rol: "director",
      churchName: churchName,
      address: address,
      code: this.state.token,
    });
    this.addChurch(user, churchName, address);
  };
  addChurch = (user, churchName, address) => {
    var currentUser = firebase.auth().currentUser;

    let convertMd5 = Base64.btoa(currentUser.email);
    db.ref("/churches/user" + convertMd5).set({
      user: currentUser.email,
      nick: user,
      numberPhone: currentUser.phoneNumber,
      rol: "director",
      church: churchName,
      address: address,
      code: this.state.token,
    });
  };

  handleNext = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.storeData(
        this.state.phone,
        this.state.name,
        this.state.user,
        this.state.rol
      );
      this.addUser(this.state.name, this.state.churchName, this.state.address),
        this.props.navigation.navigate("Main");
      //local db sqlite - create db to initial
    }, 200);
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
  Loading = () => {
    return (
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
        <Spinner color="#ffd129" />

        <Text
          style={{
            fontSize: 14,
            margin: 20,
            letterSpacing: 15,
            color: "#ffd129",
          }}
        >
          cargando
        </Text>
      </View>
    );
  };
  render() {
    let name = this.state.name;
    let churchName = this.state.churchName;
    let address = this.state.address;

    let next = false;

    if (name.length >= 3 && churchName.length >= 3 && address.length >= 3) {
      next = true;
    }

    return (
      <Container
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        {this.state.loading == true
          ? this.Loading()
          : console.log("loading true")}

        <Content>
          <View
            noShadow={true}
            style={{
              alignItems: "center",
              height: 250,
              color: "#fff",
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              backgroundColor: "#ffd129",
            }}
          >
            <ImageBackground
              source={require("../../img/bg2.jpg")}
              style={{ width: "100%", height: "100%", opacity: 1 }}
            >
              <StatusBar backgroundColor={"#ffd129"} barStyle="dark-content" />

              <Content>
                <Grid style={{ height: 100, width: "100%" }}>
                  <Col style={{ alignItems: "center", marginTop: "2%" }}>
                    <Text
                      style={{ color: "#000", fontSize: 25, letterSpacing: 5 }}
                    >
                      Bienvenido
                    </Text>
                    <Text
                      style={{ color: "#000", fontSize: 20, letterSpacing: 14 }}
                    >
                      Director
                    </Text>
                    <Text style={{ color: "#000", fontSize: 15 }}>
                      {this.state.user}
                    </Text>
                  </Col>
                </Grid>
              </Content>
            </ImageBackground>
            <View style={styles.TrapezoidStyle} />
            <Image
              style={{
                height: 120,
                width: 120,
                borderRadius: 5,
                position: "absolute",
                borderTopLeftRadius: 100,

                bottom: "-20%",
              }}
              source={require("../../img/logo.png")}
            />
          </View>
          {next == true ? (
            <Text
              style={{
                color: "#ffd129",
                marginTop: 50,
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Completo
            </Text>
          ) : (
            <Text
              style={{
                color: "#ffd129",
                marginTop: 50,
                fontSize: 22,
                textAlign: "center",
              }}
            >
              Completa tu perfil
            </Text>
          )}

          <Form style={{ marginBottom: 30 }}>
            <Item floatingLabel style={{ borderColor: "#ffd129" }}>
              <Label style={{ fontSize: 16 }}>Nombre</Label>
              <Input
                onChangeText={(name) => this.setState({ name })}
                style={{ marginTop: 15, color: "#ffd129" }}
                placeholderTextColor="#ffd129"
              />
            </Item>
            <Item floatingLabel style={{ borderColor: "#ffd129" }}>
              <Label style={{ fontSize: 16 }}>Iglesia</Label>
              <Input
                onChangeText={(churchName) => this.setState({ churchName })}
                style={{ marginTop: 15, color: "#ffd129" }}
                placeholderTextColor="#ffd129"
              />
            </Item>
            <Item floatingLabel style={{ borderColor: "#ffd129" }}>
              <Label style={{ fontSize: 16 }}>Direccion</Label>
              <Input
                onChangeText={(address) => this.setState({ address })}
                style={{ marginTop: 15, color: "#ffd129" }}
                placeholderTextColor="#ffd129"
              />
            </Item>
            <Text
              style={{
                color: "#000",
                marginTop: 15,
                fontSize: 16,
                textAlign: "center",
                letterSpacing: 5,
              }}
            >
              Codigo
            </Text>
            <Text
              style={{
                color: "#ffd129",
                marginTop: 15,
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center",
                letterSpacing: 3,
              }}
            >
              {this.state.token.substr(0, 3) +
                " " +
                this.state.token.substr(3, 5)}
            </Text>
          </Form>
        </Content>
        <Button
          style={next == false ? styles.inactive : styles.active}
          onPress={() => {
            next == true ? this.handleNext() : console.log("falso");
          }}
        >
          {/* <Icon style={{ color: "#fff", fontSize: 50 }} name="ios-checkmark" /> */}
          <Text style={{ opacity: 0.2, fontSize: 20, letterSpacing: 5 }}>
            continuar
          </Text>
        </Button>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  inactive: {
    elevation: 0,
    width: "100%",
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d5d5d5",
    opacity: 0.4,
    position: "absolute",
    bottom: 0,
  },
  active: {
    elevation: 0,
    width: "100%",
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffd129",
    position: "absolute",
    bottom: 0,
  },
  TrapezoidStyle: {
    position: "absolute",
    width: 200,
    height: 0,
    bottom: "-10%",
    borderBottomColor: "#fff",
    borderBottomWidth: 100,
    borderLeftWidth: 96,
    borderRightWidth: 96,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
  },
});
