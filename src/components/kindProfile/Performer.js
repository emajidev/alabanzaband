import React, { Component, useState } from "react";
import { StyleSheet, View, Text, Modal, StatusBar, Image, ImageBackground, FlatList, Animated } from "react-native";
import { Dimensions } from 'react-native'

import CodeCountries from "../codeCountries/CodeCountries";
import Rol from "../codeCountries/Rol";
import { AsyncStorage } from "react-native";
import Base64 from 'Base64';
import MusicIcon from 'react-native-vector-icons/FontAwesome'

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
  Card, CardItem, Body, Switch, ListItem, Left, Right
} from "native-base";
import { Grid, Col, Button, Footer } from "native-base";
import * as firebase from "firebase/app";
import { db } from "../firebase.js";


export default class Performer extends Component {
  constructor() {
    super();
    this.state = {
      language: "",
      name: "",
      code: "",
      phone: null,
      rol: "",
      next: false,
      loading: false,
      user: "",
      list: [],
      selectedChurch: '',
      animate: new Animated.Value(2000),
      animateXY: new Animated.ValueXY({ x: 0, y: 0 })

    };
  }

  handlerRol = param => {
    this.setState({
      rol: param
    });
  };

  storeData = async (phone, nick, user, rol) => {
    data = {
      phone: phone,
      user: user,
      nick: nick,
      rol: rol
    };
    try {
      await AsyncStorage.setItem("@storage_Key", JSON.stringify(data));
      console.log("storage enviado", data);
    } catch (e) {
      // saving error
      console.log("error en store", e)
    }
  };
  componentDidMount() {
    this.dataAccount();
    this.getChurchesList()
  }
  getChurchesList() {
    db.ref('/churches').on('value', (snapshot) => {
      var li = []
      snapshot.forEach((child) => {
        li.push({
          key: child.key,
          church: child.val().church,
        })
      })
      console.log('li', snapshot)
      this.setState({ list: li })
    })
  }
  dataAccount() {
    var currentUser = firebase.auth().currentUser;
    this.setState({ user: currentUser.email });
    this.setState({ phone: currentUser.phoneNumber });
    console.log("datos de cuenta iniciada", currentUser);
  }
  addUser = (user, rol) => {
    var currentUser = firebase.auth().currentUser;
    let convertMd5 = Base64.btoa(currentUser.email)
    db.ref("/users/user" + convertMd5 + "/profile").set({
      user: currentUser.email,
      nick: user,
      numberPhone: currentUser.phoneNumber,
      rol: rol
    })
  };

  handleNext = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.storeData(this.state.phone, this.state.name, this.state.user, this.state.rol);
      this.addUser(this.state.name, this.state.rol),
        this.props.navigation.navigate("Main");
      //local db sqlite - create db to initial 

    }, 200);
  };
  openMenu() {
    Animated.sequence([])
    Animated.timing(this.state.animate, {
      toValue: 0,
      duration: 500
    },
    ).start()
  }
  closeMenu() {
    Animated.sequence([])
    Animated.timing(this.state.animate, {
      toValue: Dimensions.get('window').height,
      duration: 500
    },
    ).start()
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
          backgroundColor: "#ffffffcd"
        }}
      >
        <Spinner color="rgba(80,227,194,1)" />

        <Text
          style={{
            fontSize: 14,
            margin: 20,
            letterSpacing: 15,
            color: "rgba(80,227,194,1)"
          }}
        >
          cargando
        </Text>
      </View>
    );
  };
  render() {
    let name = this.state.name;
    let code = this.state.code;
    let phone = this.state.phone;
    let rol = this.state.rol;
    let selectedChurch = this.state.selectedChurch
    let next = false;

    const fullNumber = code + phone;
    if (rol.length != 0 && name.length != 0 && selectedChurch.length != 0) {
      console.log("numero", fullNumber);
      next = true;
    }

    return (

      <Container style={{
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
      }}>
        {this.state.loading == true
          ? this.Loading()
          : console.log("loading true")}

        <Content>
          <View
            noShadow={true}
            style={{

              alignItems: 'center',
              height: 250,
              color: "#fff",
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              backgroundColor: "rgba(80,227,194,1)"
            }}
          >
            <ImageBackground source={require('../../img/bg3.jpg')} style={{ width: '100%', height: '100%', opacity: 1 }} >
              <StatusBar
                backgroundColor={"rgba(80,227,194,1)"}
                barStyle="dark-content"
              />

              <Content >
                <Grid style={{ height: 100, width: '100%' }}>
                  <Col style={{ alignItems: "center", marginTop: '2%' }}>
                  <Text style={{ color: "#000", fontSize: 25, letterSpacing:5 }}>
                      Bienvenido
                </Text>
                    <Text style={{ color: "#000", fontSize: 15 }}>{this.state.user}</Text>
                  </Col>
                </Grid>
              </Content>
            </ImageBackground>
            <View style={styles.TrapezoidStyle} />
            <Image style={{
              height: 120,
              width: 120, borderRadius: 5,
              position: 'absolute',
              borderTopLeftRadius: 100,

              bottom: '-20%'
            }} source={require('../../img/logo.png')} />
          </View>
          {next == true
            ? (
              <Text
                style={{
                  color: "rgb(255, 209, 41)",
                  marginTop: 50,
                  fontSize: 20,
                  textAlign: "center"
                }}
              >
                Completo
              </Text>
            )
            :
            (
              <Text
                style={{
                  color: "rgba(80,227,194,1)",
                  marginTop: 50,
                  fontSize: 22,
                  textAlign: "center"
                }}
              >
                Completa tu perfil
              </Text>
            )}

          <Form style={{ marginBottom: 50 }}>
            <Item floatingLabel style={{ borderColor: "rgba(80,227,194,1)", marginBottom: 10 }}>
              <Label style={{ fontSize: 16, color: '#000' }}>Nombre</Label>
              <Input
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                placeholder="Escribe tu alias o apodo de usuario"
                style={{ marginTop: 15, color: "rgba(80,227,194,1)", fontSize: 16 }}
                placeholderTextColor="rgba(80,227,194,1)"
              />
            </Item>
            <Item style={{ borderWidth: 0, marginBottom: 10 }}>
              <Rol handlerRol={this.handlerRol} />
            </Item>

            <Text style={{ fontSize: 16, color: '#000', marginLeft: 15, marginBottom: 15 }}>Iglesia</Text>

            <Button
              style={{
                fontSize: 16,
                marginLeft: 15,
                elevation: 0,
                width: '100%',
                backgroundColor: '#fff',
                borderBottomColor: "rgba(80,227,194,1)",
                borderBottomWidth: 1
              }}

              onPress={() => {
                this.openMenu()
              }} >
              {this.state.selectedChurch.length != 0 ? (
                <Text style={{ fontSize: 16, color: "rgba(80,227,194,1)" }}>{this.state.selectedChurch.church}</Text>
              ) : (
                  <Text style={{ fontSize: 16, color: "rgba(80,227,194,1)" }}>Elije tu Iglesia</Text>
                )}
            </Button>
          </Form>



        </Content>
        <Button
          style={next == false ? styles.inactive : styles.active}
          onPress={() => {
            next == true ? this.handleNext() : console.log("falso");
          }}
        >
          {/* <Icon style={{ color: "#fff", fontSize: 50 }} name="ios-checkmark" /> */}
          <Text style={{ opacity: .2, fontSize: 20, letterSpacing: 2 }}>
            continuar
          </Text>
        </Button>
        <Animated.View style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#F9F9F9',
          zIndex: 999,
          elevation: 1,
          transform: [
            { translateY: this.state.animate },
          ],
        }}
        >
          <Text style={{ fontSize: 24, textAlign: 'center', margin: 10, color: "rgba(80,227,194,1)" }}>Lista de Canales</Text>
          <Text style={{ fontSize: 15, textAlign: 'center', margin: 10, color: "rgba(80,227,194,1)", opacity: .8 }}>Aqui encontraras las diferentes iglesias creadas por tus directores</Text>
          <FlatList style={{ width: '100%', }}
            data={this.state.list}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Button
                    style={{ backgroundColor: '#fff', padding: 20 }}
                    onPress={() => {
                      this.setState({ selectedChurch: item }),
                        this.closeMenu(),
                        console.log("selectedChurch", item)
                    }}
                  >
                    <Text>{item.church}  {index}</Text>
                  </Button>
                </View>)
            }} />
        </Animated.View>

      </Container>
    );
  }
}
const styles = StyleSheet.create({
  inactive: {
    elevation: 0,
    width: '100%',
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d5d5d5",
    opacity: .4,
    position: 'absolute',
    bottom: 0

  },
  active: {
    elevation: 0,
    width: '100%',
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(80,227,194,1)",
    position: 'absolute',
    bottom: 0
  },
  TrapezoidStyle: {
    position: 'absolute',
    width: 200,
    height: 0,
    bottom: '-10%',
    borderBottomColor: "#fff",
    borderBottomWidth: 100,
    borderLeftWidth: 96,
    borderRightWidth: 96,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',

  }
});
