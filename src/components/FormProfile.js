import React, { Component } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";

import CodeCountries from "./codeCountries/CodeCountries";
import Rol from "./codeCountries/Rol";
import { AsyncStorage } from "react-native";
import Base64 from 'Base64';

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
  Card,CardItem,Body
} from "native-base";
import { Grid, Col, Button, Footer } from "native-base";
import turquesa from "../../native-base-theme/variables/turquesa";
import getTheme from "../../native-base-theme/components";
import * as firebase from "firebase/app";
import { db } from "./firebase.js";

export default class FormProfile extends Component {
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
      user: ""
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
      console.log("error en store",e)
    }
  };
  componentDidMount() {
    this.dataAccount();
  }
  dataAccount() {
    var currentUser = firebase.auth().currentUser;
    this.setState({ user: currentUser.email });
    this.setState({ phone: currentUser.phoneNumber });
    console.log("datos de cuenta iniciada", currentUser);
  }
  addUser = (user, rol) => {
    var currentUser = firebase.auth().currentUser;
    let convertMd5 = Base64.btoa( currentUser.email )
    db.ref("/users/user" +convertMd5+ "/profile").set({
      user: currentUser.email,
      nick: user,
      numberPhone: currentUser.phoneNumber,
      rol: rol
    });
  };

  handleNext = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.storeData(this.state.phone, this.state.name, this.state.user, this.state.rol);
      this.addUser(this.state.name, this.state.rol),
        this.props.navigation.navigate("Main",);
        //local db sqlite - create db to initial 
 
    }, 200);
  };
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
    let next = false;

    const fullNumber = code + phone;
    if (rol.length != 0 && name.length != 0) {
      console.log("numero", fullNumber);
      next = true;
    }
    return (
      <Container>
        {this.state.loading == true
          ? this.Loading()
          : console.log("loading true")}
        <Header
          noShadow={true}
          style={{
            backgroundColor: "rgba(80,227,194,1)",
            height: 100,
            color: "#fff",
            borderBottomRightRadius: 50,
            borderColor: "#fff"
          }}
        >
          <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 10 }}>
            <Grid>
              <Col style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#fff", marginTop: 30, fontSize: 25 }}>
                  Bienvenido
                </Text>
              </Col>
            </Grid>
          </Content>
        </Header>
        <Content>
        {next == true
          ? (
            <Card transparent >
            <CardItem> 
              <Body style={{alignItems:'center',justifyContent:'center'}}>
              <Icon
                style={{
                  color: "rgb(255, 209, 41)",
                  fontSize: 20,
                  textAlign: "center",
                  marginTop: 10
                }}
                name="md-thumbs-up"
              />
              <Text
                style={{
                  color: "rgb(255, 209, 41)",
                  paddingTop: 5,
                  fontSize: 16,
                  textAlign: "center"
                }}
              >
                Perfil completado
              </Text>
              </Body>
              </CardItem>
              </Card>
            )
          : 
            (
              <Text
                style={{
                  color: "rgba(80,227,194,1)",
                  paddingTop: 20,
                  fontSize: 14,
                  textAlign: "center"
                }}
              >
                Completa tu perfil
              </Text>
            )}

       
          <Form>
            <Item
              stackedLabel
              style={{ paddingBottom: 5, borderColor: "rgba(80,227,194,1)" }}
            >
              <Label style={{ fontSize: 16 }}>Cuenta</Label>
              <Input
                editable={false}
                selectTextOnFocus={false}
                value={this.state.user}
                style={{ marginTop: 14, color: "rgba(80,227,194,1)" }}
              />
            </Item>
            <Item
              stackedLabel
              style={{ paddingBottom: 5, borderColor: "rgba(80,227,194,1)" }}
            >
              <Label style={{ fontSize: 16 }}>Telefono</Label>
              {this.state.phone == null ? (
                <Input
                  editable={false}
                  selectTextOnFocus={false}
                  value={"No posee un número para esta cuenta"}
                  style={{ marginTop: 15, color: "rgba(80,227,194,1)" }}
                />
              ) : (
                <Input
                  editable={false}
                  selectTextOnFocus={false}
                  value={this.state.phone}
                  style={{ marginTop: 15, color: "rgba(80,227,194,1)" }}
                />
              )}
            </Item>
            <Item stackedLabel style={{ borderColor: "rgba(80,227,194,1)" }}>
              <Label style={{ fontSize: 16 }}>Nombre de usuario</Label>
              <Input
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                placeholder="Escribe tu nombre"
                style={{ marginTop: 15, color: "rgba(80,227,194,1)" }}
                placeholderTextColor="rgba(80,227,194,1)" 
              />
            </Item>
          </Form>
          <Rol handlerRol={this.handlerRol} />
        </Content>

        <Button
          style={next == false ? styles.inactive : styles.active}
          onPress={() => {
            next == true ? this.handleNext() : console.log("falso");
          }}
        >
          <Icon style={{ color: "#fff", fontSize: 50 }} name="ios-checkmark" />
        </Button>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  inactive: {
    elevation: 0,
    margin: 50,
    width: 100,
    height: 100,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 300,
    alignItems: "center",
    backgroundColor: "#d5d5d5"
  },
  active: {
    elevation: 0,
    margin: 50,
    width: 100,
    height: 100,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 300,
    alignItems: "center",
    backgroundColor: "rgba(80,227,194,1)"
  }
});
