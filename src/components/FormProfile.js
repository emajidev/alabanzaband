import React, { Component, useState } from "react";
import { StyleSheet, View, Text, Modal, StatusBar, Image, ImageBackground, SafeAreaView } from "react-native";
import {
  Container,
  Header,
  Content,
  Item,
  Icon,
  Card, CardItem, Body, ListItem, Left, Right
} from "native-base";
import { Grid, Col, Button, Footer } from "native-base";

export default class FormProfile extends Component {
  render() {

    return (
      <Container style={styles.container}>
        <StatusBar
          backgroundColor={'rgb(255, 209, 41)'}
          barStyle="dark-content"
        />
        <Button
          style={styles.active}
          onPress={() => {
            this.props.navigation.navigate("Director");
          }}
        >
          {/* <Icon style={{ color: "#fff", fontSize: 50 }} name="ios-checkmark" /> */}
          <Text style={{ opacity: .2, fontSize: 20, letterSpacing: 5 }}>
            Director
          </Text>
        </Button>
        <Button
          style={styles.active2}
          onPress={() => {
            this.props.navigation.navigate("Performer");
          }}
        >
          {/* <Icon style={{ color: "#fff", fontSize: 50 }} name="ios-checkmark" /> */}
          <Text style={{ opacity: .2, fontSize: 20, letterSpacing: 5 }}>
            Ejecutante
          </Text>
        </Button>
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

  active: {
    elevation: 0,
    width: '100%',
    height: '50%',
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(255, 209, 41)"
  },
  active2: {
    elevation: 0,
    width: '100%',
    height: '50%', alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(80,227,194,1)"
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
